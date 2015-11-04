investmentViewItems = [];
function mkInvestmentPage(){
	var toReturn = '';
	var theList = theAvatar.getListOfInvestment();
	console.log(theList);
	
	$("#investmentPage").append('<div id="investmentViewerList"></div>');
	
	for(var ind=0; ind < theList.length; ind++){
		var investmentName = theList[ind].name;
		var anInvestmentViewItem = new InvestmentItemDisplay(theList[ind].id);
		investmentViewItems.push(anInvestmentViewItem);
		$("#investmentViewerList").append(anInvestmentViewItem.mkHTML());
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
	//$("#investmentViewerList").html(toReturn);
}
function rmInvestmentViewItem(investmentID){
	for(var ind=0; ind < investmentViewItems.length; ind++){
		if(investmentViewItems[ind].getInvestmentID() == investmentID){
			// remove from the UI
			$('#displayInvestment_'+investmentID).remove();
			
			// remove from investmentViewItems
			investmentViewItems.splice(ind,1);
			break;
		}
	}
}
