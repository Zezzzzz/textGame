cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-native-keyboard/www/NativeKeyboard.js",
        "id": "cordova-plugin-native-keyboard.NativeKeyboard",
        "pluginId": "cordova-plugin-native-keyboard",
        "clobbers": [
            "window.NativeKeyboard"
        ]
    },
    {
        "file": "plugins/cordova-plugin-keyboard/www/keyboard.js",
        "id": "cordova-plugin-keyboard.keyboard",
        "pluginId": "cordova-plugin-keyboard",
        "clobbers": [
            "window.Keyboard"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-native-keyboard": "2.0.6",
    "cordova-plugin-keyboard": "1.2.0"
}
// BOTTOM OF METADATA
});