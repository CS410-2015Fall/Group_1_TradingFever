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
	
	// Object IO
	this.toString = function(){
		var theObject = {
			'name':name,
			'cash':cash,
			'investments':listOfInvestments
		}
		
		return JSON.stringify(theObject);
	}

	// create a new investment that is available for avatar to invest
	this.createInvestment = function(id){
		var investment = new Investment(id);
		investment.setInvestment();
		listOfInvestments.push(investment);
	}

	// invest in a selected investment
	this.makeInvestment = function(id){
		for(var i = 0; i < listOfInvestments.length; i++) {
			if (listOfInvestments[i].id == id) {
				var remaining = listOfInvestments[i].invest();
				if (remaining) {
					cash = remaining;
					window.setInterval(
						function() {
							listOfInvestments[i].track();
						}, 1000); // currently set to tick every 1 second
					return null;
				}
				else {
					console.log("you don't have enough cash");
				}
			}
		}
	}
}