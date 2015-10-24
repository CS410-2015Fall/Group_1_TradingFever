function Investment(name, type){
	// name (String): name of the investment
	// type (String): type of investment.
	//		accepted type strings:
	//			"Startup"
	
	this.name = name;
	this.type = type;
	
	this.description = "";
	this.prototype = {};
	this.prototype.setDescription = function(newDescription){
		this.description = newDescription;
	}
	this.prototype.getDescription = function(){
		return this.description;
	}
	
	this.detailInfo = {};
	
	this.invest = function(){
		throw new Error("Investment class is an abstract class, so do not call this method");
	}
}