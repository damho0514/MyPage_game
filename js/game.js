var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

/* 공을 치기 위한 패들 */
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
        
// 버튼을 누르는 것은 boolean 변수로 정의하고 초기화 합니다.
var rightPressed = false;
var leftPressed = false;

//벽돌 생성
var brickRowCount = 5;
var brickColumnCount = 4;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//점수
var score = 0;

//플레이어에게 생명을 주기
var lives = 3; //3개의 생명



var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
bricks[c] = [];
for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
}
else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
}
}

function keyUpHandler(e) {
if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
}
else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
}
}
function mouseMoveHandler(e){
var relativeX = e.clientX - canvas.offsetLeft;
if(relativeX > 0 && relativeX < canvas.width){
    paddleX = relativeX - paddleWidth/2;
}
}
function collisionDetection() {
for(var c=0; c<brickColumnCount; c++) {
for(var r=0; r<brickRowCount; r++) {
var b = bricks[c][r];
if(b.status == 1) {
    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
    dy = -dy;
    b.status = 0;
    score++;
    if(score == brickRowCount*brickColumnCount) {
        alert("YOU WIN, CONGRATS!");
        document.location.reload();
        // clearInterval(interval); // Needed for Chrome to end game
    }
    }
}
}
}
}

function drawBall() {
ctx.beginPath();
ctx.arc(x, y, ballRadius, 0, Math.PI*2);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}
function drawPaddle() {
ctx.beginPath();
ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}
function drawBricks() {
for(var c=0; c<brickColumnCount; c++) {
for(var r=0; r<brickRowCount; r++) {
if(bricks[c][r].status == 1) {
    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
    bricks[c][r].x = brickX;
    bricks[c][r].y = brickY;
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
}
}
}
function drawScore() {
ctx.font = "16px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Score: "+score, 8, 20);
}

//수명 카운터를 그리는 것은 점수 카운터를 그리는 것과 거의 같습니다.
//코드에 drawScore()함수 아래에 다음 함수를 추가합니다
function drawLives(){
ctx.font = "16px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Lives: " + lives, canvas.width-65, 20);
} 

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawBricks();
drawBall();
drawPaddle();
drawScore();
drawLives();
collisionDetection();

if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
dx = -dx;
}
if(y + dy < ballRadius) {
dy = -dy;
}
else if(y + dy > canvas.height-ballRadius) {
if(x > paddleX && x < paddleX + paddleWidth) {
dy = -dy;
}
else {
    lives--;
    if(!lives){
        alert("GAME OVER");
        document.location.reload();
    }
    else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
    }
}
}

if(rightPressed && paddleX < canvas.width-paddleWidth) {
paddleX += 7;
}
else if(leftPressed && paddleX > 0) {
paddleX -= 7;
}

x += dx;
y += dy;
requestAnimationFrame(draw);
}

draw();
