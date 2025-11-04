// winning-combinations.js
export function generateWinningCombinations(boardSize, winLength = 5) {
  const combinations = [];

  // Rows
  for (let row = 0; row < boardSize; row++) {
    for (let startCol = 0; startCol <= boardSize - winLength; startCol++) {
      const combo = [];
      for (let offset = 0; offset < winLength; offset++) {
        combo.push({ row, column: startCol + offset });
      }
      combinations.push(combo);
    }
  }

  // Columns
  for (let col = 0; col < boardSize; col++) {
    for (let startRow = 0; startRow <= boardSize - winLength; startRow++) {
      const combo = [];
      for (let offset = 0; offset < winLength; offset++) {
        combo.push({ row: startRow + offset, column: col });
      }
      combinations.push(combo);
    }
  }

  // Diagonals ↘️
  for (let startRow = 0; startRow <= boardSize - winLength; startRow++) {
    for (let startCol = 0; startCol <= boardSize - winLength; startCol++) {
      const combo = [];
      for (let offset = 0; offset < winLength; offset++) {
        combo.push({ row: startRow + offset, column: startCol + offset });
      }
      combinations.push(combo);
    }
  }

  // Diagonals ↙️
  for (let startRow = 0; startRow <= boardSize - winLength; startRow++) {
    for (let startCol = winLength - 1; startCol < boardSize; startCol++) {
      const combo = [];
      for (let offset = 0; offset < winLength; offset++) {
        combo.push({ row: startRow + offset, column: startCol - offset });
      }
      combinations.push(combo);
    }
  }

  return combinations;
}
