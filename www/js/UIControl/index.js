function refreshStatusBar(avatarInstance){
	$('#avatarName_display').html(avatarInstance.getName());
	$('#avatarRage_display').html(avatarInstance.getRage());
	//$('#avatarNetWorth_display').html(avatarInstance.getNetWorth());
	$('#avatarCash_display').html(avatarInstance.getCashAmount());
}