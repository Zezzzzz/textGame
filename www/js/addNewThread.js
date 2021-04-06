var threadWebservice = 'http://192.168.1.36:8080/thread';

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