function mkInvestmentPage(){
	var toReturn = '';
	
	for(var ind=0; ind < listOfPossibleInvestments.investments.length; ind++){
		var investmentName = listOfPossibleInvestments.investments[ind].name;
		var anInvestmentViewItem = new InvestmentItemDisplay(listOfPossibleInvestments.investments[ind].id);
		$("#investmentPage").append(anInvestmentViewItem.mkHTML());
		anInvestmentViewItem.title.setTitle(investmentName);
		anInvestmentViewItem.detail.setHTML(listOfPossibleInvestments.investments[ind].description);
				
		// set colour
		console.log(ind%2);
		if(ind%2 == 0){
			anInvestmentViewItem.title.css("background-color","#1111ff");
			anInvestmentViewItem.detail.css("background-color","#9999ff");
		} else {
			anInvestmentViewItem.title.css("background-color","#00ff00");
			anInvestmentViewItem.detail.css("background-color","#99ff99");
		}
	}
	
	//$("#investmentPage").html(toReturn);
}