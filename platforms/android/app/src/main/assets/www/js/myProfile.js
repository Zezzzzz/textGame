var awsURL = "http://ec2-3-142-198-160.us-east-2.compute.amazonaws.com"
//var localhost = "http://localhost"
var localhost = "http://192.168.1.43"

var threadWebservice = localhost+":8080/thread";
var userWebservice = localhost+":8080/user"

var stats = document.getElementsByClassName('stats');
var statsName = ["<br>Threads","<br>Comments","<br>Votes"]
fetch(userWebservice + "/checkUserStats?user_id=" + 2)
    .then((resp) => resp.json())
    .then((data) => {
        for (var i in data){
            stats[i].innerHTML = data[i] + statsName[i];
        }
    }
)

var currentThread = 0; 
var box = document.getElementsByClassName('box')[0]
var currentCategory = "myThreads";
var reachedEnd = false;
changeProfileShow(currentCategory,10,currentThread);

window.addEventListener('scroll', function() {
    if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight){
        currentThread = currentThread + 10;
        reachedEnd = true;
        changeProfileShow(currentCategory,10,currentThread);
        console.log("done");
    }
});

function changeProfileShow(s,limit,offset){
    //console.log(s);
    url = threadWebservice;
    if(s === "myThreads"){
        url += "/allThreadsCreatedByUser?id_user="+2+"&limit="+limit+"&offset="+offset;
    } else if(s === "commentedThreads"){
        url += "/allThreadsCommentedByUser?id_user="+2+"&limit="+limit+"&offset="+offset;
    }

    var container = document.querySelector('table');
    container.innerHTML = "";
    fetch(url)
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
                var imageURL = thread.imageURL;
                var display = "block";
                if(imageURL == null || imageURL.length == 0){
                    display = "none";
                    imageURL = "";
                }
                var html = `
                            
                            <tr>
                                <td class="row">
                                    <a href="./thread.html?threadID=${thread.threadID}">
                                        <h class="threadHeader">
                                            ${thread.thread_title}
                                        </h4>
                                        <div class="bottom">
                                            <div class="threadImg" style="display:${display}">
                                                <img class="textImg" src="${imageURL}" ontouchstart="handleImageZoom(event)"/>
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
