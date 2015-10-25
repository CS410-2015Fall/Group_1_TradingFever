function Investment(investID){
	// name (String): name of the investment
	// type (String): type of investment.
	//		accepted type strings:
	//			"Startup"

	var jsonData = JSON.parse(www/json/listofInvestments.json);
	
	this.id = investID;
	this.type = "";
	this.name = "";
	this.description = "";
	this.cost = 0;
	this.profitPercentage = 0;
	this.duration = 0;

	this.startTime = 0;
	
	this.setInvestment = function() {
		var investment = "";
		var i;
		for(i = 0; i < jsonData.length; i++) {
			if (jsonData[i].id == id) {
				investment = jsonData[i];
			}
		}
		type = investment.type;
		name = investment.name;
		description = investment.description;
		cost = investment.cost;
		profitPercentage = investment.profitPercentage;
		duration = investment.duration;
	}
	
	this.prototype.invest = function() {
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

	this.prototype.track = function() {
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

	this.prototype.update = function() {
		var profit = cost * profitPercentage;
		return profit;
	}
}