StartUp.prototype = new Investment();
StartUp.prototype.constructor=StartUp;
function StartUp(name){
	// name (String): name of the startup
	this.name = name;
	
	this.investment = 50; // the amount of money that should be spent to invest
	this.returnRate = 0; // the rate of return if startup is successful in the end
	this.successRate = 0; // [0 1]
	
	this.duration = 0; // time needed to get return (if successful)
	
	this.prototype.invest = function(){
		var avatarCash = theAvatar.cash;
		
		if(avatarCash >= this.investment){
			
			// deduct the money from theAvatar.cash
			
			// add this investment in to theAvatar.listOfInvestment
		} else {
			// throw error/excetion
			console.log("Not enough cash");
		}
	}
}