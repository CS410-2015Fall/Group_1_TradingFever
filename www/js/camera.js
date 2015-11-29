function onPhotoDataSuccess(imageData) {
				
	var smallImage = document.getElementById('avatarPicture_modal');
	smallImage.src = "data:image/jpeg;base64," + imageData;
	
	movePic(imageData);
	/*
	window.localStorage.setItem("profilePicture", imageData);
	document.getElementById('avatarPicture').src = window.localStorage.getItem('profilePicture');
	*/
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
	sourceType: sourcem,
	saveToPhotoAlbum : true});
}
function onFail(message) {
	console.log('Failed because: ' + message);
}



function movePic(file){ 
	alert('movePic');
	alert(window.resolveLocalFileSystemURL);
    window.resolveLocalFileSystemURL("//" + file, resolveOnSuccess, resOnError); 
}

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry){ 
	alert('resolveOnSuccess');
    var d = new Date();
    var n = d.getTime();
    //new file name
    var newFileName = n + ".jpg";
    var myFolderApp = "MyAppFolder";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
    //The folder is created if doesn't exist
    fileSys.root.getDirectory( myFolderApp,
                    {create:true, exclusive: false},
                    function(directory) {
                        entry.moveTo(directory, newFileName,  successMove, resOnError);
                    },
                    resOnError);
                    },
    resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
	alert('successMove');
    //Store imagepath in session for future use
    // like to store it in database
    sessionStorage.setItem('profilePicture', entry.fullPath);
	alert('entry.fullPath= ' + entry.fullPath);
}

function resOnError(error) {
    alert(error.code);
}