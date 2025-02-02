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

const main = () => {
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

  // animateMoves();
};

document.addEventListener("DOMContentLoaded", main);

const animateMoves = () => {
  const gameMoves = {
    moves: [
      [
        ["2", "e"],
        ["4", "e"],
      ],
      [
        ["7", "e"],
        ["5", "e"],
      ],
      [
        ["1", "g"],
        ["3", "f"],
      ],
      [
        ["8", "b"],
        ["6", "c"],
      ],
      [
        ["1", "f"],
        ["4", "c"],
      ],
      [
        ["8", "g"],
        ["6", "f"],
      ],
      [
        ["0", "c"],
        ["1", "d"],
      ],
      [
        ["9", "d"],
        ["9", "d"],
      ],
    ],
  };

  let delay = 2000;

  gameMoves.moves.forEach((move) => {
    setTimeout(() => {
      movePiece.apply(null, move);
    }, delay);

    delay += 2000;
  });
};
