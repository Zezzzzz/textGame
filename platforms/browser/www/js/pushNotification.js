const push = PushNotification.init({
	android: {
        alert: "true",
		badge: "true",
		sound: "true"
	}
});

push.on('registration', (data) => {
	// data.registrationId
});

push.on('notification', (data) => {
	// data.message,
	// data.title,
	// data.count,
	// data.sound,
	// data.image,
	// data.additionalData
});

push.on('error', (e) => {
	// e.message
});


  var content = {
    priority: 'normal', // Valid values are "normal" and "high."
    data: {
      title: 'A short string describing the purpose of the notification',
      message: 'The text of the alert message', // "body" can be used as alias, is converted to "message"
      // localization of message is possible
      count: 5, // set the badge notification count at app icon
      sound: 'default', // play default sound ... or "soundname", see [Android Sound](#sound) section
      notId: 1, // unique ID for the message, used for grouping, see below
      'content-available': '0', // configure background updates, see below
      custom_key1: 'value1',
      custom_key2: 'value2'
    }
  };

  var gcm_message = JSON.stringify({
    GCM: JSON.stringify(content),
    default: 'plain text message again'
  });