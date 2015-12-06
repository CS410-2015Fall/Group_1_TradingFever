function Avatar(name){
	this.id = -1;
	this.name = name;
	this.cash = 0;
	this.listOfInvestments = [];
	this.rage = 0;
	this.facebookID = 0;
	
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
	this.setRemoteNetWorth = function() {
		setNetWorth(this.id,this.getNetWorth());
	}

	this.setFacebookID = function(facebookID){
		this.facebookID = facebookID;
	}
	this.getFacebookID = function(){
		return this.facebookID;
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
			console.log('cost: ' + cost);
			console.log('avatarCash: ' + this.cash);
			if(this.cash >= cost){
				// deduct cash
				this.cash = this.cash - cost;
				
				// assign id for newly added investment
				this.assignInvestmentIDIfNone(investmentInstance);
				
				// level up the investment
				if(investmentInstance.currentLevel == 0){
					
					var currentTime = new Date();
					currentTime = currentTime.getTime();
					investmentInstance.lastCashedTime = currentTime;
					console.log('checkpoint A');
				}
				investmentInstance.upgrade();
				
				
				
				console.log('avatarCash: ' + this.cash);
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
			
			var collectedReward = targetInvestmentInstance.grabCollectableReward();
			this.setCashAmount(this.getCashAmount() + collectedReward);
			if(collectedReward > 0){
				console.log('got a reward of ' + collectedReward + ' from ' + targetInvestmentInstance.investmentTitle);
			}
			
			// progress bar
			var lastTime = targetInvestmentInstance.getLastCashedTime();
			var duration = targetInvestmentInstance.getIncomeStatement().duration;
			var progress = 0;
			
			if(this.duration <= -1 || targetInvestmentInstance.getCurrentLevel() < 1){ //if depends or not defined
				progress = 0;
				targetInvestmentInstance.viewHandler.progress.setPercentage(0);
				targetInvestmentInstance.viewHandler.setReturnAmountText(0);
				
			} else {
				var currentTime = new Date();
				currentTime = currentTime.getTime();
				var timePassed = currentTime - lastTime;
				var percentagePassed = (timePassed % duration)/duration * 100;
				
				// progress percentage
				targetInvestmentInstance.viewHandler.progress.setPercentage(percentagePassed);
				
				// return amount
				targetInvestmentInstance.viewHandler.setReturnAmountText(Math.floor(targetInvestmentInstance.getIncomeStatement().amount));
				
				if(theAvatar.getCashAmount() < targetInvestmentInstance.upgradeCost()){
					targetInvestmentInstance.viewHandler.upgradeButton.disable();
				} else {
					targetInvestmentInstance.viewHandler.upgradeButton.enable();
				}
			}
			// level
			targetInvestmentInstance.viewHandler.setLevel(targetInvestmentInstance.getCurrentLevel());
			
			// box colour
			if(ind%2){
				targetInvestmentInstance.viewHandler.setBackgroundColor('rgba(250,250,200,0.6)');
			} else {
				targetInvestmentInstance.viewHandler.setBackgroundColor('rgba(200,250,250,0.6)');
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
	
	this.toJSON = function(){
		var listOfInvestmentJSON = [];
		for(var ind=0; ind < this.listOfInvestments.length; ind++){
			listOfInvestmentJSON.push(this.listOfInvestments[ind].toJSON());
		}
	
		var toReturn = {
			'id':this.id,
			'name':this.name,
			'cash':this.cash,
			'investments':listOfInvestmentJSON,
			'rage':this.rage
		}
		return toReturn;
	}
	this.loadFromJSONString = function(theJSONString){
		var avatarJSON= jQuery.parseJSON( theJSONString );
		this.id = avatarJSON.id;
		this.name = avatarJSON.name;
		this.cash = avatarJSON.cash;
		this.listOfInvestments = [];
		this.rage = avatarJSON.rage;
		
		var investmentsToAdd = avatarJSON.investments;
		for(var ind=0; ind < investmentsToAdd.length; ind++){
			var investmentAdding = eval('new ' + investmentsToAdd[ind].investmentType + '();');
			investmentAdding.loadFromJSON(investmentsToAdd[ind]);
			
			this.listOfInvestments.push(investmentAdding);
		}
	}
}