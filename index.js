import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";
import path from "path";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();
app.set("view engine", "ejs");  

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_NAME,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
});
db.connect();
/////////////////////////////////////game section///////

app.use(bodyParser.json());

let board = Array(9).fill(null);
let currentPlayer = "X";
let count1 = 1;
const winLines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8], 
	[2, 4, 6],
]; 

const checkWin = () => {
	for (const line of winLines) {
		count1++; 
		const [a, b, c] = line;
		
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			count1 = 1;

			return `${board[a]} WIN`;
		} 
		 
	}
	if (board.every((cell) => cell !== null)) {
		return "draw";
	}
	return null;
};

app.get("/", (req, res) => {
	res.render("index.ejs");
});
app.get("/tictac", (req, res) => {
	res.render("tictakgame", { board });
});

app.post("/move", (req, res) => {
	const { index, player } = req.body;

	if (board[index] || checkWin()) {
		return res.json({ success: false });
	}

	board[index] = player;
	const winner = checkWin();

	currentPlayer = player === "X" ? "O" : "X";

	res.json({ success: true, nextPlayer: currentPlayer, winner });
});
app.post("/reset", (req, res) => {
	board = Array(9).fill(null);
	currentPlayer = "X";
	res.json({ success: true });
});


app.get("/reggg1", (req, res) => {
	res.render("reg.ejs");
});
app.get("/regpage", (req, res) => {
	res.render("menu.ejs");
});

app.get("/logout", (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

app.get("/success", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("menu.ejs");
	} else {
		res.redirect("/");
	}
});

app.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

app.get(
	"/auth/google/secrets",
	passport.authenticate("google", {
		successRedirect: "/success",
		failureRedirect: "/",
	})
);



app.post(
	"/submit",
	passport.authenticate("local", {
		successRedirect: "/success",
		failureRedirect: "/",
	})
);

//newemail newpassword newpascheck
//add@ss add
app.post("/register", async (req, res) => {
	const email = req.body.newemail;
	const password = req.body.newpassword;
	const checkupp = req.body.newpascheck;
	console.log(email, password);
	if (password == checkupp) {
		try {
			const result = await db.query(
				"select  * from users where username = $1",
				[email]
			);
			if (result.rows.length !== 0) {
				console.log("email is used");
				req.redirect("/");
			} else {
				bcrypt.hash(password, saltRounds, async function (err, hash) {
					if (err) {
						console.log(err);
					} else {
						const cresult = await db.query(
							"insert into users (username, password) values ($1, $2) returning *",
							[email, hash]
						);
						console.log(cresult.rows);
						res.redirect("/regpage");
					}
				});
			}
		} catch (err) {
			console.log(err);
		}
	}
});

passport.use(
	new Strategy(async function verify(username, password, cb) {
		try {
			const result = await db.query("select * from users where username =$1", [
				username,
			]);
			if (result.rows.length > 0) {
				const user = result.rows[0];
				const storedHashedPassword = user.password;
				bcrypt.compare(password, storedHashedPassword, (err, valid) => {
					if (err) {
						return cb(err);
					} else {
						if (valid) {
							return cb(null, user);
						} else {
							return cb(null, false);
						}
					}
				});
			} else {
				return cb("User not found");
			}
		} catch (err) {
			console.log(err);
		}
	})
);

passport.use(
	"google",
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:3000/auth/google/secrets",
			userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
		},
		async (accessToken, refreshToken, profile, cb) => {
			try {
				console.log(profile);
				const result = await db.query("select * from users where username = $1", [
					profile.email,
				]);
				if (result.rows.length === 0) {
					const newuser = await db.query("insert into users  (username , password) values ($1,$2)", [profile.email, 'google']);
					cb(null, newuser.rows[0]);
				} else
				{
						cb(null, result.rows[0]);
					}
			} catch (err) {
				cb(err);
			}
		}
	)
); 


passport.serializeUser((user, cb) => {
	cb(null, user);
});
passport.deserializeUser((user, cb) => {
	cb(null, user);
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
