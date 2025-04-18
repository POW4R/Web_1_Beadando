export const generateGrid = (words, size) => {
    let grid = Array.from({ length: size }, () => Array(size).fill(""));

    words.forEach((word) => {
        let placed = false;
        while (!placed) {
            let row = Math.floor(Math.random() * size);
            let col = Math.floor(Math.random() * (size - word.length));
            if (grid[row].slice(col, col + word.length).every((cell) => cell === "")) {
                for (let i = 0; i < word.length; i++) {
                    grid[row][col + i] = word[i];
                }
                placed = true;
            }
        }
    });

    return grid.map((row) =>
        row.map((cell) => (cell === "" ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : cell))
    );
};
