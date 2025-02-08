document.addEventListener("DOMContentLoaded", () => {
	const divs = document.querySelectorAll(".arry");
	const statusSpan = document.getElementById("span");
	const container = document.getElementById("container");
	const container2 = document.getElementById("container2");
	const restartBtns = document.querySelectorAll("#restart, #restart2");
	let currentPlayer = "X";

	const updateBoard = async (index) => {
		const response = await fetch("/move", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ index, player: currentPlayer }),
		});

		const data = await response.json();

		if (data.success) {
			divs[index].innerHTML =
				currentPlayer === "X"
					? '<i class="bx bx-x"></i>'
					: '<i class="bx bx-radio-circle"></i>';
			currentPlayer = data.nextPlayer;
		}

		if (data.winner) {
			statusSpan.innerText = data.winner + " ";
			container.style.display = "none";
			container2.style.display = "block";
		}
	};

	divs.forEach((div, index) => {
		div.addEventListener("click", () => {
			if (!div.innerHTML) updateBoard(index);
		});
	});

	restartBtns.forEach((btn) => {
		btn.addEventListener("click", async () => {
			await fetch("/reset", { method: "POST" });
			window.location.reload();
		});
	});
});
