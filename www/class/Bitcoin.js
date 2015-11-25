Bitcoin.prototype = new Investment();
Bitcoin.prototype.constructor = Bitcoin;
function Bitcoin(){
	this.setInvestmentType("Bitcoin");
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
		return 250000*Math.pow(1.2, this.currentLevel);
	}
	this.upgrade = function(){
	this.rewardDuration = 10 * 1000;
	if (Math.random() < this.getChanceOfSuccess()){
		if (this.currentLevel == 0){
			swal({title: "To the Moon!", 
			text: "Investment Advisor Kato says: \n Finally, a curreny that will supplant the worthless US dollar!",  
      		imageUrl: "img/advisor.jpg",  
      		type: "success",
      		showCancelButton: true,   
      		confirmButtonColor: "#DD6B55",   
      		confirmButtonText: "Better buy some before it hits $10,000",   closeOnConfirm: false });
		}

		// TODO: improve this implementation
		this.potentialReturn *= 2;
		this.currentLevel += 1;
		this.setChanceOfSuccess(this.getChanceOfSuccess()*0.9);
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}else{
			this.monthlyReturn = 25000*Math.pow(1.2, this.currentLevel-1);
		}	
		}

		else if(Math.random() < this.getChanceOfSuccess() && this.getChanceOfSuccess() < 0.5){
			swal({title: "GT.MOX HACKED!", 
					text: "Investment Advisor Kato says: \nHow did the largest virtual currencies exchange get hacked?? Where's my money, Kark Marpeles??",  
					imageUrl: "img/advisor.jpg",  
					type: "error",
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "Heavy losses (lose all bitcoin)",   closeOnConfirm: false });
		this.currentLevel = 0;
		this.potentialReturn *= 2;
		this.setChanceOfSuccess(1);
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}
		else{
			this.monthlyReturn = 25000*Math.pow(1.2, this.currentLevel-1);
		}	
		}


		else{
		swal({title: "Crash!", 
					text: "Investment Advisor Kato says: \n I've bought at $..14/25/45/75/200/300/500/800/900... and I'll keep buying. last I checked - I still have the same amount of bitcoin. It's the dollar and the fiat currency price that is all over the place.",  
					imageUrl: "img/advisor.jpg",  
					type: "warning",
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "Fear of volatility is for the weak",   closeOnConfirm: false });
		this.potentialReturn /= 2;
		this.currentLevel -= 1;
		this.setChanceOfSuccess(1);
		this.monthlyReturn = 25000*Math.pow(this.currentLevel, 1.5);
	}
	}
	this.sellable = function(){
		return true;
	}
	this.needsClear = function(){
		return false;
	}
}