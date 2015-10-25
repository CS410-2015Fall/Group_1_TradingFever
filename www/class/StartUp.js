function StartUp(startupID){
	// name (String): name of the startup
	this.id = startupID;
	
	this.name = name;
	this.investment = 50; // the amount of money that should be spent to invest
	this.returnRate = 0; // the rate of return if startup is successful in the end
	this.successRate = 0; // [0 1]	
	this.duration = 0; // time needed to get return (if successful)
	
	this.prototype = new Investment();

	this.prototype.invest = function(){
		return Investment.prototype.invest.call(this);		
	}
}