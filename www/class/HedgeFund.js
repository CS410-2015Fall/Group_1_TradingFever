HedgeFund.prototype = new Investment();
HedgeFund.prototype.constructor = HedgeFund;
function HedgeFund(){
	this.setInvestmentType("HedgeFund");
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
		var numRoundNewDeposit = Math.floor(timePassed/this.rewardDuration);
		if (numRoundNewDeposit < 0){
			numRoundNewDeposit = 0;
		}
		var amountAvailable = numRoundNewDeposit * this.monthlyReturn;
		this.setLastCashedTime(this.getLastCashedTime() + numRoundNewDeposit * this.rewardDuration);
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
			'amount':this.monthlyReturn,
			'duration':this.rewardDuration,
			'cashOutMethod':'get cash if successful'
		}
		return toReturn;
	}
	this.upgradeable = function(){
		return true; // TODO: should be false if reached max level
	}
	this.upgradeCost = function(){
		return 1000000*Math.pow(1.2, this.currentLevel);
	}
	this.upgrade = function(){
		this.rewardDuration = 10 * 1000;
		if (Math.random() < this.getChanceOfSuccess()){
		if (this.currentLevel == 0){
			swal({title: "We're in the big leagues now!", 
			text: "Investment Advisor Kato says: \nI heard this guy never loses money. I'm so jealous you get to invest with him!",  
      		imageUrl: "img/advisor.jpg",  
      		type: "success",
      		showCancelButton: true,   
      		confirmButtonColor: "#DD6B55",   
      		confirmButtonText: "The SEC trusts this guy...",   closeOnConfirm: false });
		}

		// TODO: improve this implementation
		this.potentialReturn *= 2;
		this.currentLevel += 1;
		this.setChanceOfSuccess(this.getChanceOfSuccess()*0.9);
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}else{
			this.monthlyReturn = 100000*Math.pow(2, this.currentLevel-1);
		}	
	}
		
		else if(this.getChanceOfSuccess() == 0){
			swal({title: "PONZI SCHEME!", 
					text: "Investment Advisor Kato says: \nA giant pyramid scheme all along! His biggest investor just committed suicide! At least we managed to salvage some of your money back...it's SOMETHING!",  
					imageUrl: "img/advisor.jpg",  
					type: "error",
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "Well, it's not nothing",   closeOnConfirm: false });
		this.currentLevel = 0;
		this.potentialReturn *= 2;
		this.setChanceOfSuccess(1);
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}

		else{
			this.monthlyReturn = 100000*Math.pow(2, this.currentLevel-1);
		}	
		}

		else{
		swal({title: "A Request", 
					text: "Investment Advisor Kato says: \nHe's giving you an opportunity to invest even more with him! O.M.G!",  
					imageUrl: "img/advisor.jpg",  
					type: "warning",
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "More, more, MORE!",   closeOnConfirm: false });
		this.potentialReturn *= 2;
		this.currentLevel += 1;
		this.setChanceOfSuccess(0);
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}else{
			this.monthlyReturn = 100000*Math.pow(2, this.currentLevel-1);
		}	
	}
	}

	this.sellable = function(){
		return true;
	}
	this.needsClear = function(){
		return false;
	}
	
	this.toJSON = function(){
		var toReturn = {
			'investmentType':this.getInvestmentType(),
			'currentLevel':this.getCurrentLevel(),
			'chanceOfSuccess':this.getChanceOfSuccess(),
			'currentWorth':this.getCurrentWorth(),
			'potentialReturn':this.getPotentialReturn(),
			'monthlyReturn': this.monthlyReturn,
			'investmentID':this.investmentID,
			'investmentTitle':this.investmentTitle,
			'investmentDescription':this.investmentDescription,
			'lastCashedTime':this.lastCashedTime,
			'eventProbability':this.eventProbability,
			'successProbability':this.successProbability,
			'imageURL':this.imageURL,
			'rewardDuration':this.rewardDuration
		};
		return toReturn;
	};
	this.loadFromJSON = function(theJSON){
		this.setInvestmentType(theJSON.investmentType);
		this.setCurrentLevel(theJSON.currentLevel);
		this.setChanceOfSuccess(theJSON.chanceOfSuccess);
		this.setCurrentWorth(theJSON.currentWorth);
		this.setPotentialReturn(theJSON.potentialReturn);
		this.monthlyReturn = theJSON.monthlyReturn;
		this.investmentID = theJSON.investmentID;
		this.investmentTitle = theJSON.investmentTitle;
		this.investmentDescription = theJSON.investmentDescription;
		this.lastCashedTime = theJSON.lastCashedTime;
		this.eventProbability = theJSON.eventProbability;
		this.successProbability = theJSON.successProbability;
		this.imageURL = theJSON.imageURL;
		this.rewardDuration = theJSON.rewardDuration;
	};
}