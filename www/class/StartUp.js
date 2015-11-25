StartUp.prototype = new Investment();
StartUp.prototype.constructor = StartUp;
function StartUp(){
	this.setInvestmentType("StartUp");
	this.currentLevel = 0;
	this.chanceOfSuccess = 0.8; // 1 means guaranteed. 0.5 means half and half. 0 means no chance
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
	this.getChanceOfSuccess = function(){
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
			'duration':this.rewardDuration,
			'cashOutMethod':'get cash if successful',
			'hasRisk':true
		}
		return toReturn;
	}
	this.upgradeable = function(){
		return true; // TODO: should be false if reached max level
	}
	this.upgradeCost = function(){
		return 10000*Math.pow(1.2, this.currentLevel);
	}
	this.upgrade = function(){
		console.log('checkpoint A' + this.currentLevel);
		this.rewardDuration = 5 * 1000; // (in milliseconds)
		var currentRand = Math.random();
		if (this.getCurrentLevel() ==0 || currentRand < this.getChanceOfSuccess()){
			console.log('checkpoint B' + this.currentLevel);
			if (this.currentLevel == 0){
				swal({title: "It cures cancer, man!", 
				text: "Investment Advisor Kato says: \nNeed someone to help with quality assurance?",  
				imageUrl: "img/advisor.jpg",  
				type: "success",
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "No, but I could use lobbyists",   closeOnConfirm: false });
			}
			console.log('checkpoint C' + this.currentLevel);
			// TODO: improve this implementation
			this.potentialReturn *= 2;
			console.log('currentLevel: ' + this.currentLevel);
			this.currentLevel += 1;
			this.setChanceOfSuccess(this.getChanceOfSuccess()*0.9);
			this.monthlyReturn = 10*Math.pow(this.currentLevel, 1.5);
		} else {
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