//declaring game objects
let squareGame;
let typeGame;
let pongGame;
//game buttons
let menuButton, squareGameButton, typeGameButton, pongGameButton;
//score holders
let squareScoreHolder, typeScoreHolder, pongScoreHolder;


/* always integer value
* 0 for main menu
* 1 for square click 
* 2 for type
* 3 for pong */
let gameState;

function preload() {
  //loadFont('assets/SourceCodePro-Medium.otf');
}

function setup() {
  createCanvas(610, 400);
  gameState = 0;
  strokeWeight(3);
  squareScoreHolder = new ScoreHolder();
  typeScoreHolder = new ScoreHolder();
  pongScoreHolder = new ScoreHolder();
  //initializing objects for each game class
  resetGames();

  //buttons
  textSize(12);
  squareGameButton = createButton("Play");
  squareGameButton.position(145, 60);
  squareGameButton.mouseClicked(openSquareGame);
  squareGameButton.show();

  typeGameButton = createButton("Play");
  typeGameButton.position(345, 60);
  typeGameButton.mouseClicked(openTypeGame);
  typeGameButton.show();

  pongGameButton = createButton("Play");
  pongGameButton.position(545, 60);
  pongGameButton.mouseClicked(openPongGame);
  pongGameButton.show();

  menuButton = createButton("Menu");
  menuButton.position(540, 10);
  menuButton.mouseClicked(openMenu);
  menuButton.hide();



}

function draw() {
  if (gameState == 0) {
    fill(255);
    background("#c9daf8ff");
    textSize(20);
    strokeWeight(3);
    //square click game tile
    rect(10, 50, 190, 340);
    //type game tile
    rect(210, 50, 190, 340);
    //pong game tile
    rect(410, 50, 190, 340);

    fill(0);
    textSize(32);
    text("Welcome!", 305 - textWidth("Welcome") / 2, 35);
    textSize(20);
    text("Square Click", 15, 75);
    text("Type", 215, 75);
    text("Pong", 415, 75);
    showGameStats(squareGame, 15, 90);
    showGameStats(typeGame, 215, 90);
    showGameStats(pongGame, 415, 90);


  }
  else if (gameState == 1) {
    squareGame.game();
  }
  else if (gameState == 2) {
    typeGame.draw()
  }
  else if (gameState == 3) {
    pongGame.game();
  }

  else {
    //error case
    gameState = 0;
  }
}

function mouseClicked() {
  if (gameState == 1) {
    squareGame.mouseClicked();
  }
  //prevent browser default
  return false;
}

function keyPressed() {
  if (gameState == 2) {
    typeGame.keyPressed(keyCode);
  }
}

function openMenu() {
  gameState = 0;
  squareGameButton.show();
  typeGameButton.show();
  pongGameButton.show();
  resetGames();
}

function openSquareGame() {
  gameState = 1;
  squareGameButton.hide();
  typeGameButton.hide();
  pongGameButton.hide();
  menuButton.show();
  resetGames()
}

function openTypeGame() {
  gameState = 2;
  squareGameButton.hide();
  typeGameButton.hide();
  pongGameButton.hide();
  menuButton.show()
  resetGames()
}

function openPongGame() {
  gameState = 3;
  squareGameButton.hide();
  typeGameButton.hide();
  pongGameButton.hide();
  menuButton.show();
  resetGames()
}

//displays stats of game with coords x,y as the top left corner
//unfinished
function showGameStats(game, x, y) {
  let oldTextSize = textSize();
  textSize(15);

  text("High Score: " + game.scoreHolder.hiScore, x, y + 15);
  text("Average Score: " + Math.round(game.scoreHolder.avgScore), x, y + 30);
  textSize(oldTextSize);
  //graph frame
  fill(255);
  strokeWeight(2);
  rect(x + 20, y + 105, 160, 180)
  fill(0);
  strokeWeight(1);
  //graph
  if (game.scoreHolder.scores.length > 0) {
    xPos = x + 20;
    maxScore = 0;
    let xIncrement = 160 / (game.scoreHolder.scores.length);
    for (let score in game.scoreHolder.scores) {
      if (game.scoreHolder.scores[score] > maxScore) {
        maxScore = game.scoreHolder.scores[score];
      }
    }
    for (let score = 0; score < game.scoreHolder.scores.length; score++) {
      yPos = calcPtYPos(y, maxScore, game.scoreHolder.scores[score]);
      circle(xPos, yPos, 10);
      textSize(11);
      text(game.scoreHolder.scores[score], x, yPos);
      if (score < game.scoreHolder.scores.length - 1) {
        strokeWeight(2);
        line(xPos, yPos, xPos + xIncrement, calcPtYPos(y, maxScore, game.scoreHolder.scores[score + 1]));
      }
      xPos += xIncrement;

    }
  } else {
    fill(0);
    strokeWeight(0);
    text("No scores yet.", x + 25, y + 105 + 20);
  }
}

function calcPtYPos(y, maxScore, pt) {
  return y + 115 + 180 - ((180 / maxScore) * pt)-10;
}

function resetGames() {
  squareGame = new SquareClickGame(squareScoreHolder);
  squareGame.setup();
  typeGame = new TypeGame(typeScoreHolder);
  typeGame.setup();
  pongGame = new PongGame(pongScoreHolder);
  pongGame.setup();
}

/*
function drawXButton() {
  fill(255, 0, 0);
  square(570, 10, 30);
  line(575, 15, 595, 35);
  line(595, 15, 575, 35);
}
*/