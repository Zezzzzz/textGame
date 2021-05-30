//const { cat } = require("@cloudinary/base/qualifiers/focusOn");

var awsURL = "http://ec2-3-142-198-160.us-east-2.compute.amazonaws.com"
var localhost = "http://192.168.1.43"
//var localhost = "http://localhost"

var threadWebservice = localhost+":8080/thread";
var postWebservice = localhost+":8080/post";


fetch(threadWebservice + "/thread?threadID=" + params.threadID[0])
    .then((resp) => resp.json())
    .then((data) => {
        var container = document.getElementsByClassName('threadContent')[0];
        for (var i in data){
            var dateNow = new Date();
            var dateCreated = Date.parse(JSON.parse(data[i]).created);
            var seconds = Math.floor((dateNow - (dateCreated))/1000);
            var minutes = Math.floor(seconds/60);
            var hours = Math.floor(minutes/60);
            var days = Math.floor(hours/24);
            var created = ""
            if (days > 0){
                created = days + " days";
            } else if (hours > 0){
                created = hours + "hrs";
            } else if (minutes > 0){
                created = minutes + "min";
            } else {
                created = seconds + "s";
            }
            var thread = JSON.parse(data[i]);
            var imageURL = thread.imageURL;
            var display = "block";
            //console.log(imageURL);
            if(imageURL == null || imageURL.length == 0){
                display = "none";
                imageURL = "";
            }
            var html = `
                <p>
                    Posted by ${JSON.parse(i).username} ${created} ago
                </p>
                <h class="threadHeader">
                    ${thread.thread_title}
                </h>
                <p>
                    ${thread.content}
                </p>
                <div class="bottom" style="display:${display}">
                    <div class="threadImg" >
                        <img class="textImg" src="${imageURL}" ontouchstart="handleImageZoom(this.src)"/>
                    </div>
                </div>
            `
            container.insertAdjacentHTML('beforeend', html);
        }
        
    })
    .catch(function(error){
        console.log(error);
    });
var currentPost = 0; 
var container = document.getElementsByClassName('replies')[0];
var body = document.getElementsByClassName("threadBody")[0];
var currentCategory = "latest";
var reachedEnd = false;
var changeCat = false;
body.addEventListener('scroll', function() {
    console.log(body.scrollTop + " " + body.clientHeight + " " + body.scrollHeight + " " + changeCat);
    if(body.scrollTop + body.clientHeight >= body.scrollHeight && !changeCat){
        currentPost = currentPost + 10;
        reachedEnd = true;
        getAllPostOfThread(params, currentCategory,10,currentPost);
        console.log("done");
    }
});



getAllPostOfThread(params, "latest", 10, currentPost);



function changePostCategory(category){
    currentCategory = category;
    currentPost = 0;
    reachedEnd = false;
    changeCat = true;
    getAllPostOfThread(params, category, 10, currentPost);
}

function getAllPostOfThread(params, category, limit, offset){
    //RMB to change userID
    console.log(params + " " + category + " " + limit + " " + offset)
    if(!reachedEnd){
        var replies = document.getElementsByClassName("reply");
        for(var i = replies.length - 1; i >= 0; i--){
            replies[i].remove();
        }
    }
    fetch(postWebservice + "/allPostOfThread?threadID=" + params.threadID[0] +
            "&currentUserID=" + 2 + "&category=" + category +
            "&limit=" + limit + "&offset=" + offset) 
        .then((resp) => resp.json())
        .then((data) => {
            if(data.length == 0 && offset > 0){
                currentPost -= 10;
            }
            for (var j in data){
                var i = data[j];
                console.log(i);
                var post = JSON.parse(JSON.parse(i)[0]);
                var vote = JSON.parse(i)[1];
                var dateNow = new Date();
                var dateCreated = Date.parse(post.created);
                var seconds = Math.floor((dateNow - (dateCreated))/1000);
                var minutes = Math.floor(seconds/60);
                var hours = Math.floor(minutes/60);
                var days = Math.floor(hours/24);
                var created = ""
                if (days > 0){
                    created = days + " days";
                } else if (hours > 0){
                    created = hours + "hrs";
                } else if (minutes > 0){
                    created = minutes + "min";
                } else {
                    created = seconds + "s";
                }
                var html = `
                    <div class="reply">
                        <h>
                            Posted by ${JSON.parse(JSON.parse(i)[2]).username} ${created} ago
                        </h>
                        <p>
                            ${post.content}
                        </p>
                        <div>
                            <div class="like"ontouchend="upvote(${post.postID})")>
                                <img id="${post.postID}upvote" src="./img/arrow.png" style="transform:rotate(90deg)">
                            </div>
                            <p id="${post.postID}" style="font-size:3.5vw;margin:2%;padding:2%">
                                ${vote}
                            </p>
                            <div class="like"ontouchend="downvote(${post.postID})")>
                                <img id="${post.postID}downvote" src="./img/arrow.png" style="transform:rotate(270deg)">
                            </div>
                        </div>
                    </div>
                `
                container.insertAdjacentHTML('beforeend', html);
                var vote = document.getElementById(post.postID);
                var upArrow = document.getElementById(post.postID+"upvote");
                var downArrow = document.getElementById(post.postID+"downvote");
                
                if(JSON.parse(i)[3] == "1"){
                    vote.setAttribute("upvoted", true);
                    vote.setAttribute("downvoted", false);
                    upArrow.src = "./img/upvoted.png";
                } else if(JSON.parse(i)[3] == "-1"){
                    vote.setAttribute("upvoted", false);
                    vote.setAttribute("downvoted", true);
                    downArrow.src = "./img/downvoted.png";
                } else {
                    vote.setAttribute("upvoted", false);
                    vote.setAttribute("downvoted", false);
                } 
                
            }
            var bottomDiv = document.createElement('div');
            bottomDiv.className = "commentSize";
            bottomDiv.style.height = document.getElementById("addComment").style.height;
            container.insertAdjacentElement('beforeend', bottomDiv);
            if(changeCat){
                changeCat = false;
            }
            
        })
        .catch(function(error){
            console.log(error);
        });
}

