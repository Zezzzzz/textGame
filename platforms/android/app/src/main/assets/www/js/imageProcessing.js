var camearaOptions = {
    quality: 100,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
}

function getImage() {
    navigator.camera.getPicture(uploadPhoto, onError, camearaOptions);
}

function onError(err) {
    alert(error);
}

function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    /*var ft = new FileTransfer();
    ft.upload(imageURI, "http://192.168.1.4/phonegap/upload/upload.php",
        function(result) {
            console.log(JSON.stringify(result));
        },
        function(error) {
            console.log(JSON.stringify(error));
        }, options);
        */
    console.log(imageURI);
}