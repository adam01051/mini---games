
import express from "express"
import bodyParser from "body-parser";
import pg from "pg"


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());




let board = Array(9).fill("");
let currentPlayer = "X";

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
    for (let line of winLines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes("") ? null : "Draw";
};
app.get("/", (req, res) => {
	
	res.render("index.ejs");
});


app.post("/move", (req, res) => {
    const { index } = req.body;
    if (board[index] === "" && !checkWin()) {
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        const winner = checkWin();
        res.json({ board, winner, currentPlayer });
    } else {
        res.status(400).json({ error: "Invalid move" });
    }
});

app.post("/reset", (req, res) => {
    board = Array(9).fill("");
    currentPlayer = "X";
    res.json({ board, currentPlayer });
});

app.listen(port, () => {
    console.log(`Tic-Tac-Toe server running on http://localhost:${port}`);
});
