function InvestmentItemDisplay(itemID){
	// itemID: String
	var ID = itemID;
	this.getInvestmentID = function(){
		return ID;
	}
	this.setInvestmentID = function(newID){
		ID = newID;
	}
	
	this.mkHTML = function(){
		// this makes the display HTML on the investment menu list
	
		var toReturn = '';
		toReturn += '<div id="displayInvestment_'+ID+'" style="width:100%; border-style:solid">';
		
		toReturn += '<table style="width:100%"><tr>';
		toReturn += '<td id="displayInvestmentImageBlock_'+ID+'" style="width:2em;">'; // picture
		toReturn += '<img id="displayInvestmentImage_'+ID+'" src="img/dell.png" style="width:2em"/>';
		toReturn += '</td>';
		
		toReturn += '<td width="100%">';
		toReturn += '<table width="100%;">';
		// Investment title
		toReturn += '<tr style="width:100%"><td>';
		toReturn += '<div id="displayInvestmentTitle_'+ID+'" style="background-color:blue"></div>';
		toReturn += '</td></tr>';
	
		// Investment detail
		toReturn += '<tr style="width:100%; background-color:#5555ff"><td id="displayInvestmentDetail_'+ID+'" style="width:100%; background-color:#5555ff"></td></tr>';
	
		toReturn += '</table>';
		
		toReturn += '<td>';
		toReturn += '<button onclick="handle_makeInvestmentButton('+ID+')">Invest</button>';
		toReturn += '</td>';
		
		toReturn += '</tr>';
		
		toReturn += '</table>';
		toReturn += '</div>';
		
		return toReturn;
	}
	
	this.setFontSize = function(newFontSize){
		$('#displayInvestment_'+ID).css('font-size',newFontSize);
	}
	this.image = {
		'setImage':function(imgURL){
			$('#displayInvestmentImage_'+ID).attr("src",imgURL);
			console.log(imgURL);
		},
		'css':function(propertyName,propertyValue){
			$('#displayInvestmentImage_'+ID).css(propertyName,propertyValue);
		},
		'setBackgroundColor':function(colorCode){
			$('#displayInvestmentImageBlock_'+ID).css('background-color',colorCode);
		}
	}
	this.title = {
		'setTitle':function(newTitle){
			$('#displayInvestmentTitle_'+ID).html('<b>' + newTitle + '</b>');
		},
		'css':function(propertyName,propertyValue){
			$('#displayInvestmentTitle_'+ID).css(propertyName,propertyValue);
		}
	}
	this.detail = {
		'setHTML':function(detailHTML){
			$('#displayInvestmentDetail_'+ID).html(detailHTML);
		},
		'css':function(propertyName,propertyValue){
			$('#displayInvestmentDetail_'+ID).css(propertyName,propertyValue);
		}
	}
}

function handle_makeInvestmentButton(investmentID){
	console.log('making investment: ' + investmentID);
	
	// get investment instance
	var investmentList = theAvatar.getListOfInvestment();
	for(var ind=0; ind < investmentList.length; ind++){
		if (investmentList[ind].id == investmentID){
			//
			console.log('almost there!');
		}
	}
}