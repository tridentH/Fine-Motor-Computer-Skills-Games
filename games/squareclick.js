class SquareClickGame {

  constructor(sh) {
    this.scoreHolder = sh;
    this.on = false;
    this.score = 0;
    this.time = 20;
    this.squareNum = 10;
    this.curSquares = [];
    this.fadingSquares = [];
  }

  setup() {
    this.on = true;
    for (let i = 0; i < this.squareNum; i++) {
      this.curSquares.push(this.genNewSquare(this.curSquares));
    }
  }

  game() {
    background("#c9daf8ff");

    if (this.on == true) {
      //show score and time
      textSize(15);
      fill(0);
      strokeWeight(2);
      text("Score: " + this.score + "\nTime: " + this.time, 10, 25);

      //draw squares
      for (let i = 0; i < this.curSquares.length - 1; i++) {
        this.curSquares[i].show();
      }

      //draw fading squares
      for (let i = 0; i < this.fadingSquares.length; i++) {
        this.fadingSquares[i].show();
        //delete squares that have become invisible
        if (this.fadingSquares[i].isInvisible()) {
          this.fadingSquares.splice(i, 1);
        }
      }

      //countdown timer
      if (frameCount % 60 == 0) {
        if (this.time > 0) {
          this.time--;
        } else {
          this.gameEnd();
        }
      }
    } else {
      textSize(35);
      fill(0);
      text("GAME OVER!", 305 - textWidth("GAME OVER!") / 2, 35);
      textSize(15);
      text("Your final score was: " + this.score, 305 - textWidth("Your final score was: " + this.score) / 2, 55);
    }
  }

  mouseClicked() {
    for (let i = 0; i < this.curSquares.length - 1; i++) {
      if (this.curSquares[i].doesOverlapPoint(mouseX, mouseY)) {
        this.squareClicked(i);
        break;
      }
    }
  }

  squareClicked(squareIndex) {
    let square = this.curSquares[squareIndex];
    this.curSquares.splice(squareIndex, 1);
    this.updateScore(1);
    square.fade();
    this.fadingSquares.push(square);
    this.curSquares.push(this.genNewSquare(this.curSquares));
  }

  updateScore(increment) {
    this.score += increment;
  }

  gameEnd() {
    this.on = false;
    this.scoreHolder.add(this.score);
  }

  genNewSquare(curSquares) {
    let curSideLen = floor(random(50) + 25);
    let curXPos = floor(random(590 - curSideLen));
    let curYPos = floor(random(350 - curSideLen));
    let curColor = color(floor(random(255)), floor(random(255)), floor(random(255)));
    let curSquare = new Square(curXPos + 10, curYPos + 40, curSideLen, curColor);

    for (let i = 0; i < curSquares.length; i++) {

      if (curSquare.doesOverlapSquare(curSquares[i])) {
        //calls itself recursively if overlaps
        return this.genNewSquare(curSquares);
      }
    }

    return curSquare;
  }
}

class Square {
  //xPos and yPos are the top left corner
  constructor(xPos, yPos, sideLen, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.sideLen = sideLen;
    this.color = color;
    this.fading = false;
    this.invisible = false;
  }

  show() {
    if (this.fading) {
      this.color.setAlpha(alpha(this.color) - 30);
      if (alpha(this.color) <= 0) {
        this.invisible = true;
      }
    }
    fill(this.color); //I can't change the fill back to its previous color since p5js doesn't allow me to easily access that. So we'll just have to call fill every time to make sure the color's correct.
    square(this.xPos, this.yPos, this.sideLen);
  }

  fade() { this.fading = true; }

  isInvisible() { return this.invisible; }

  doesOverlapPoint(otherX, otherY) {
    if ((otherX < this.xPos || otherX > (this.xPos + this.sideLen))
      || (otherY < this.yPos || otherY > (this.yPos + this.sideLen))) {
      return false;
    } else {
      return true;
    }
  }

  doesOverlapSquare(otherSquare) {
    //this looks way too long and also is very confusing

    let noOverlapX =
      (this.xPos + this.sideLen > otherSquare.xPos && this.xPos + this.sideLen < otherSquare.xPos + otherSquare.sideLen) ||
      (this.xPos < otherSquare.xPos + otherSquare.sideLen && this.xPos > otherSquare.xPos);

    let noOverlapY =
      (this.yPos + this.sideLen > otherSquare.yPos && this.yPos + this.sideLen < otherSquare.yPos + otherSquare.sideLen) || //other square to the right of this one
      (this.yPos < otherSquare.yPos + otherSquare.sideLen && this.yPos > otherSquare.yPos);



    if (noOverlapX == true || noOverlapY == true) {
      //if there's no overlaps in x, or none in y, the squares are not overlapping, so return false
      return true;
    } else {
      return false;
    }
  }
}

