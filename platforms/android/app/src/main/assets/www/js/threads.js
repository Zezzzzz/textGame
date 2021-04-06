var threadWebservice = 'http://192.168.1.36:8080/thread';

fetch(threadWebservice + "/getLatest")
    .then((resp) => resp.json())
    .then((data) => {
        //console.log(data);
        for(var i in data){
            var commentCount = 0;
            var votes = 0;
            if(i != null || i.length > 0){
                commentVotes = JSON.parse(data[i]);
                commentCount = commentVotes[0];
                votes = commentVotes[1];
            }
            thread = JSON.parse(i);
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
