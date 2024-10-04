import type { Board } from "../../types"

export function isInJake(
	board: Board,
	from: [number, number],
	to: [number, number],
) {
	const newBoard: Board = structuredClone(board)

	if (board[to[0]][to[1]].piece === "") {
		newBoard[to[0]][to[1]] = board[from[0]][from[1]]
		newBoard[from[0]][from[1]] = { piece: "", color: "" }
	}

	const kingIndex = newBoard
		.map((r, index) => {
			const king = r.findIndex((c) => c.piece === "king" && c.color === "me")
			if (king !== -1) return [index, king]
		})
		.filter((i) => i !== undefined)
		.flat()

	let Jake = false

	for (let c = kingIndex[1] - 1; c >= 0; c--) {
		if (newBoard[kingIndex[0]][c].color === "her") {
			if (
				newBoard[kingIndex[0]][c].piece === "rook" ||
				newBoard[kingIndex[0]][c].piece === "queen"
			) {
				Jake = true
				break
			}
		} else if (newBoard[kingIndex[0]][c].color === "me") break
	}

	if (Jake) return Jake

	for (let c = kingIndex[1] + 1; c <= 7; c++) {
		if (newBoard[kingIndex[0]][c].color === "her") {
			if (
				newBoard[kingIndex[0]][c].piece === "rook" ||
				newBoard[kingIndex[0]][c].piece === "queen"
			) {
				Jake = true
				break
			}
		} else if (newBoard[kingIndex[0]][c].color === "me") break
	}

	if (Jake) return Jake

	for (let c = kingIndex[0] - 1; c >= 0; c--) {
		if (newBoard[c][kingIndex[1]].color === "her") {
			if (
				newBoard[c][kingIndex[1]].piece === "rook" ||
				newBoard[c][kingIndex[1]].piece === "queen"
			) {
				Jake = true
				break
			}
		} else if (newBoard[c][kingIndex[1]].color === "me") {
			break
		}
	}

	if (Jake) return Jake

	for (let c = kingIndex[0] + 1; c <= 0; c++) {
		if (newBoard[c][kingIndex[1]].color === "her") {
			if (
				newBoard[c][kingIndex[1]].piece === "rook" ||
				newBoard[c][kingIndex[1]].piece === "queen"
			) {
				Jake = true
				break
			}
		} else if (newBoard[c][kingIndex[1]].color === "me") break
	}

	return Jake
}
