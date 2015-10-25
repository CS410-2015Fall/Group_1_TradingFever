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
}