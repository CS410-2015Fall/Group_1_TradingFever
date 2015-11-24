LoanSharks.prototype = new Investment();
LoanSharks.prototype.constructor = LoanSharks;
function LoanSharks(){
	this.setInvestmentType("LoanSharks");
	this.currentLevel = 0;
	this.chanceOfSuccess = 1.01;
	this.currentWorth = 0;
	this.potentialReturn = 0; // money return if successful
	
	// for income
	this.monthlyReturn = 0;
	this.cashOutInterval = 3*1000; 
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
	this.setCurrentWorth = function(newWorth){
		this.currentWorth = newWorth;
	}
	this.grabCollectableReward = function(){
		var currentTime = new Date();
		currentTime = currentTime.getTime();
		
		var timePassed = currentTime - this.getLastCashedTime(); //milliseconds
		var numRoundNewDeposit = Math.floor(timePassed/this.getCashOutInterval());
		if (numRoundNewDeposit < 0){
			numRoundNewDeposit = 0;
		}
		var amountAvailable = numRoundNewDeposit * this.monthlyReturn;
		this.setLastCashedTime(this.getLastCashedTime() + numRoundNewDeposit * this.getCashOutInterval());
		return amountAvailable;
	}

	this.setChanceOfSuccess = function(percentage){
		this.chanceOfSuccess = percentage;
		// note: this function is called by upgrade
	}
	this.getChanceOfSuccess = function(percentage){
		return this.chanceOfSuccess;
		
	}
	this.setPotentialReturn = function(newPotentialReturn){
		this.potentialReturn = newPotentialReturn;
	}
	this.getPotentialReturn = function(){
		return this.potentialReturn;
	}
	
	// interface methods
	this.initiateInvestment = function(currentTime, assignedID){
		this.setLastCashedTime(currentTime);
		this.setInvestmentID(assignedID);
	}
	this.getCurrentWorth = function(currentTime){
		// TODO: a start-up should have no worth until successful
		// Implement the calculation of currentWorth here
		return this.currentWorth;
	}
	this.getIncomeStatement = function(){
		var toReturn = {};
		toReturn = {
			'amount':0,
			'duration':'depends',
			'cashOutMethod':'get cash if successful'
		}
		return toReturn;
	}
	this.upgradeable = function(){
		return true; // TODO: should be false if reached max level
	}
	this.upgradeCost = function(){
		return 500*Math.pow(1.2, this.currentLevel);
	}
	this.upgrade = function(){

	if (Math.random() < this.getChanceOfSuccess()){
			if (this.currentLevel == 0){
				swal({title: "That's some high yields!", 
					text: "Investment Advisor Kato says: \nWhy's that guy carrying around a baseball bat?",  
					imageUrl: "img/advisor.jpg",  
					type: "success",
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "Time to rake it in!",   closeOnConfirm: false });
			}

		// TODO: improve this implementation
		this.potentialReturn *= 2;
		this.currentLevel += 1;
		this.setChanceOfSuccess(this.getChanceOfSuccess()*0.9);
		this.monthlyReturn = 10*Math.pow(this.currentLevel, 1.5);
	}else{
		swal({title: "Busted!", 
					text: "Investment Advisor Kato says: \nI told you that guy looked sketch! Good thing they couldn't trace the money to you.",  
					imageUrl: "img/advisor.jpg",  
					type: "warning",
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "Losing money is better than incarceration",   closeOnConfirm: false });
		this.potentialReturn /= 2;
		this.currentLevel -= 1;
		this.setChanceOfSuccess(1);
		this.monthlyReturn = 10*Math.pow(this.currentLevel, 1.5);
	}
}
this.sellable = function(){
	return true;
}
this.needsClear = function(){
	return false;
}
}