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
		this.monthlyReturn = newMonthlyReturn;
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
			'amount':this.monthlyReturn,
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
			if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}else{
			this.monthlyReturn = 1000*Math.pow(1.2, this.currentLevel-1);
		}	
		} 

		else if(Math.random() < this.getChanceOfSuccess() && this.getChanceOfSuccess() < 0.7){
			
			swal({title: "BUSTED!", 
					text: "Investment Advisor Kato says: \nI'm sure we can talk our way out of this??",  
					imageUrl: "img/advisor.jpg",  
					type: "error",
					showCancelButton: true,   
					confirmButtonColor: "#DD6B55",   
					confirmButtonText: "Diplomatic negotiation (lose 1 level)",   closeOnConfirm: false });
					
					var policeSiren_Sound= new Audio('sound/policeSiren.wav');
					policeSiren_Sound.play();
		this.currentLevel -= 1;
		this.potentialReturn *= 2;
		this.setChanceOfSuccess(1);
		if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}
		else{
			this.monthlyReturn = 1000*Math.pow(1.2, this.currentLevel-1);
		}	
		}


		else {
			swal({title: "Conservative Prime Minister", 
				text: "Investment Advisor Kato says: \nThey think legislation will put our medicines out of business??",  
				imageUrl: "img/advisor.jpg",  
				type: "warning",
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Can't fight the policymakers",   closeOnConfirm: false });
			this.potentialReturn /= 2;
			this.currentLevel -= 1;
			this.setChanceOfSuccess(1);
			if (this.currentLevel < 1){
			this.monthlyReturn = 0;
		}else{
			this.monthlyReturn = 1000*Math.pow(1.2, this.currentLevel-1);
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