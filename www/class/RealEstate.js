RealEstate.prototype = new Investment();
RealEstate.prototype.constructor = RealEstate;
function RealEstate(){
	this.setInvestmentType("RealEstate");
	this.currentLevel = 0;
	this.currentWorth = 0;
	this.monthlyReturn = 0;
	//this.cashOutInterval = 24*60*60*1000; // Time interval in milliseconds // 1 day
	this.cashOutInterval = 3*1000;  // Time interval in milliseconds
	this.chanceOfSuccess = 1.01;
	// random events
	this.setChanceOfSuccess = function(percentage){
		this.chanceOfSuccess = percentage;
		// note: this function is called by upgrade
	}
	this.getChanceOfSuccess = function(percentage){
		return this.chanceOfSuccess;
		
	}
	
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
		return 100*Math.pow(1.2, this.currentLevel);
	}
	this.upgrade = function(){
		if (Math.random() < this.getChanceOfSuccess()){
		if (this.currentLevel == 0){
			swal({title: "The American Dream!", 
			text: "Investment Advisor Kato says: \nInvesting in properties with subprime mortgages is so 2008-we call it nonprime now!",  
      		imageUrl: "img/advisor.jpg",  
      		type: "success",
      		showCancelButton: true,   
      		confirmButtonColor: "#DD6B55",   
      		confirmButtonText: "You gotta borrow money to make money",   closeOnConfirm: false });
		}

		// TODO: improve this implementation
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
		return true; //Always true for RealEstate
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
	this.needsClear = function(){
		return false;
	}
}