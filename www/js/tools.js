function moderateDisplayNumber(theNumber){
	var toReturn = '';
	if(theNumber > 1000000){
		var highestDigit = Math.floor(Math.log10(theNumber));
		var stockedDigits = highestDigit - (highestDigit % 3);
		console.log(highestDigit);
		console.log(stockedDigits);
		
		var digitsToShow = Math.floor(theNumber/Math.pow(10,stockedDigits) * 100)/100;
		var powerToShow = ' * 10' + stockedDigits.toString().sup();
		
		toReturn = digitsToShow.toString() + powerToShow;
	} else {
		toReturn = Math.floor(theNumber).toString();
	}
	return toReturn;
}