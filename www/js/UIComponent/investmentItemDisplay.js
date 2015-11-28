function InvestmentItemDisplay(itemID){
	// itemID: String
	var ID = itemID;
	var theInstance = theAvatar.getInvestmentInstanceByID(itemID);
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

		toReturn += '<div id="displayInvestment_'+ID+'" style="width:100%;">';
		
		toReturn += '<table style="width:100%;"><tr>';
		toReturn += '<td id="displayInvestmentImageBlock_'+ID+'" style="width:2em;">'; // picture
		toReturn += '<img id="displayInvestmentImage_'+ID+'" src="img/noImg.png" style="width:4em; border-style:solid;"/>';
		toReturn += '<div id="displayInvestmentLevel_'+ID+'" width="100%" align="center" style="background-color:rgba(100,100,100,0.5); color: white; border-radius:0.5em;">(level)</div>';
		toReturn += '</td>';
		
		toReturn += '<td width="100%">';
		toReturn += '<table width="100%;">';
		
		toReturn += '<td>';
		
		toReturn += '\
			<table width="100%">\
				<tr width="100%"><td width="100%"><div width="100%" id="displayInvestmentTitle_'+ID+'"></div></td><td><button class="btn btn-info" style="width:3em; height:3em; font-size:0.5em;" onclick="handle_getInvestmentDetailButton('+ID+')">?</button></td></tr>\
				<tr width="100%"><td width="100%">\
					<div style="width:100%; height:1.2em;" class="progress">\
						<div id="progressBar_'+ID+'" class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:100%; position:relative;">\
						<div style="font-size:2vmin; position:relative; width:25em; text-align:center;"><span style="font-size:1.8em; color:black;">$</span><span style="font-size:1.5em; color:black; top:-2em;" id="returnPerRound_'+ID+'">0.00</span></div>\
							<span id="progress_'+ID+'" style="font-size:1.2em;"></span>\
						</div>\
					</div>\
				</td></tr>\
				<tr><td><button style="width:15em; font-size:0.5em;" id="upgradeButton_'+ID+'" onclick="handle_makeInvestmentButton('+ID+')" class="btn btn-warning">Upgrade for $'+moderateDisplayNumber(theInstance.upgradeCost())+'</button></td></tr>\
			</table>';
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
		},
		'css':function(propertyName,propertyValue){
			$('#displayInvestmentImage_'+ID).css(propertyName,propertyValue);
		},
		'setBackgroundColor':function(colorCode){
			$('#displayInvestmentImageBlock_'+ID).css('background-color',colorCode);
		}
	};
	this.setBackgroundColor = function(newBackgroundColor){
		$('#displayInvestment_'+ID).css('background-color',newBackgroundColor);
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
	this.progress = {
		'setPercentage':function(newPercentage){
			$('#progressBar_'+ID).css('width',' ' + newPercentage + '%');
		}
	}
	this.setLevel = function(newLevel){
		$('#displayInvestmentLevel_'+ID).html(newLevel);
	}
	this.setReturnAmountText = function(returnAmount){
		$('#returnPerRound_'+ID).html(returnAmount);
	}
	this.upgradeButton = {
		'enable':function(){
			$('#upgradeButton_'+ID).removeClass('disabled');
			$('#upgradeButton_'+ID).addClass('active');
		},
		'disable':function(){
			$('#upgradeButton_'+ID).removeClass('active');
			$('#upgradeButton_'+ID).addClass('disabled');
		}
	};
}

function handle_makeInvestmentButton(investmentID){
	var theInstance = theAvatar.getInvestmentInstanceByID(investmentID);
	
	theAvatar.upgradeInvestment(theInstance);
	console.log(theInstance.upgradeCost());
	console.log(moderateDisplayNumber(theInstance.upgradeCost()));
	$('#upgradeButton_'+investmentID).html('Upgrade for $'+moderateDisplayNumber(theInstance.upgradeCost()));
	// update the view
	
}
function handle_getInvestmentDetailButton(investmentID){
	var theInstance = theAvatar.getInvestmentInstanceByID(investmentID);
	
	$('#investmentInfo_name').html(theInstance.getInvestmentTitle());
	$('#investmentPicture_modal').attr('src',theInstance.getImgURL());
	$('#investmentDescription_modal').html(theInstance.getDescription());
	$('#investmentInfoModal').modal({
		backdrop: 'static',
		keyboard: false
	});
}