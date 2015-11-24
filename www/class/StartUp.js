StartUp.prototype = new Investment();
StartUp.prototype.constructor = StartUp;
function StartUp(){
	this.setInvestmentType("StartUp");
	
	this.chanceOfSuccess = 0;
	this.currentWorth = 0;
	this.potentialReturn = 0; // money return if successful
	
	this.setChanceOfSuccess = function(percentage){
		this.chanceOfSuccess = percentage;
		// note: this function is called by upgrade
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
		return 100; //TODO: Change this
	}
	this.upgrade = function(){
		if (this.currentLevel == 1){
			swal({title: "It cures cancer, man!", 
			text: "Investment Advisor Kato says: \nNeed someone to help with quality assurance?",  
      		imageUrl: "img/advisor.jpg",  
      		type: "success",
      		showCancelButton: true,   
      		confirmButtonColor: "#DD6B55",   
      		confirmButtonText: "No, but I could use lobbyists",   closeOnConfirm: false });
		}

		// TODO: improve this implementation
		this.potentialReturn *= 2;
		this.currentLevel += 1;
		this.setChanceOfSuccess(0.5);
	}
	this.sellable = function(){
		return true;
	}
	this.grabCollectableReward = function(){
		return 0;
	}
	this.needsClear = function(){
		return false;
	}
}