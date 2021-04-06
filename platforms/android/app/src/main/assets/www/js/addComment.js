var threadWebservice = 'http://192.168.1.36:8080/thread';
var postWebservice = 'http://192.168.1.36:8080/post';


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

function showOnscreenKB(){
    console.log("test");
    NativeKeyboard.showMessenger({
        onSubmit: function(text) {
          console.log("The user typed: " + text);
        }
      });
}