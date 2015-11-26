investmentViewItems = [];
function mkInvestmentPage(){
	var toReturn = '';
	var theList = theAvatar.getInvestmentList();
	$("#investmentPage").append('<div id="investmentViewerList"></div>');
	
	for(var ind=0; ind < theList.length; ind++){
		var investmentName = theList[ind].getInvestmentTitle();
		var anInvestmentViewItem = new InvestmentItemDisplay(theList[ind].getInvestmentID());
		investmentViewItems.push(anInvestmentViewItem);
		$("#investmentViewerList").append(anInvestmentViewItem.mkHTML());
		anInvestmentViewItem.title.setTitle(investmentName);
		theList[ind].viewHandler = anInvestmentViewItem;
		
		anInvestmentViewItem.detail.setHTML(theList[ind].getDescription());
		anInvestmentViewItem.image.setImage(theList[ind].getImgURL());
	}
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
