function Investment(investID){
	// name (String): name of the investment
	// type (String): type of investment.
	//		accepted type strings:
	//			"Startup"
	
	this.id = investID;
	this.type = "";
	this.name = "";
	this.description = "";
	this.cost = 0;
	this.profitPercentage = 0;
	this.duration = 0;

	this.startTime = 0;
}
	
Investment.prototype.setInvestment = function() {
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

Investment.prototype.invest = function() {
	var cash = theAvatar.getCashAmount();
	if (cash >= cost) {
		cash = cash - cost;
	} 
	else {
		return null;
	}
	var date = new Date();
	var timeNow = date.getTime();
	startTime = timeNow;
	return cash;
}

Investment.prototype.track = function() {
	var date = new Date();
	var timeNow = date.getTime();
	var timePassed = timeNow - startTime;
	var minutes = 1000 * 60;
	var hours = minutes * 60;
	var hoursPassed = timePassed / hours;
	if (hoursPassed >= duration) {
		update();
	}
}

Investment.prototype.update = function() {
	var profit = cost * profitPercentage;
	return profit;
}