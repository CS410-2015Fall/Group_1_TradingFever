function InvestmentItemDisplay(itemID){
	// itemID: String
	ID = itemID;
	
	this.mkHTML = function(){
		// this makes the display HTML on the investment menu list
		var toReturn = '';
		toReturn += '<div id="displayInvestment_'+ID+'" style="width:100%; border-style:solid">';
		
		toReturn += '<table style="width:100%"><tr>';
		toReturn += '<td style="width:20%">'; // picture
		
		toReturn += '</td>';
		
		toReturn += '<td>';
		toReturn += '<table style="width:100%">';
	
		// Investment title
		toReturn += '<tr style="width:100%">';
		toReturn += '<div id="displayInvestmentTitle_'+ID+'" style="background-color:blue"></div>';
		toReturn += '</tr>';
	
		// Investment detail
		toReturn += '<tr id="displayInvestmentDetail_'+ID+'" style="width:100%; background-color:#5555ff"></tr>';
	
		toReturn += '</table></td>';
		
		
		toReturn += '</tr></table>';
		toReturn += '</div>';
		
		return toReturn;
	}
	
	this.setFontSize = function(newFontSize){
		$('#displayInvestment_'+ID).css('font-size',newFontSize);
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