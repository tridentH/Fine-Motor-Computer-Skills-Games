class TypeGame {
  constructor(sh) {
    this.words = ['wash', 'ton', 'chop', 'king', 'nun', 'edge', 'last', 'post', 'grip', 'road', 'club', 'boy', 'pour', 'sign', 'shot', 'rest', 'knit', 'wolf', 'seed', 'vein', 'hole', 'user', 'try', 'pain', 'bald', 'item', 'ego', 'rage', 'cast', 'half', 'corn', 'hay', 'pity', 'neck', 'coup', 'leg', 'role', 'sum', 'end', 'love', 'bait', 'loud', 'left', 'hut', 'man', 'fuel', 'cap', 'bill', 'hope', 'baby', 'pump', 'cane', 'heat', 'pig', 'bean', 'bus', 'diet', 'fill', 'fine', 'lake', 'fate', 'wrap', 'roar', 'bake', 'war', 'chin', 'kid', 'fall', 'bat', 'slow', 'day', 'dark', 'leaf', 'tear', 'link', 'text', 'norm', 'maze', 'fee', 'risk', 'menu', 'king', 'pen', 'cold', 'fur', 'debt', 'ear', 'stun'];

    this.scoreHolder = sh;
    this.usedWords = [];

    this.wordIndex = 0;
    this.correct = true;
    this.word = this.getWord();
    this.typedChar;
    this.charIndex = 0;
    this.output = "";
    this.time = 20;
    this.score = 0;
    this.on = true;
  }

  setup() {
    this.on = true;
  }

  getWord() {
    let tempWord = random(this.words);
    if (this.usedWords.length >= this.words.length / 4) {
      return "DONE!";
    }
    if (this.usedWords.includes(tempWord)) {
      return this.getWord();
    }
    this.charIndex = 0;
    this.output = "_ ".repeat(tempWord.length);
    return tempWord; // select random word
  }

  draw() {
    if (this.on) {
      background("#c9daf8ff");
      if (this.correct) {
        this.word = this.getWord();
        this.correct = false;
      }
      text("Score: " + this.score + "\nTime: " + this.time, 10, 25);
      textSize(25)
      if (this.word == "DONE!") {
        text(this.word, 25, 100, 450, 185);
        this.output = "";
      } else {
        text('Type: ' + this.word, 25, 100, 450, 185); // draw the word 
      }

      //countdown timer
      if (frameCount % 60 == 0) {
        if (this.time > 0) {
          this.time--;
        } else {
          this.gameEnd();
        }
      }
      //console.log(output);
      text(this.output, 25, 200);
    } else {
      background("#c9daf8ff");
      textSize(35);
      fill(0);
      text("GAME OVER!", 305 - textWidth("GAME OVER!") / 2, 35);
      textSize(15);
      text("Your final score was: " + this.score, 305 - textWidth("Your final score was: " + this.score) / 2, 55);
    }
  }

  keyPressed(char) {
    if (String.fromCharCode(char) == this.word.toUpperCase()[this.charIndex]) {
      this.charIndex++;
      this.output = "";
      for (let i = 0; i < this.word.length; i++) {
        if (i < this.charIndex) {
          this.output += this.word.charAt(i) + " "
        } else {
          this.output += "_ "
        }
      }
      if (this.charIndex + 1 > this.word.length) {
        this.usedWords.push(this.word)
        this.correct = true;
        this.score++;
      }
    }
  }
  gameEnd() {
    this.on = false;
    this.scoreHolder.add(this.score);
  }
}