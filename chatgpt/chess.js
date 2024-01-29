document.addEventListener('DOMContentLoaded', function () {
    var board = document.createElement('table');
    board.className = 'chess-board';

    for (var i = 0; i < 8; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < 8; j++) {
            var cell = document.createElement('td');
            cell.className = (i + j) % 2 === 0 ? 'white' : 'black';
            row.appendChild(cell);
        }
        board.appendChild(row);
    }

    document.getElementById('chessboard').appendChild(board);

    drawChessPieces();
});

function drawChessPieces() {
    var svg = document.getElementById('chessPiecesSvg');

    // Dibuja piezas de ajedrez simples
    drawPiece(svg, '♚', 20, 20); // Rey negro
    drawPiece(svg, '♛', 120, 20); // Reina negra
    drawPiece(svg, '♜', 220, 20); // Torre negra
    drawPiece(svg, '♝', 320, 20); // Alfil negro
    drawPiece(svg, '♞', 20, 120); // Caballo negro
    drawPiece(svg, '♟', 120, 120); // Peón negro

    drawPiece(svg, '♔', 220, 320); // Rey blanco
    drawPiece(svg, '♕', 320, 320); // Reina blanca
    drawPiece(svg, '♖', 20, 320); // Torre blanca
    drawPiece(svg, '♗', 120, 320); // Alfil blanco
    drawPiece(svg, '♘', 220, 220); // Caballo blanco
    drawPiece(svg, '♙', 320, 220); // Peón blanco
}

function drawPiece(svg, symbol, x, y) {
    var piece = document.createElementNS("http://www.w3.org/2000/svg", "text");
    piece.setAttribute('x', x);
    piece.setAttribute('y', y);
    piece.setAttribute('font-size', '36');
    piece.setAttribute('font-family', 'Arial');
    piece.textContent = symbol;

    svg.appendChild(piece);
}
