const TIME = 200;

class Game {
    constructor() {
        this.table = document.getElementById("game-2048");

        this.colors = {
            "2": "#EEE4DA",
            "4": "#EDE0C8",
            "8": "#F2B179",
            "16": "#F59563",
            "32": "#F67C5F",
            "64": "#F65E3B",
            "128": "#EDCF72",
            "256": "#EDCC61",
            "512": "#EDC850",
            "1024": "#EDC53F",
            "2048": "#EDC22E",
            "default": "#e0e0e0"
        }

        this.creareField();
        this.spawnNumbers();
    }

    creareField() {
        this.field = Array.from({ length: 4 }, () => Array(4).fill(0));
    }

    printField() {
        this.table.innerHTML = this.field.map(row =>
            `<tr>${row.map(cell => `<td style="background-color: ${this.colors[cell] || this.colors.default}">${cell || ''}</td>`).join('')}</tr>`
        ).join('');

        console.table(this.field);
        if (this.isGameOver() == 2) {
            document.getElementById("title").innerHTML = "Вы проиграли!";
        } else if (this.isGameOver() == 1) {
            document.getElementById("title").innerHTML = "Вы собрали 2048!";
        }
    }

    spawnNumbers(countSpawns = 2) {
        const emptyCells = this.field.flatMap((row, y) =>
            row.map((cell, x) => cell === 0 ? { x, y } : null).filter(Boolean)
        );

        if (emptyCells.length === 0) return;
        countSpawns = Math.min(countSpawns, emptyCells.length);

        while (countSpawns--) {
            const { x, y } = emptyCells.splice(Math.floor(Math.random() * emptyCells.length), 1)[0];
            this.field[y][x] = Math.random() < 0.9 ? 2 : 4;
        }

        this.printField();
    }

    moveLeft() {
        let pointerMove = false;
        let previousField = JSON.stringify(this.field);

        for (let x = 1; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                if (this.field[y][x] == 0) continue;

                if (this.field[y][x - 1] == this.field[y][x]) {
                    this.field[y][x - 1] *= 2;
                    this.field[y][x] = 0;

                    pointerMove = true;
                } else if (this.field[y][x - 1] == 0) {
                    this.field[y][x - 1] = this.field[y][x];
                    this.field[y][x] = 0;

                    pointerMove = true;
                }
            }

            if (pointerMove == true && x - 1 != 0) {
                x -= 2;
                pointerMove = false;
            }
        }

        if (previousField !== JSON.stringify(this.field)) {
            this.printField();
            setTimeout(() => { this.spawnNumbers(); }, TIME);
        } else {
            this.printField();
        }
    }

    moveRight() {
        let pointerMove = false;
        let previousField = JSON.stringify(this.field);

        for (let x = 2; x >= 0; x--) {
            for (let y = 0; y < 4; y++) {
                if (this.field[y][x] == 0) continue;

                if (this.field[y][x + 1] == this.field[y][x]) {
                    this.field[y][x + 1] *= 2;
                    this.field[y][x] = 0;

                    pointerMove = true;
                } else if (this.field[y][x + 1] == 0) {
                    this.field[y][x + 1] = this.field[y][x];
                    this.field[y][x] = 0;

                    pointerMove = true;
                }
            }

            if (pointerMove == true && x + 1 != 3) {
                x += 2;
                pointerMove = false;
            }
        }

        if (previousField !== JSON.stringify(this.field)) {
            this.printField();
            setTimeout(() => { this.spawnNumbers(); }, TIME);
        } else {
            this.printField();
        }
    }

    moveUp() {
        let pointerMove = false;
        let previousField = JSON.stringify(this.field);

        for (let y = 1; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.field[y][x] == 0) continue;

                if (this.field[y - 1][x] == this.field[y][x]) {
                    this.field[y - 1][x] *= 2;
                    this.field[y][x] = 0;

                    pointerMove = true;
                } else if (this.field[y - 1][x] == 0) {
                    this.field[y - 1][x] = this.field[y][x];
                    this.field[y][x] = 0;

                    pointerMove = true;
                }
            }

            if (pointerMove == true && y - 1 != 0) {
                y -= 2;
                pointerMove = false;
            }
        }

        if (previousField !== JSON.stringify(this.field)) {
            this.printField();
            setTimeout(() => { this.spawnNumbers(); }, TIME);
        } else {
            this.printField();
        }
    }

    moveDown() {
        let pointerMove = false;
        let previousField = JSON.stringify(this.field);

        for (let y = 2; y >= 0; y--) {
            for (let x = 0; x < 4; x++) {
                if (this.field[y][x] == 0) continue;

                if (this.field[y + 1][x] == 0) {
                    this.field[y + 1][x] = this.field[y][x];
                    this.field[y][x] = 0;

                    pointerMove = true;
                } else if (this.field[y + 1][x] == this.field[y][x]) {
                    this.field[y + 1][x] *= 2;
                    this.field[y][x] = 0;

                    pointerMove = true;
                }
            }

            if (pointerMove == true && y + 1 != 3) {
                y += 2;
                pointerMove = false;
            }
        }

        if (previousField !== JSON.stringify(this.field)) {
            this.printField();
            setTimeout(() => { this.spawnNumbers(); }, TIME);
        } else {
            this.printField();
        }
    }

    isGameOver() {
        if (this.field.flat().includes(0)) return 0;

        const has2048 = this.field.flat().includes(2048);
        if (has2048) return 1;

        const directions = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 }
        ];

        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                for (const { dx, dy } of directions) {
                    const nx = x + dx;
                    const ny = y + dy;

                    if (nx >= 0 && nx < 4 && ny >= 0 && ny < 4) {
                        if (this.field[y][x] === this.field[ny][nx]) {
                            return 0;
                        }
                    }
                }
            }
        }

        return 2;
    }
}

let game = new Game();

document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case 'ArrowUp':
            game.moveUp();
            break;
        case 'ArrowDown':
            game.moveDown();
            break;
        case 'ArrowLeft':
            game.moveLeft();
            break;
        case 'ArrowRight':
            game.moveRight();
            break;
    }
});

document.getElementById("up-button").addEventListener("click", function () {
    game.moveUp();
});

document.getElementById("left-button").addEventListener("click", function () {
    game.moveLeft();
});

document.getElementById("down-button").addEventListener("click", function () {
    game.moveDown();
});

document.getElementById("right-button").addEventListener("click", function () {
    game.moveRight();
});
