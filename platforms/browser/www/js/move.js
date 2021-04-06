var threadBox = document.getElementsByClassName('hid-box')[0]
var startingY;
var imageZoom = false;

function handleTouchStart(event){
    startingY = event.touches[0].clientY;
}

function handleTouchMove(event){
    if(!imageZoom){
        var touch = event.touches[0];
        var change = startingY - touch.clientY;
        if(change < 0){
            return;
        }
        var top = parseFloat(threadBox.style.top.substring(0,threadBox.style.top.length-2));
        console.log(top);
        if(change > 0 && top <= 0){
            return;
        } 
        threadBox.style.top = '-' + change + 'px';
        event.preventDefault();
    }
}

function handleTouchEnd(event){
    if(!imageZoom){
        var change = startingY - event.changedTouches[0].clientY;
        var threshold = screen.height / 5;
        console.log(startingY);
        console.log(threadBox.style.top);
        if (threadBox.style.top != '0px'){
            if (change < threshold) {
                threadBox.style.top = '21%';
                document.getElementsByClassName("threads")[0].tBodies[0].style.overflowY = "visible";
                document.getElementById("threadTable").style.overflowY = "visible";
            } else{
                if (startingY){
                    threadBox.style.transition = 'all .3s'
                    threadBox.style.top = 0
                    document.getElementsByClassName("threads")[0].tBodies[0].style.overflowY = "scroll";
                    document.getElementById("threadTable").style.overflowY = "scroll";
                }
            }
        } else{
            if (-change > threshold) {
                threadBox.style.top = '21%';
                document.getElementsByClassName("threads")[0].tBodies[0].style.overflowY = "visible";
                document.getElementById("threadTable").style.overflowY = "visible";
            }
        }
    }
}

var modal = document.getElementById("myModal");
var img = document.getElementsByClassName("textImg");
var modalImg = document.getElementById("modal-content");
var commentModal = document.getElementById("commentModal");

function handleImageZoom(event){
    imageZoom = true;
    modal.style.display = "block";
    modalImg.src = img[0].src;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
  imageZoom = false;
}

