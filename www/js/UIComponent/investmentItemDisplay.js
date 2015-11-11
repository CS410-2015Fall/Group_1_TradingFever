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
		toReturn += '<link rel="stylesheet" href="css/index.css">';
		//toReturn += '<link rel="stylesheet" href="externalLibrary/jquerymobile/jquery.mobile-1.4.5.css">';
		//toReturn += '<script src="externalLibrary/jquerymobile/jquery.mobile-1.4.5.js"></script>';

		toReturn += '<div id="displayInvestment_'+ID+'" style="width:100%; border-style:solid">';
		
		toReturn += '<table style="width:100%"><tr>';
		toReturn += '<td id="displayInvestmentImageBlock_'+ID+'" style="width:2em;">'; // picture
		toReturn += '<img id="displayInvestmentImage_'+ID+'" src="img/dell.png" style="width:2em"/>';
		toReturn += '</td>';
		
		toReturn += '<td width="100%">';
		toReturn += '<table width="100%;">';
		
		toReturn += '<td>';

		toReturn += ' \
		<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-last-child ui-btn-up-c"> \
			<div class="ui-btn-inner ui-li"> \
				<div class="ui-btn-text"> \
					<a href="index.html" class="ui-link-inherit"> \
						<h2 class="ui-li-heading" id="displayInvestmentTitle_'+ID+'">Avery Walker</h2> \
						<p class="ui-li-desc" id="displayInvestmentDetail_'+ID+'"></p> \
					</a> \
				</div> \
				<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span> \
			</div> \
		</li>';

		toReturn += '<button onclick="handle_makeInvestmentButton('+ID+')">Invest $2000</button>';
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
	
	theAvatar.makeContinuousInvestment(investmentID);
}