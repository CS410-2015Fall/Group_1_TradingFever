investmentViewItems = [];
function mkInvestmentPage(){
	var toReturn = '';
	var theList = theAvatar.getListOfInvestment();
	console.log(theList);
	
	for(var ind=0; ind < theList.length; ind++){
		var investmentName = theList[ind].name;
		var anInvestmentViewItem = new InvestmentItemDisplay(theList[ind].id);
		investmentViewItems.push(anInvestmentViewItem);
		$("#investmentPage").append(anInvestmentViewItem.mkHTML());
		anInvestmentViewItem.title.setTitle(investmentName);
		anInvestmentViewItem.detail.setHTML(theList[ind].description);
				
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
	console.log(investmentViewItems);
	//$("#investmentPage").html(toReturn);
}