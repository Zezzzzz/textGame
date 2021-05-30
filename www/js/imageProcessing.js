
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}
var profileImage = document.getElementById("profileImage");
var profilePicURI = localStorage.getItem("profilePicURI");
if(profilePicURI != null && profileImage != null){
    profileImage.src = profilePicURI;
}
function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    }
    return options;
}

var imageLocation;
var profileImage = document.getElementById("profileImage");
function openFilePicker(selection) {
    
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    //var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        imageLocation = imageUri;
        console.log(profileImage);
        if(profileImage != null){
            profileImage.src = imageUri;
            localStorage.setItem("profilePicURI", imageUri);
        }
        

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}