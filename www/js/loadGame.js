function loadGame(){
	theAvatar = new Avatar("(Avatar Name)");
	theAvatar.setCashAmount(5000000);
	if(localStorage.getItem("avatar") === null){
		// if first time loaded
		$('#newAvatarModal').modal();
		
	} else {
		//theAvatar.loadFromJSONString(localStorage.getItem("avatar"));
	}
}
function createAvatar(){
	$('#newAvatarModal').modal('hide');
	theAvatar.setName($('#txtNewAvatarName').val());
	
	//localStorage.setItem('avatar',theAvatar.toJSONString());
}