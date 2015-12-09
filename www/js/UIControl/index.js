function refreshStatusBar(avatarInstance){
	avatarInstance.visitInvestments();
	$('#avatarName_display').html(avatarInstance.getName());
	$('#avatarCash_display').html('$ ' + avatarInstance.getCashAmount().toFixed(2));
	
	//modal
	$('#avatarName_modal').html(avatarInstance.getName());
	$('#avatarNetworth_modal').html(avatarInstance.getNetWorth().toFixed(2));
	
	
}
function initialLoad(avatarInstance){
	// load avatar image
	if(!localStorage.getItem('profilePicture')) { //if no image saved
		console.log('there had been no picture saved');
		localStorage.setItem("profilePicture", 'img/profile_empty.jpg');
	} else {
		console.log('there had been picture saved');
	}
	
	var imageData = localStorage.getItem('profilePicture');
	document.getElementById('avatarPicture').src = imageData;
	//document.getElementById('avatarPicture_modal').src = imageData;
}
function adjustFrameSize(){
	var h = $('#statusBar').height() + $('#gameTabs').height();
	var windowHeight = $(window).height();
	$('#gameHome').height(windowHeight-h-5);
	$('#stockPage').height(windowHeight-h-5);
	$('#investmentPage').height(windowHeight-h-5);
	$('#leaderBoardPage').height(windowHeight-h-5);
}