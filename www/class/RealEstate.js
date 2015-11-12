function RealEstate(realEstateID){

	this.prototype = new Investment(realEstateID);
	this.prototype.setRealEstate = RealEstate;
	this.prototype.upgradeable = true;
	
}

RealEstate.prototype.upgradeRealEstate = function(){
	var cash = theAvatar.getCashAmount();

	var newCost = this.prototype.level * 1000 + this.prototype.cost; 

	if (cash >= newCost) {
		cash -= newCost;
	} 
	else return null;

	this.prototype.profitPercentage += 0.01;

	var date = new Date();
	var timeNow = date.getTime();
	this.prototype.startTime = timeNow;
	
	this.prototype.level ++;

	console.log("Your condo is now at level " + this.prototype.level + "! You are making money at " + this.prototype.profitPercentage + "!");

	return cash;
}