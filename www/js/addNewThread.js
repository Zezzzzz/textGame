var awsURL = "http://ec2-3-142-198-160.us-east-2.compute.amazonaws.com"
var localhost = "http://localhost"
var threadWebservice = localhost+":8080/thread";

function postNewThread(){
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
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
    console.log(reqData);
    fetch(threadWebservice + '/addNewThread', {
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
    
}