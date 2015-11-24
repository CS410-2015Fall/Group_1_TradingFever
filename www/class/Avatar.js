function Avatar(name){
	this.id = null;
	this.name = name;
	this.cash = 0;
	this.listOfInvestments = [];
	this.rage = 0;
	
	this.setID = function(id){
		this.id = id;
	}
	this.getID = function(){
		return this.id;
	}

	this.setName = function(newName){
		this.name = newName;
	}
	this.getName = function(){
		return this.name;
	}
	
	// Local Cash
	this.getCashAmount = function(){
		return this.cash;
	}
	this.setCashAmount = function(newCashAmount){
		this.cash = newCashAmount;
	}

	// Remote Cash
	this.updateRemoteCash = function(){
		this.cash = getCash(this.id);
	}
	this.setRemoteCash = function() {
		setCash(this.id,this.cash);
	}
	
	this.setInvestmentList = function(newList){
		this.listOfInvestments = newList;
	}
	this.getInvestmentList = function(){
		return this.listOfInvestments;
	}
	this.getInvestmentInstanceByID = function(targetID){
		for(var ind=0; ind < this.listOfInvestments.length; ind++){
			if(this.listOfInvestments[ind].getInvestmentID() == targetID){
				return this.listOfInvestments[ind];
			}
		}
		throw('cannot find the investment with ID=' + targetID);
	}
	this.addInvestmentInstance = function(newInvestmentInstance){
		this.assignInvestmentIDIfNone(newInvestmentInstance);
		this.listOfInvestments.push(newInvestmentInstance);
	}
	this.upgradeInvestment = function(investmentInstance){
		// this method is for BOTH buying investment and upgrading investment
		// Treat not owned investment as level 0
		if(investmentInstance.upgradeable()){
			// check upgrade cost
			var cost = investmentInstance.upgradeCost();
			if(this.cash >= cost){
				// deduct cash
				this.cash = this.cash - cost;
				
				// assign id for newly added investment
				this.assignInvestmentIDIfNone(investmentInstance);
				
				// level up the investment
				investmentInstance.upgrade();
			} else {
				throw("You do not have enough cash");
			}
		} else {
			throw('The investment is not upgradeable');
		}
	}
	this.assignInvestmentIDIfNone = function(investmentInstance){
		// assign id for newly added investment
		if(investmentInstance.getInvestmentID() == -1){
			// find current highest investment ID and assign new ID
			var currentHighestID = -1;
			for(var ind=0; ind < this.listOfInvestments.length; ind++){
				if(this.listOfInvestments[ind].getInvestmentID() > currentHighestID){
					currentHighestID = ind;
				}
			}
			var assignedID = currentHighestID + 1;
			
			var currentTime = new Date();
			currentTime = currentTime.getTime();
			
			investmentInstance.initiateInvestment(currentTime,assignedID);
		}
	}
	this.removeInvestmentInstanceByID = function(targetID){
		for(var ind=0; ind < this.listOfInvestments.length; ind++){
			if(this.listOfInvestments[ind].getInvestmentID() == targetID){
				var removedInstance = this.listOfInvestments.splice(ind,1);
				return removedInstance;
			}
		}
		throw('cannot find the investment with ID=' + targetID);
	}
	this.visitInvestments = function(){
		for(var ind=0; ind < this.listOfInvestments.length; ind ++){
			var targetInvestmentInstance = this.listOfInvestments[ind];
			
			this.setCashAmount(this.getCashAmount() + targetInvestmentInstance.grabCollectableReward());
			
			// progress bar
			var lastTime = targetInvestmentInstance.getLastCashedTime();
			var duration = targetInvestmentInstance.getIncomeStatement().duration;
			var progress = 0;
			if(duration == -1){ //if depends or not defined
				progress = 0;
			} else {
				var currentTime = new Date();
				currentTime = currentTime.getTime();
				var timePassed = currentTime - lastTime;
				var percentagePassed = (timePassed % duration)/duration * 100;
				
				// progress percentage
				targetInvestmentInstance.viewHandler.progress.setPercentage(percentagePassed);
				
				// level
				targetInvestmentInstance.viewHandler.setLevel(targetInvestmentInstance.getCurrentLevel());
			}
		}
	}
	
	this.getNetWorth = function(){
		var currentTime = new Date();
		currentTime = currentTime.getTime();
		
		var acc = 0;
		for(var ind=0; ind < this.listOfInvestments.length; ind++){
			acc += this.listOfInvestments[ind].getCurrentWorth(currentTime);
		}
		acc += theStocks.getStocksNetLiquidation();
		acc += this.getCashAmount();
		
		return acc;
	}
	this.setRage = function(newRage){
		this.rage = newRage;
	}
	this.getRage = function(){
		return this.rage;
	}
}