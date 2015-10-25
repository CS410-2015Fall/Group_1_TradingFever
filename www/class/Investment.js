function Investment(investID){
	
	this.id = investID;
	this.type = "";
	this.name = "";
	this.description = "";
	this.cost = 0;
	this.profitPercentage = 0;
	this.duration = 0;

	this.startTime = 0;
}

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

Investment.prototype.invest = function(){
	var cash = theAvatar.getCashAmount();
	if (cash >= this.cost) {
		cash = cash - this.cost;
	} 
	else return null;

	var date = new Date();
	var timeNow = date.getTime();
	this.startTime = timeNow;
	return cash;
}

Investment.prototype.track = function(){
	var date = new Date();
	var timeNow = date.getTime();
	var timePassed = timeNow - this.startTime;
	
	var seconds = 1000
	var minutes = seconds * 60;
	var hours = minutes * 60;
	var hoursPassed = timePassed / hours;
	
	if (hoursPassed >= this.duration){
		this.startTime = timeNow;
		this.update();
	}
}

Investment.prototype.update = function(){
	var profit = this.cost * this.profitPercentage;
	theAvatar.setCashAmount(theAvatar.getCashAmount() + profit);
}