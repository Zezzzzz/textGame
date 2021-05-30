var awsURL = "http://ec2-3-142-198-160.us-east-2.compute.amazonaws.com"
//var localhost = "http://localhost"
var localhost = "http://192.168.1.43"

var threadWebservice = localhost+":8080/thread";


getAllThreadsCreatedByUser(10,0);

function getAllThreadsCreatedByUser(limit, offset){
    fetch(threadWebservice + "/allThreadsCreatedByUser?id_user=" + 4 +"&limit="+limit+"&offset="+offset)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            for(var j in data){
                var i = data[j];
                var thread = JSON.parse(JSON.parse(i)[0]);
                var commentCount = JSON.parse(JSON.parse(i)[1]);
                var votes = JSON.parse(JSON.parse(i)[2]);
                var container = document.querySelector('table');
                var imageURL = thread.imageURL;
                var display = "block";
                console.log(imageURL);
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
                                                <img class="textImg" src="${imageURL}"" ontouchstart="handleImageZoom(this.src))"/>
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