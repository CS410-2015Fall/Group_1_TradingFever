RealEstate.prototype = new Investment();
RealEstate.prototype.constructor = RealEstate;
function RealEstate(){
	this.setInvestmentType("RealEstate");
	
	this.currentWorth = 0;
	this.monthlyReturn = 0;
	//this.cashOutInterval = 24*60*60*1000; // Time interval in miliseconds // 1 day
	this.cashOutInterval = 5*1000; // Time interval in miliseconds
	
	this.setCurrentWorth = function(newWorth){
		this.currentWorth = newWorth;
	}
	this.setMonthlyReturn = function(newMonthlyReturn){
		monthlyReturn = newMonthlyReturn;
	}
	
	this.setCashOutInterval = function(newInterval){
		// unit: miliseconds
		this.cashOutInterval = newInterval;
	}
	this.getCashOutInterval = function(){
		// unit: miliseconds
		return this.cashOutInterval;
	}
	
	// interface methods
	this.initiateInvestment = function(currentTime, assignedID){
		this.setLastCashedTime(currentTime);
		this.setInvestmentID(assignedID);
		// To think about: move this method to Investment class?
	}
	this.getCurrentWorth = function(currentTime){
		return this.currentWorth;
	}
	this.getIncomeStatement = function(){
		var toReturn = {};
		toReturn = {
			'amount':this.monthlyReturn,
			'duration':this.cashOutInterval,
			'cashOutMethod':'discrete',
			'hasRisk':false
		};
		return toReturn;
	}
	this.upgradeable = function(){
		return true; // TODO: should be false if reached max level
	}
	this.upgradeCost = function(){
		return 500*this.currentLevel; //TODO: Change this. Should change with every level
	}
	this.upgrade = function(){
		// TODO: improve this implementation
		this.monthlyReturn += 10*(this.currentLevel + 1);
		this.currentLevel += 1;
	}
	this.sellable = function(){
		return true; //Always true for RealEstate
	}
	this.grabCollectableReward = function(){
		var currentTime = new Date();
		currentTime = currentTime.getTime();
		
		var timePassed = currentTime - this.getLastCashedTime(); //miliseconds
		var numRoundNewDeposit = Math.floor(timePassed/this.getCashOutInterval());
		if (numRoundNewDeposit < 0){
			numRoundNewDeposit = 0;
		}
		var amountAvailable = numRoundNewDeposit * this.monthlyReturn;
		this.setLastCashedTime(this.getLastCashedTime() + numRoundNewDeposit * this.getCashOutInterval());
		return amountAvailable;
	}
	this.needsClear = function(){
		return false;
	}
	this.setCurrentWorth = function(newWorth){
		throw('not yet implemented');
	}
}