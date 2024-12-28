class ScoreHolder{
	constructor(){
		this.scores = [];
		this.hiScore = 0;
		this.avgScore = 0;
	}
	
	add(s){
		this.scores.push(s);
		let total = 0;
		let curScore;
		for(let i=0; i<this.scores.length; i++){
			curScore = this.scores[i];
			total += curScore;
			if(curScore > this.hiScore){
				this.hiScore = curScore;
			}
		}
		this.avgScore = total/this.scores.length;
	}
}