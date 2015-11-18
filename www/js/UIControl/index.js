function refreshStatusBar(avatarInstance){
	avatarInstance.visitInvestments();
	$('#avatarName_display').html(avatarInstance.getName());
	$('#avatarRage_display').html(avatarInstance.getRage());
	$('#avatarNetWorth_display').html(avatarInstance.getNetWorth().toFixed(2));
	$('#avatarCash_display').html(avatarInstance.getCashAmount().toFixed(2));
}