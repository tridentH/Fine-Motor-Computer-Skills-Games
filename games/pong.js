class PongGame {
  constructor(sh) {
    this.scoreHolder = sh;
    this.on = false;
    this.score = 0;
    this.time = 20;
    this.balls = [];
    this.ballNum = 5;

    this.paddleX = mouseX - 60;
    this.paddleY = 350;
    this.paddleWidth = 120;
    this.paddleHeight = 20;

    this.fadeY = 5;
    this.fading = false;
  }

  setup() {
    this.on = true;
    for (let i = 0; i < this.ballNum; i++) {
      this.balls.push(this.genNewBall());
    }
    this.paddle = new Paddle(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight, color("#666666ff"))
  }

  game() {
	  background("#c9daf8ff");
		
		if(this.on == true){
			strokeWeight(2);
	    //show score and time
	    textSize(15);
	    fill(0);
	    strokeWeight(2);
	    text("Score: " + this.score + "\nTime: " + this.time, 10, 25);

      if(this.fading){
        if(this.fadeY > 4){
          this.fading = false;
        }
        strokeWeight(3);
        strokeWeight(0);
        fill('rgba(0,255,0, .3)');
        rect(0, 0, 610, 8);
        this.fadeY++;
        strokeWeight(2);
      }
			
	    //move and draw the paddle
	    this.paddle.setX(mouseX - this.paddle.width / 2);
	    this.paddle.show();
	    //move and draw the balls
	    for (let i = 0; i < this.balls.length; i++) {
	      this.balls[i].move(this.paddle);
	      this.balls[i].show();
				//add to score if ball bounces off of ceiling
				if(this.balls[i].hitCeil == true){
          this.fading = true;
          this.fadeY = 0;
					this.score++;
				} else if (this.balls[i].yPos > 430) {
    			this.balls.splice(i, 1);
					i--;
					if (this.balls.length <= 0){
						this.gameEnd();
					}
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

  gameEnd() {
    this.on = false;
    this.scoreHolder.add(this.score);
  }

  genNewBall() {
    let x = Math.floor(Math.random() * 500) + 50;
		let totalSpeed = 7;
		angleMode(DEGREES);
		let angle = Math.floor(Math.random() * 50) + 20;
		let xc = sin(angle)*totalSpeed;
		let yc = cos(angle)*totalSpeed;
    return new Ball(x, 50, 20, xc, yc, color("#ffab40ff"));
  }
}

class Paddle {
  constructor(x, y, w, h, c) {
    this.color = c;
    this.xPos = x;
    this.yPos = y;
    this.width = w;
    this.height = h;
  }

  setX(x) {
    this.xPos = x;
  }

  show() {
    fill(this.color);
    rect(this.xPos, this.yPos, this.width, this.height);
  }

	shouldBounce(ball) {
    let radius = ball.diameter / 2;
		return (ball.yPos >= this.yPos - radius && ball.yPos < this.yPos + this.height) && (ball.xPos >= this.xPos - radius && ball.xPos <= this.xPos + this.width + radius);
	}

	//returns true for right, false for left
	bounceSide(ball) {
		let centerX = this.xPos + this.width/2;
    return (ball.xPos > centerX);
	}
}

class Ball {

  constructor(x, y, d, xc, yc, col) {
    this.color = col;
    this.xPos = x;
    this.yPos = y;
    this.diameter = d;
    this.xChange = xc;
    this.yChange = yc;
		this.hitCeil = false;
		//this.oob = false;
  }

  move(paddle) {
    let radius = this.diameter / 2;
    let offCeil = this.yPos <= radius;
    let offWalls = this.xPos <= radius || this.xPos >= 610 - radius;
    //*sigh*
    let offPaddle = paddle.shouldBounce(this);
  /* let offPaddleRight = (this.yPos >= paddle.yPos - radius && this.yPos < paddle.yPos + paddle.height) && (this.xPos >= paddle.xPos - radius + this.paddleWidth /2  && this.xPos <= paddle.xPos + paddle.width + radius);   
    let offPaddleLeft = (this.yPos >= paddle.yPos - radius && this.yPos < paddle.yPos + paddle.height) && (this.xPos >= paddle.xPos - radius && this.xPos <= paddle.xPos + paddle.width /2 + radius);
    */
    if (offWalls) {
      this.xChange *= -1;
		} else if (offPaddle) {
			//bounce off left & right sides of the paddle in different directions
			let sideIsRight = paddle.bounceSide(this);
      if(sideIsRight) {
				this.xChange = abs(this.xChange);
			}else{
				this.xChange = -abs(this.xChange);
			}
			this.yChange = -abs(this.yChange);
		}
		if (offCeil) {
      this.yChange *= -1;
			this.hitCeil = true;
		} else {
			this.hitCeil = false;
		}
    this.xPos += this.xChange;
    this.yPos += this.yChange;
	}

  show() {
    fill(this.color);
    circle(this.xPos, this.yPos, this.diameter);
  }

}