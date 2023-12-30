/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from'react-native-push-notification';
import {Platform} from'react-native';

PushNotification.createChannel(
  {
    channelId: "your-channel-id", // replace with your channel id
    channelName: "Your Channel Name", // replace with your channel name
    channelDescription: "A channel to categorise your notifications", // optional
    // other properties...
  },
  (created) => console.log(`CreateChannel returned '${created}'`) // optional callback returns whether the channel was created or already existed
);

PushNotification.createChannel(
  {
    channelId: "your-channel-id", // replace with your channel id
    channelName: "Your Channel Name", // replace with your channel name
    channelDescription: "A channel to categorise your notifications", // optional
    // other properties...
  },
  (created) => console.log(`CreateChannel returned '${created}'`) // optional callback returns whether the channel was created or already existed
);

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
  
      // process the notification
  
      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    // onAction: function (notification) {
    //   console.log('ACTION:', notification.action);
    //   console.log('NOTIFICATION:', notification);
  
    //   // process the action
    // },
  
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    // onRegistrationError: function (err) {
    //   console.error(err.message, err);
    // },
  
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });

AppRegistry.registerComponent(appName, () => App);
