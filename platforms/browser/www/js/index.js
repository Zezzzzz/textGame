/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

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
