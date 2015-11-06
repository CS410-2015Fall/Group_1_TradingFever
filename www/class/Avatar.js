function Avatar(name){
	var name = name;
	var rage = null;
	var cash = null;
	var listOfInvestments = [];
	
	// Name
	this.getName = function(){
		return name;
	}
	this.setName = function(newName){
		name = newName;
	}
	
	// Rage
	this.getRage = function(){
		return rage;
	}
	this.setRage = function(newRageValue){
		rage = newRageValue;
	}
	
	// Cash
	this.getCashAmount = function(){
		return cash;
	}
	this.setCashAmount = function(newCashAmount){
		cash = newCashAmount;
	}
	
	// Investment
	this.getListOfInvestment = function(){
		return listOfInvestments;
	}
	this.setListOfInvestment = function(newListOfInvestment){
		listOfInvestments = newListOfInvestment;
	}
	this.addInvestment = function(investmentInstance){
		listOfInvestments.push(investmentInstance);
	}
	
	// Object IO
	this.toString = function(){
		var theObject = {
			'name':name,
			'cash':cash,
			'investments':listOfInvestments
		}
		
		return JSON.stringify(theObject);
	}
	this.loadFromString = function(theJSONString){
		var theObject = JSON.parse(theJSONString);
		name = theObject.name;
		cash = theObject.cash;
		listOfInvestments =  theObject.investments;
	}

	// create a new startup investment that is available for avatar to invest
	this.createStartUp = function(id){
		var investment = new StartUp(id);
		investment.prototype.setInvestment();
		listOfInvestments.push(investment);
	}

	// create a new real estate investment that is available for avatar to invest
	this.createRealEstate = function(id){
		var investment = new RealEstate(id);
		investment.prototype.setInvestment();
		listOfInvestments.push(investment);
	}

	// create a new scam (random) investment that is available for avatar to invest
	this.createScam = function(id){
		var investment = new Scam(id);
		investment.prototype.setInvestment();
		listOfInvestments.push(investment);
	}

	// make an one-time investment
	this.makeTemporaryInvestment = function(id){
		for(var i = 0; i < listOfInvestments.length; i++) {
			if (listOfInvestments[i].prototype.id == id) {
				var remaining = listOfInvestments[i].prototype.invest();
				if (remaining) {
					cash = remaining;
					var tempInvestment = window.setInterval(
						function() {
							if (listOfInvestments[i].prototype.track()){
								listOfInvestments[i].update();
								clearInterval(tempInvestment);
							}
							console.log(cash);
						}, 1000);
					return null;
				}
				else {
					console.log("Oh-no! You don't have enough cash to make this investment.");
				}
			}
		}
	}

	// make a continuous investment
	this.makeContinuousInvestment = function(id){
		for(var i = 0; i < listOfInvestments.length; i++) {
			if (listOfInvestments[i].prototype.id == id) {
				var remaining = listOfInvestments[i].prototype.invest();
				if (remaining) {
					cash = remaining;
					window.setInterval(
						function() {
							if (listOfInvestments[i].prototype.track()){
								listOfInvestments[i].prototype.update();
							}
							console.log(cash);
						}, 200); 
					return null;
				}
				else {
					console.log("Oh-no! You don't have enough cash to make this investment.");
				}
			}
		}
	}

	// upgrade a continuous investment
	this.upgradeRealEstate = function(id){
		for(var i = 0; i < listOfInvestments.length; i++) {
			if (listOfInvestments[i].prototype.id == id) {
				var remaining = listOfInvestments[i].upgradeRealEstate();
				if (remaining) {
					cash = remaining;
				}
				else {
					console.log("Oh-no! You don't have enough cash to upgrade this investment.");
				}
			}
		}
	}
}