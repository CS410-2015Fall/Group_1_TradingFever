RealEstate.prototype = new Investment();
RealEstate.prototype.constructor = RealEstate;
function RealEstate(){
	this.setInvestmentType("RealEstate");
	this.currentLevel = 0;
	this.currentWorth = 0;
	this.monthlyReturn = 0;
	this.chanceOfSuccess = 1;
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
			'duration':this.rewardDuration,
			'cashOutMethod':'discrete',
			'hasRisk':false
		};
		return toReturn;
	}
	this.upgradeable = function(){
		return true; // TODO: should be false if reached max level
	}
	this.upgradeCost = function(){
		return 50000*Math.pow(1.2, this.currentLevel);
	}
	this.upgrade = function(){
		this.rewardDuration = 8 * 1000;
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
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}else{
			this.monthlyReturn = 5000*Math.pow(1.2, this.currentLevel-1);
		}	
		}

		else if(Math.random() < this.getChanceOfSuccess() && this.getChanceOfSuccess() < 0.5){
			swal({title: "SUBPRIME MELTDOWN!", 
					text: "Investment Advisor Kato says: \n Everyone's defaulting on their mortgages! Quick, sell your houses before they turn worthless!!",  
					imageUrl: "img/advisor.jpg",  
					type: "error",
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "Sell it all! (dump real estate on the cheap)",   closeOnConfirm: false });
		theAvatar.setCashAmount(theAvatar.getCashAmount()+this.currentLevel*25000);
		this.currentLevel = 0;
		this.potentialReturn *= 2;
		this.setChanceOfSuccess(1);
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}
		else{
			this.monthlyReturn = 5000*Math.pow(1.2, this.currentLevel-1);
		}	
		}


		else{
		swal({title: "Recession!", 
					text: "Investment Advisor Kato says: \nWe should probably offload some assets in case this turns for the worse!",  
					imageUrl: "img/advisor.jpg",  
					type: "warning",
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "Sensible advice",   closeOnConfirm: false });
		this.potentialReturn /= 2;
		theAvatar.setCashAmount(theAvatar.getCashAmount()+25000);
		this.currentLevel -= 1;
		this.setChanceOfSuccess(this.getChanceOfSuccess()*0.95);
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}else{
			this.monthlyReturn = 5000*Math.pow(1.2, this.currentLevel-1);
		}	
	}
	}
	this.sellable = function(){
		return true; //Always true for RealEstate
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
	this.needsClear = function(){
		return false;
	}
}