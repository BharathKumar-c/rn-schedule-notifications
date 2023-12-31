import PushNotification from 'react-native-push-notification';

const showNotification = (title, message) => {
    PushNotification.localNotification({
        channelId: "your-channel-id",
        title: title,
        message: message,
    }) ;
}

const handleScheduleNotification = (title, message, date) => {
    console.log(date);
    PushNotification.localNotificationSchedule({
        channelId: "your-channel-id",
        title: title,
        message: message,
        date: new Date(Date.now() + 5 * 1000), // Use the date parameter for scheduling
        repeatTime: 1,
        actions: ['Yes', 'No'],
    });
}

const cancelAllNotification = () => {
    PushNotification.cancelAllLocalNotifications();
}

export {showNotification, handleScheduleNotification, cancelAllNotification};