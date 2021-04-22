var http = new XMLHttpRequest();
var awsURL = "http://ec2-3-142-198-160.us-east-2.compute.amazonaws.com"
var localhost = "http://localhost"

var googleUser = {};
var startApp = function() {
    gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '902193880927-e2un67hkmtnrq8o3cdfrj25spki77icj.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('googleButton'));
    });
};

function attachSignin(element) {
    auth2.attachClickHandler(element, {},
        function(googleUser) {
            //112488277392392011790
            var profile = googleUser.getBasicProfile();
            var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
            hashObj.update(profile.getId());
            var hash = hashObj.getHash("HEX");
            var reqData = {
                "user": {
                    "username": profile.getName(),
                    "email": profile.getEmail(),
                    "is_moderator": false,
                    "blocked": false,
                    "id_token": hash,
                    "profile_pic": "https://ibb.co/Ms6NZRc"
                }
                
            }
            fetch(localhost + '/user/login', {
                method: 'POST',
                body: JSON.stringify(reqData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success', data);
                url = "index.html?username=" + data.username + '&id_token=' + data.id_token;
                sessionStorage.setItem("loggedIn", data.userID);
                window.location.replace(url);
            })
            .catch((error) => {
                console.log('Error', error);
            });
            
        }, function(error) {
            alert(JSON.stringify(error, undefined, 2));
        });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
    });
}

