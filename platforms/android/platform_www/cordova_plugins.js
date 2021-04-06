cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-native-keyboard.NativeKeyboard",
      "file": "plugins/cordova-plugin-native-keyboard/www/NativeKeyboard.js",
      "pluginId": "cordova-plugin-native-keyboard",
      "clobbers": [
        "window.NativeKeyboard"
      ]
    },
    {
      "id": "cordova-plugin-keyboard.keyboard",
      "file": "plugins/cordova-plugin-keyboard/www/keyboard.js",
      "pluginId": "cordova-plugin-keyboard",
      "clobbers": [
        "window.Keyboard"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-native-keyboard": "2.0.6",
    "cordova-plugin-keyboard": "1.2.0"
  };
});