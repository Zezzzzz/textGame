var awsURL = "http://ec2-3-142-198-160.us-east-2.compute.amazonaws.com"
var threadWebservice = awsURL+":8080/thread";
var postWebservice = awsURL+":8080/post";

fetch(threadWebservice + "/getLatest")
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data);
        for(var j in data){
            var i = data[j];
            var thread = JSON.parse(JSON.parse(i)[0]);
            var commentCount = JSON.parse(JSON.parse(i)[1]);
            var votes = JSON.parse(JSON.parse(i)[2]);
            var container = document.querySelector('table');
            var html = `
                        
                        <tr>
                            <td class="row">
                                <a href="./thread.html?threadID=${thread.threadID}">
                                    <h class="threadHeader">
                                        ${thread.thread_title}
                                    </h4>
                                    <div class="bottom">
                                        <div class="threadImg">
                                            <img class="textImg" src="./img/testText1.jpg" ontouchstart="handleImageZoom(event)"/>
                                        </div>
                                    </div>
                                    <div class="bottom">
                                        <div class="like">
                                            <img src="./img/like.png">
                                        </div>
                                        <p>
                                            ${votes} votes    
                                        </p>
                                        <div class="like">
                                            <img src="./img/comment.png">
                                        </div>
                                        <p class="comment-count">
                                            ${commentCount} Comments
                                        </p>
                                    </div>
                                </a>
                            </td>
                        </tr>
                        `
            container.insertAdjacentHTML('beforeend', html);
        }

        
    })
    .catch(function(error){
        console.log(error);
    });

function changeCategory(s){
    console.log(s);
    var container = document.querySelector('table');
    container.innerHTML = "";
    fetch(threadWebservice + "/getListOfThreads?category=" + s)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            for(var j in data){
                var i = data[j];
                console.log(i);
                var thread = JSON.parse(JSON.parse(i)[0]);
                var commentCount = JSON.parse(JSON.parse(i)[1]);
                var votes = JSON.parse(JSON.parse(i)[2]);
                var container = document.querySelector('table');
                var html = `
                            
                            <tr>
                                <td class="row">
                                    <a href="./thread.html?threadID=${thread.threadID}">
                                        <h class="threadHeader">
                                            ${thread.thread_title}
                                        </h4>
                                        <div class="bottom">
                                            <div class="threadImg">
                                                <img class="textImg" src="./img/testText1.jpg" ontouchstart="handleImageZoom(event)"/>
                                            </div>
                                        </div>
                                        <div class="bottom">
                                            <div class="like">
                                                <img src="./img/like.png">
                                            </div>
                                            <p>
                                                ${votes} votes    
                                            </p>
                                            <div class="like">
                                                <img src="./img/comment.png">
                                            </div>
                                            <p class="comment-count">
                                                ${commentCount} Comments
                                            </p>
                                        </div>
                                    </a>
                                </td>
                            </tr>
                            `
                container.insertAdjacentHTML('beforeend', html);
            }

            
        })
        .catch(function(error){
            console.log(error);
        });
}

function goToNewThreadPage(){
    var url = "addNewThread.html";
    var addNewThreadButton = document.getElementById("goToNewThreadPage");
    addNewThreadButton.setAttribute("href", url);
}