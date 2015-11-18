function Investment(){
	this.investmentID = -1;
	this.investmentType = '';
	this.investmentTitle = '';
	this.investmentDescription = '';
	this.currentLevel = 0;
	this.lastCashedTime = 0;
	
	this.setInvestmentID = function(newID){
		this.investmentID = newID;
	}
	this.getInvestmentID = function(){
		return this.investmentID;
	}
	
	this.setInvestmentType = function(newTypeName){
		this.investmentType = newTypeName;
	}
	this.getInvestmentType = function(){
		return this.investmentType;
	}
	
	this.setInvestmentTitle = function(newTitle){
		this.investmentTitle = newTitle;
	}
	this.getInvestmentTitle = function(){
		return this.investmentTitle;
	}
	
	this.setDescription = function(newDesc){
		this.investmentDescription = newDesc;
	}
	this.getDescription = function(){
		return this.investmentDescription;
	}
	
	this.setCurrentLevel = function(newLevel){
		this.currentLevel = newLevel;
	}
	this.getCurrentLevel = function(){
		return this.currentLevel;
	}
	this.setLastCashedTime = function(newTime){
		this.lastCashedTime = newTime;
	}
	this.getLastCashedTime = function(){
		return this.lastCashedTime;
	}
}
Investment.prototype.initiateInvestment = function(currentTime, assignedID){
	throw('need to override this');
}
Investment.prototype.getCurrentWorth = function(currentTime){
	throw('need to override this');
}
Investment.prototype.setCurrentWorth = function(newWorth){
	throw('need to override this');
}
Investment.prototype.getIncomeStatement = function(){
	// returns a string on how the user gain money from this investment.
	// e.g.: "$10/s", "50% chance to earn $5000 by 5PM"
	throw('need to override this');
	// this method returns a JSON object of fields: amount, duration, cashOutMethod
	// amount: number: the amount of cash
	// duration: how much time for that amount
	// cashOutMethod: "continuous", "discrete", or "get cash only if successful"
}
Investment.prototype.upgradeable = function(){
	throw('need to override this');
}
Investment.prototype.upgradeCost = function(){
	throw('need to override this');
}
Investment.prototype.upgrade = function(){
	throw('need to override this');
	// note: it's avatar's responsibility to deduct its cash
}
Investment.prototype.sellable = function(){
	throw('need to override this');
	// note: implement sell in avatar class
}
Investment.prototype.grabCollectableReward = function(){
	throw('need to override this');
}
Investment.prototype.timeToNextReward = function(){
	throw('need to override this');
}
Investment.prototype.needsClear = function(){
	// return true if the investment is supposed to be cleared automatically
	// it's useful for lottery ticket for example
	// avatar should collect reward and/or sell this investment
	throw('need to override this');
}
/*
Investment.prototype.toString(){
	throw('need to override this');
}
Investment.prototype.loadAndCreateInstance(){
	throw('need to override this');
}
*/
