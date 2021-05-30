var FirebasePlugin;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady(){
  FirebasePlugin = window.FirebasePlugin;
  console.log("device ready");


  // Set global error handler to catch uncaught JS exceptions
  var appRootURL = window.location.href.replace("index.html",'');
  window.onerror = function(errorMsg, url, line, col, error) {
      var logMessage = errorMsg;
      var stackTrace = null;

      var sendError = function(){
          FirebasePlugin.logError(logMessage, stackTrace, function(){
              console.log("Sent JS exception trace");
          },function(error){
              console.log("Failed to send JS exception trace", error);
          });
      };

      logMessage += ': url='+url.replace(appRootURL, '')+'; line='+line+'; col='+col;
/*
      if(error && typeof error === 'object'){
          StackTrace.fromError(error).then(function(trace){
              stackTrace = trace;
              sendError()
          });
      }else{
          sendError();
      }*/
  };


  //Register handlers
  FirebasePlugin.onMessageReceived(function(message) {
      try{
          console.log("onMessageReceived");
          console.dir(message);
          if(message.messageType === "notification"){
              handleNotificationMessage(message);
          }else{
              handleDataMessage(message);
          }
      }catch(e){
          console.log("Exception in onMessageReceived callback: "+e.message);
      }

  }, function(error) {
      console.log("Failed receiving FirebasePlugin message", error);
  });

  FirebasePlugin.getToken(function(fcmToken) {
    console.log(fcmToken);
  }, function(error) {
        console.error(error);
  });

  FirebasePlugin.registerAuthStateChangeListener(function(userSignedIn){
      console.log("Auth state changed: User signed " + (userSignedIn ? "in" : "out"));
  });

}

function handleNotificationMessage(message){
    var data = message.data;
    url = "./thread.html?" + data;
    window.location.replace(url);
}

