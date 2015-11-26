function loadGame(){
	localStorage.clear();
	
	theAvatar = new Avatar("(Avatar Name)");
	theAvatar.setCashAmount(5000000);
	if(localStorage.getItem("avatar") === null){
		// if first time loaded
		$('#newAvatarModal').modal();
		
	} else {
		theAvatar.loadFromJSONString(localStorage.getItem("avatar"));
		console.log(theAvatar);
		mkInvestmentPage();
	}
}
function createAvatar(){
	$('#newAvatarModal').modal('hide');
	theAvatar.setName($('#txtNewAvatarName').val());
	
	// initial investments
	var aLotteryTicket = new LotteryTicket();
	aLotteryTicket.setInvestmentTitle('Lotto 649');
	aLotteryTicket.setDescription('A ticket to prosperity');
	theAvatar.addInvestmentInstance(aLotteryTicket);
	aLotteryTicket.setImgURL('img/lotto.jpg');
		
	var aLoanShark = new LoanSharks();
	aLoanShark.setInvestmentTitle('Loan Sharks');
	aLoanShark.setDescription("A new acquaintance offers to help invest your extra cash");
	theAvatar.addInvestmentInstance(aLoanShark);
	aLoanShark.setImgURL('img/loanshark.jpg');
			
	var aNigerianPrince = new NigerianPrince();
	aNigerianPrince.setInvestmentTitle('Nigerian Email');
	aNigerianPrince.setDescription("Dear Sir: I have been requested by the Nigerian National Petroleum Company to contact you for assistance in resolving a matter.\n Yours truly, \n" + "\nPrince Alyusi Islassis");
	theAvatar.addInvestmentInstance(aNigerianPrince);
	aNigerianPrince.setImgURL('img/nigerian.png');
			
			
	var aStartUp = new StartUp();
	aStartUp.setInvestmentTitle('Daniel Inc.');
	aStartUp.setDescription("Your friend's startup is certainly the next big thing");
	theAvatar.addInvestmentInstance(aStartUp);
	aStartUp.setImgURL('img/daniel.jpg');
			
			
	var aRealEstate = new RealEstate();
	aRealEstate.setInvestmentTitle('Prime Real Estate');
	aRealEstate.setDescription('A pricey piece of property');
	theAvatar.addInvestmentInstance(aRealEstate);
	aRealEstate.setImgURL('img/realestate.jpg');
			
			
	var aBitcoin = new Bitcoin();
	aBitcoin.setInvestmentTitle('Virtual Currencies');
	aBitcoin.setDescription("Clearly, the end of fiat currency is here.");
	theAvatar.addInvestmentInstance(aBitcoin);
	aBitcoin.setImgURL('img/bitcoin.jpg');

	var aHedgeFund = new HedgeFund();
	aHedgeFund.setInvestmentTitle('Investment Fund');
	aHedgeFund.setDescription("Your investment advisor tells you to invest with a secure investment fund run by a jolly old man. He's been on Wall Street for decades-what could go wrong?");
	theAvatar.addInvestmentInstance(aHedgeFund);
	aHedgeFund.setImgURL('img/scheme.jpg');
	mkInvestmentPage();
	
	localStorage.setItem('avatar',JSON.stringify(theAvatar.toJSON()));
}