function Scam(scamID){

	this.prototype = new Investment(scamID);
	this.prototype.setScam = Scam;

	this.successRate = 0.1;
}

Scam.prototype.update = function(){

	if (Math.random() > this.successRate) {
		var profit = this.prototype.cost * this.prototype.profitPercentage;
		theAvatar.setCashAmount(theAvatar.getCashAmount() + profit);
		console.log("The " + this.prototype.name + " overcame his mishaps. He is now paying you back " + (this.prototype.profitPercentage * 100) + "%.";
	}
	
	else {
		console.log("Uh-oh! " + "You got scammed by " + this.prototype.name + ". You lost all your money.");
	}
}