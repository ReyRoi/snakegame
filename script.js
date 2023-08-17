const playboard = document.querySelector(".playboard");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".high");
const button = document.querySelectorAll(".controls i")

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let snakebody = []
let gameover = false;
let setintervalid;
let score = 0;
let highscore = localStorage.getItem("high-score") || 0;
highscoreElement.textContent = `High Score: ${highscore}`;

const handleover = () => {
    clearInterval(setintervalid);
    alert("Game over! press ok to replay..");
    location.reload();
}
const getrandom = () => {
    let X = Math.floor(Math.random() * 30) + 1
    let Y = Math.floor(Math.random() * 30) + 1
    foodX = X
    foodY = Y


}
button.forEach(key => {
    key.addEventListener('click', () => changedirection({ key: key.dataset.key }))
})
const changedirection = (e) => {
    console.log(e)
    if (e.key === 'ArrowUp' && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    }
    else if (e.key === 'ArrowDown' && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }
    else if (e.key === 'ArrowRight' && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
    else if (e.key === 'ArrowLeft' && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }
}

const initgame = () => {
    if (gameover) return handleover()
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    if (snakeX == foodX && snakeY == foodY) {
        getrandom();
        snakebody.push([foodX, foodY])
        score++;
        if (score > highscore) {
            highscore = score
        }
        localStorage.setItem("high-score", highscore);
        scoreElement.innerText = `Score: ${score}`;
        highscoreElement.textContent = `High Score: ${highscore}`;
        console.log(highscore)

    }
    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1]
    }
    snakebody[0] = [snakeX, snakeY]
    snakeX += velocityX;
    snakeY += velocityY;
    if (snakeX == 0 || snakeX == 31 || snakeY == 0 || snakeY == 31) {
        gameover = true
    }
    for (let i = 0; i < snakebody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
        if (i != 0 && snakebody[0][1] == snakebody[i][1] && snakebody[0][0] == snakebody[i][0]) {
            gameover = true
        }
    }

    playboard.innerHTML = html
}

getrandom();
setintervalid = setInterval(initgame, 125);

document.addEventListener('keydown', changedirection)
