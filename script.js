//John Conway's Game of Life

//Declare the matrix
function simulation (size, days){ 
    const matrix = new Array(size);
    for (let i = 0; i < size; i++) {
    matrix[i] = new Array(size);
    }

    //Initialize our matrix with random values between 0 and 1
    for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        matrix[i][j] = Math.round(Math.random());
    }
    }
    // console.log(matrix)
    //These will be our random starting values for the game of life
    //Now we need to check the neighbors of each cell
    //If the cell is alive and has 2 or 3 neighbors, it stays alive
    //If the cell is dead and has 3 neighbors, it comes alive
    //Otherwise, it dies

    //This function will check the neighbors of a cell
    function checkNeighbors(matrix, x, y) {
        let neighbors = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            if (matrix[x + i] && matrix[x + i][y + j]) {
                neighbors++;
            }
            }
        }
        return neighbors;
        }
    //function to print a matrix
    function printMatrix(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            console.log(matrix[i].join(" "));
        }
    }

    //function to update the matrix
    function updateMatrix(matrix) {
        const newMatrix = new Array(size);
        for (let i = 0; i < size; i++) {
            newMatrix[i] = new Array(size);
        }
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const neighbors = checkNeighbors(matrix, i, j);
                if (matrix[i][j] === 1 && (neighbors === 2 || neighbors === 3)) {
                    newMatrix[i][j] = 1;
                } else if (matrix[i][j] === 0 && neighbors === 3) {
                    newMatrix[i][j] = 1;
                } else {
                    newMatrix[i][j] = 0;
                }
            }
        }
        return newMatrix;
    }
    function drawMatrix(matrix) {
        var canvas = document.getElementById("plane");
        var ctx = canvas.getContext("2d");
        var width = canvas.width;
        var height = canvas.height;
        var cellWidth = width / size;
        var cellHeight = height / size;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (matrix[i][j] === 1) {
                    ctx.fillStyle = "black";
                } else {
                    ctx.fillStyle = "white";
                }

                ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            }
        }
    }

    //function to run the game
    function runGame(matrix) {
        for (let i = 0; i < days; i++) {
            //wait two seconds between each loop iteration to see the changes
            setTimeout(function () {
                matrix = updateMatrix(matrix);
                drawMatrix(matrix);
            }, 200 * i);
        }
    }
    runGame(matrix);
}
var button = document.getElementById("start");
button.addEventListener("click", function () {
    var days = document.getElementById("days").value;
    var size = document.getElementById("size").value;
    simulation(size, days);
});

