var awsURL = "http://ec2-3-142-198-160.us-east-2.compute.amazonaws.com"
//var localhost = "http://localhost"
var localhost = "http://192.168.1.43"

var threadWebservice = localhost+":8080/thread";

function postNewThread(){
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
    if(imageLocation == null){
        var reqData = {
            "thread": {
                //"userID": sessionStorage.getItem('loggedIn'),
                "thread_title": title,
                "userID": "4",
                "imageURL": "",
                "content": content,
                "status": 3
            }
            
        }
        console.log(threadWebservice + '/newThread');
        fetch(threadWebservice + '/newThread', {
            method: 'POST',
            body: JSON.stringify(reqData)
        })
        .then(response => response.json())
        .then(data => {
            url = "./thread.html?threadID=" + data.threadID;
            console.log('Success', data);
            window.location.replace(url);
            
        })
        .catch((error) => {
            console.log('Error', error);
        })

    } else{
        var request     = {
            imagePath           : imageLocation,
            cloudinarySettings  : {
                cloudName   : 'dceiioenq',
                apiKey      : '589387811534425',
                apiSecret   : 'raY75actiu40Ji1nZQeyV4Q-P-8'
            }
        }

        navigator.cloudinary.uploadImage(request, function (uploadResponse) {
            //Success callback
            var imgDiv = document.getElementsByClassName("addImg")[0];
            imgDiv.id = uploadResponse.url;
            console.log(imgDiv.id);
            //console.log('Cloudinary image plublic id', uploadResponse.url);
            //console.log('Cloudinary image format', uploadResponse.format);
            var reqData = {
                "thread": {
                    //"userID": sessionStorage.getItem('loggedIn'),
                    "thread_title": title,
                    "userID": "4",
                    "imageURL": document.getElementsByClassName("addImg")[0].id,
                    "content": content,
                    "status": 3
                }
                
            }
            console.log(reqData);
            fetch(threadWebservice + '/newThread', {
                method: 'POST',
                body: JSON.stringify(reqData)
            })
            .then(response => response.json())
            .then(data => {
                url = "./thread.html?threadID=" + data.threadID;
                console.log('Success', data);
                window.location.replace(url);
                
            })
            .catch((error) => {
                console.log('Error', error);
            });
        }, function (uploadError) {
            //Error callback
            console.error('Error', uploadError);
        });
    }
    
}