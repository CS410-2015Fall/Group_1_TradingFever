LotteryTicket.prototype = new Investment();
LotteryTicket.prototype.constructor = LotteryTicket;
function LotteryTicket(){
	this.setInvestmentType("LotteryTicket");
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
			'amount':0,
			'duration':this.rewardDuration,
			'cashOutMethod':'get cash if successful'
		}
		return toReturn;
	}
	this.upgradeable = function(){
		return true; // TODO: should be false if reached max level
	}
	this.upgradeCost = function(){
		return 100*Math.pow(1.2, this.currentLevel);
	}
	this.upgrade = function(){
		this.rewardDuration = 3 * 1000;
		if (Math.random() < this.getChanceOfSuccess()){
		if (this.currentLevel == 0){
			swal({title: "You gotta be in it to win it.", 
			text: "Investment Advisor Kato says: \nThe more tickets you buy, the more likely you're gonna win, right?",  
      		imageUrl: "img/advisor.jpg",  
      		type: "success",
      		showCancelButton: true,   
      		confirmButtonColor: "#DD6B55",   
      		confirmButtonText: "Say no more!",   closeOnConfirm: false });
		}

		this.potentialReturn *= 2;
		this.currentLevel += 1;
		this.setChanceOfSuccess(this.getChanceOfSuccess()*0.9);
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}else{
			this.monthlyReturn = 10*Math.pow(1.2, this.currentLevel-1);
		}	
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
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}else{
			this.monthlyReturn = 10*Math.pow(1.2, this.currentLevel-1);
		}	
	}


	}
	this.sellable = function(){
		return true;
	}
	
	this.needsClear = function(){
		return false;
	}
}