function upvote(postID){
    var vote = document.getElementById(postID);
    var upvoted = vote.getAttribute("upvoted") == "true";
    var downvoted = vote.getAttribute("downvoted") == "true";
    var upArrow = document.getElementById(postID+"upvote");
    var downArrow = document.getElementById(postID+"downvote");
    if(!upvoted && downvoted){
        fetch(postWebservice + "/upVote?userID=" + 2 + "&postID=" + postID)
        .then((resp) => resp.json())
        .catch(function(error){
            console.log(error);
        });
        fetch(postWebservice + "/upVote?userID=" + 2 + "&postID=" + postID)
        .then((resp) => resp.json())
        .then((data) => {
            document.getElementById(postID).innerHTML = data;
        })
        .catch(function(error){
            console.log(error);
        });
        vote.setAttribute("upvoted",true);
        vote.setAttribute("downvoted",false);
        upArrow.src = "./img/upvoted.png";
        downArrow.src = "./img/arrow.png";

    } else if (!upvoted){
        fetch(postWebservice + "/upVote?userID=" + 2 + "&postID=" + postID)
        .then((resp) => resp.json())
        .then((data) => {
            document.getElementById(postID).innerHTML = data;
        })
        .catch(function(error){
            console.log(error);
        });
        if(!downvoted){
            vote.setAttribute("upvoted",true);
            upArrow.src = "./img/upvoted.png";
        }
    } else {
        fetch(postWebservice + "/downVote?userID=" + 2 + "&postID=" + postID)
        .then((resp) => resp.json())
        .then((data) => {
            document.getElementById(postID).innerHTML = data;
        })
        vote.setAttribute("upvoted",false);
        upArrow.src = "./img/arrow.png";
    }
}

function downvote(postID){
    var vote = document.getElementById(postID);
    var upvoted = vote.getAttribute("upvoted") == "true";
    var downvoted = vote.getAttribute("downvoted") == "true";
    var upArrow = document.getElementById(postID+"upvote");
    var downArrow = document.getElementById(postID+"downvote");
    if(upvoted && !downvoted){
        fetch(postWebservice + "/downVote?userID=" + 2 + "&postID=" + postID)
        .then((resp) => resp.json())
        .catch(function(error){
            console.log(error);
        });
        fetch(postWebservice + "/downVote?userID=" + 2 + "&postID=" + postID)
        .then((resp) => resp.json())
        .then((data) => {
            document.getElementById(postID).innerHTML = data;
        })
        .catch(function(error){
            console.log(error);
        });
        vote.setAttribute("upvoted",false);
        vote.setAttribute("downvoted",true);
        upArrow.src = "./img/arrow.png";
        downArrow.src = "./img/downvoted.png";

    } else if (!downvoted){
        fetch(postWebservice + "/downVote?userID=" + 2 + "&postID=" + postID)
        .then((resp) => resp.json())
        .then((data) => {
            document.getElementById(postID).innerHTML = data;
        })
        .catch(function(error){
            console.log(error);
        });
        if(!upvoted){
            vote.setAttribute("downvoted",true);
            downArrow.src = "./img/downvoted.png";
        }
    } else {
        fetch(postWebservice + "/upVote?userID=" + 2 + "&postID=" + postID)
        .then((resp) => resp.json())
        .then((data) => {
            document.getElementById(postID).innerHTML = data;
        })
        .catch(function(error){
            console.log(error);
        });
        vote.setAttribute("downvoted",false);
        downArrow.src = "./img/arrow.png";
    }
}

function addComment(){
    var url = "addComment.html?threadID="+params.threadID[0]+"&post_title="+document.getElementsByClassName("threadHeader")[0].innerText;
    var addCommentBox = document.getElementById("addCommentBox");
    addCommentBox.setAttribute("href", url);
}
