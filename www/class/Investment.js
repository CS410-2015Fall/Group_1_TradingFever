function Investment(investID){
	
	this.id = investID;
	this.type = "";
	this.name = "";
	this.description = "";
	this.cost = 0;
	this.profitPercentage = 0;
	this.duration = 0;
	this.level = 0;
	this.startTime = 0;
	this.level = 0;
}

// constructor
Investment.prototype.setInvestment = function(){
	var jsonData = listOfPossibleInvestments;
	var investment = "";
	for(var i = 0; i < jsonData.investments.length; i++) {
		if (jsonData.investments[i].id == this.id) {
			investment = jsonData.investments[i];
		}
	}
	this.type = investment.type;
	this.name = investment.name;
	this.description = investment.description;
	this.cost = investment.cost;
	this.profitPercentage = investment.profitPercentage;
	this.duration = investment.duration;
}

// make the investment and return the remaining cash value
Investment.prototype.invest = function(){
	var cash = theAvatar.getCashAmount();
	if (cash >= this.cost) {
		cash -= this.cost;
	} 
	else return null;

	var date = new Date();
	var timeNow = date.getTime();
	this.startTime = timeNow;
	this.level ++;
	return cash;
}

// returns true if time is up
Investment.prototype.track = function(){
	var date = new Date();
	var timeNow = date.getTime();
	var timePassed = timeNow - this.startTime;
	
	var seconds = 1000
	//var minutes = seconds * 60;
	//var hours = minutes * 60;
	var hoursPassed = timePassed / seconds;
	
	if (hoursPassed >= this.duration){
		this.startTime = timeNow;
		return true;
	}
}

// update the cash value; may be overriden by subclass
Investment.prototype.update = function(){
	var profit = this.cost * this.profitPercentage;
	theAvatar.setCashAmount(theAvatar.getCashAmount() + profit);
}

// upgrade the real estate investments
Investment.prototype.upgradeRealEstate = function(){
}