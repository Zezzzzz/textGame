var awsURL = "http://ec2-3-142-198-160.us-east-2.compute.amazonaws.com"
var localhost = "http://localhost"
var threadWebservice = localhost+":8080/thread";
var postWebservice = localhost+":8080/post";


fetch(threadWebservice + "/getThread?threadID=" + params.threadID[0])
    .then((resp) => resp.json())
    .then((data) => {
        var container = document.getElementsByClassName('threadContent')[0];
        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("modal-content");
        for (var i in data){
            var html = `
                <h class="threadHeader" id="commentThreadHeader">
                    ${JSON.parse(data[i]).thread_title}
                </h>
                
            `
            var content = `
                <div class="commentThreadContent">
                    <p>
                        ${JSON.parse(data[i]).content}
                    </p>
                </div>
            `
            modalImg.src = "./img/testText1.jpg";
            container.insertAdjacentHTML('beforeend', html);
            modal.insertAdjacentHTML('beforeend', content);           
        }

        var header = document.getElementById("commentThreadHeader");
        header.addEventListener("touchstart", function() {
            console.log("test");
            this.classList.toggle("active");
            modal.style.display = "block";
        });
        
    })
    .catch(function(error){
        console.log(error);
    });


var modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modal.style.display = "none";
    imageZoom = false;
}


function postComment(){
    var comment = document.getElementById("comment").value;
    var reqData = {
        "post": {
            //"userID": sessionStorage.getItem('loggedIn'),
            "userID": "9",
            "threadID": params.threadID[0],
            "post_title": params.post_title[0],
            "content": comment,
            "imageURL": "",
            "status": "3"
        }
        
    }
    console.log(reqData);
    fetch(postWebservice + '/addComment', {
        method: 'POST',
        body: JSON.stringify(reqData)
    })
    .then(response => response.json())
    .then(data => {
        url = "thread.html?threadID=" + data.threadID;
        console.log('Success', data);
        window.location.replace(url);
        
    })
    .catch((error) => {
        console.log('Error', error);
    });
    
}