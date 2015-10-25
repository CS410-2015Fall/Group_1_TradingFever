function StartUp(startupID){

	this.prototype = new Investment();

	this.id = startupID;
	this.type = "";
	this.name = "";
	this.description = "";
	this.cost = 0;
	this.profitPercentage = 0;
	this.duration = 0;

	this.startTime = 0;

	this.prototype.invest = function(){
		return Investment.prototype.invest.call(this);		
	}
}