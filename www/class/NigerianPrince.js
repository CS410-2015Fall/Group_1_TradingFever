NigerianPrince.prototype = new Investment();
NigerianPrince.prototype.constructor = NigerianPrince;
function NigerianPrince(){
	this.setInvestmentType("NigerianPrince");
	this.currentLevel = 0;
	this.chanceOfSuccess = 1.01;
	this.currentWorth = 0;
	this.potentialReturn = 0; // money return if successful
	
	// for income
	this.monthlyReturn = 0;
	this.setMonthlyReturn = function(newMonthlyReturn){
		monthlyReturn = newMonthlyReturn;
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
		return 2500*Math.pow(1.2, this.currentLevel);
	}
	this.upgrade = function(){
		this.rewardDuration = 10 * 1000;
		if (Math.random() < this.getChanceOfSuccess()){
		if (this.currentLevel == 0){
			swal({title: "Royal Correspondence!", 
			text: "Investment Advisor Kato says: \nWow! You barely even have to do anything! Hook me UP!",  
      		imageUrl: "img/advisor.jpg",  
      		type: "success",
      		showCancelButton: true,   
      		confirmButtonColor: "#DD6B55",   
      		confirmButtonText: "Seems legit",   closeOnConfirm: false });
		}

		// TODO: improve this implementation
		this.potentialReturn *= 2;
		this.currentLevel += 1;
		this.setChanceOfSuccess(this.getChanceOfSuccess()*0.9);
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}else{
			this.monthlyReturn = 250*Math.pow(1.2, this.currentLevel-1);
		}	
		}

		else if(Math.random() < this.getChanceOfSuccess() && this.getChanceOfSuccess() < 0.5){
		var policeSiren_Sound= new Audio('sound/policeSiren.wav');
				policeSiren_Sound.play();
			swal({title: "CAUGHT!", 
					text: "Investment Advisor Kato says: \nI don't know you, and you don't know me! I never advised you, got that??",  
					imageUrl: "img/advisor.jpg",  
					type: "error",
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "Time to run! (lose operations, 10% of cash)",   closeOnConfirm: false });
		this.currentLevel = 0;
		theAvatar.setCashAmount(theAvatar.getCashAmount()*0.9);
		this.potentialReturn *= 2;
		this.setChanceOfSuccess(1);
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}
		else{
			this.monthlyReturn = 250*Math.pow(1.2, this.currentLevel-1);
		}	
		}



		else{
		var policeSiren_Sound= new Audio('sound/policeSiren.wav');
				policeSiren_Sound.play();
		swal({title: "Busted!", 
					text: "Investment Advisor Kato says: \nThey caught the Nigerian! Looks like you're hiring again!",  
					imageUrl: "img/advisor.jpg",  
					type: "warning",
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "They will never suspect me",   closeOnConfirm: false });
		this.potentialReturn /= 2;
		this.currentLevel -= 1;
		this.setChanceOfSuccess(1);
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}else{
			this.monthlyReturn = 250*Math.pow(1.2, this.currentLevel-1);
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