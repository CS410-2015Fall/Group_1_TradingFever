function StartUp(startupID){

	this.prototype = new Investment(startupID);
	this.prototype.setStartUp = StartUp;
	this.prototype.upgradeable = true;

	this.successRate = 0.5;
}

StartUp.prototype.update = function(){

	if (Math.random() > this.successRate) {
		var profit = this.prototype.cost * this.prototype.profitPercentage;
		theAvatar.setCashAmount(theAvatar.getCashAmount() + profit);
		console.log("Wow! " + this.prototype.name + " is making money! You earned $" + profit + "!");
	}

	else {
		console.log("Uh-oh! " + this.prototype.name + " went bankrupt!. You lost all your money.");
	}
}