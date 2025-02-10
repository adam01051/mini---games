import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import path from "path";


const app = express();
const PORT = 3000;

app.set("view engine", "ejs");  
app.use(express.static("public"));

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

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);
