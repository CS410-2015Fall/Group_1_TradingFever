function onPhotoDataSuccess(imageData) {
				
	var smallImage = document.getElementById('avatarPicture_modal');
	smallImage.src = "data:image/jpeg;base64," + imageData;
	
	window.localStorage.setItem("profilePicture", "data:image/jpeg;base64," + imageData);
	document.getElementById('avatarPicture').src = window.localStorage.getItem('profilePicture');
}
function onPhotoURISuccess(imageURI) {
	var largeImage = document.getElementById('largeImage');
	largeImage.style.display = 'block';
	largeImage.src = imageURI;
}
function capturePhoto() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}
function capturePhotoEdit() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
	destinationType: destinationType.DATA_URL });
}
function getPhoto(source) {
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}
function onFail(message) {
	console.log('Failed because: ' + message);
}