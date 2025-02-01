const isNegative = (number) => number < 0;

const range = function (from, to, step = 1) {
  if (step === 0 || isNegative(to - from) !== isNegative(step)) return [];

  const noOfTerms = Math.ceil(Math.abs((to - from) / step));
  return Array.from({ length: noOfTerms }, (_, index) => from + index * step);
};

const debug = function (arg) {
  console.log(arg);
  return arg;
};

const createCell = (color, cellId, cellValue) => {
  const cell = document.createElement("td");

  cell.id = cellId;
  cell.innerText = cellValue;
  cell.style.backgroundColor = color;

  return cell;
};

const numberToChar = (asciiValue) => String.fromCharCode(asciiValue);

const characters = (from, to) => range(from, to, 1).map(numberToChar);

const generateRow = (cellColors, rowId, rowValues) => {
  const row = document.createElement("tr");
  row.id = rowId;
  const firstCell = "a".charCodeAt(0);

  characters(firstCell, firstCell + 8).forEach((cellId, index) =>
    row.appendChild(
      createCell(
        cellColors[index % cellColors.length],
        cellId,
        rowValues[index]
      )
    )
  );

  return row;
};

const generateBoard = (boardId, [...colors], chessPieces) => {
  const colorSet = [[...colors], colors.reverse()];
  const board = document.createElement("table");

  board.id = boardId;
  board.style.border = "2px solid black";

  range(8, 0, -1).forEach((rowId, index) => {
    board.appendChild(
      generateRow(colorSet[index % colorSet.length], rowId, chessPieces[index])
    );
  });

  return board;
};

class Chess {
  constructor() {
    this.white = {
      king: "\u2654",
      queen: "\u2655",
      rook: "\u2656",
      bishop: "\u2657",
      knight: "\u2658",
      pawn: "\u2659",
    };

    this.black = {
      king: "\u265A",
      queen: "\u265B",
      rook: "\u265C",
      bishop: "\u265D",
      knight: "\u265E",
      pawn: "\u265F",
    };
  }

  #getPieces(color, pieces) {
    return pieces.map((piece) => this[color][piece]);
  }

  pawns(color) {
    return this.#getPieces(color, Array(8).fill("pawn"));
  }

  powers(color) {
    const minorPieces = ["rook", "knight", "bishop"];
    const powerPieces = [
      ...minorPieces,
      "queen",
      "king",
      ...minorPieces.toReversed(),
    ];

    return this.#getPieces(color, powerPieces);
  }
}

const movePiece = ([startRow, startCell], [destRow, destCell]) => {
  const ele1 = document.getElementById(startRow).querySelector(`#${startCell}`);
  const ele2 = document.getElementById(destRow).querySelector(`#${destCell}`);

  const prevEle1 = ele1.innerText;
  ele2.innerText = prevEle1;
  ele1.innerText = "";

  return prevEle1;
};

document.addEventListener("DOMContentLoaded", function () {
  const chess = new Chess();

  const emptyStrings = Array(8).fill("");

  const chessPieces = [
    chess.powers("black"),
    chess.pawns("black"),
    ...Array(4).fill(emptyStrings),
    chess.pawns("white"),
    chess.powers("white"),
  ];
  const cellColors = ["white", "brown"];

  document.body.appendChild(generateBoard("board", cellColors, chessPieces));

  animateMoves();
});

const animateMoves = () => {
  const moves = [
    [
      ["2", "a"],
      ["4", "a"],
    ],
    [
      ["2", "b"],
      ["3", "b"],
    ],
    [
      ["3", "b"],
      ["4", "a"],
    ],
  ];

  let delay = 1000;

  moves.forEach((move) => {
    setTimeout(() => {
      movePiece.apply(null, move);
    }, delay);

    delay += 1000;
  });
};
