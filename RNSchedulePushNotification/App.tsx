import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  showNotification,
  handleScheduleNotification,
  cancelAllNotification,
} from './src/notification.android';
import notifee, {
  EventType,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

const App = () => {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  // Call this function in your app's initialization flow
  function setupNotificationListeners() {
    notifee.onForegroundEvent(({type, detail}: any) => {
      switch (type) {
        case EventType.ACTION_PRESS:
          if (detail.pressAction.id === 'skip') {
            // Handle the skip action
            handleSkipAction();
          } else if (detail.pressAction.id === 'taken') {
            // Handle the taken action
            handleTakenAction();
          }
          break;
        // You can handle other event types here
      }
    });
  }

  function handleSkipAction() {
    // Implement what should happen when skip is pressed
    console.log('Skip action pressed');
    // Update state, log the event, etc.
  }

  function handleTakenAction() {
    // Implement what should happen when taken is pressed
    console.log('Taken action pressed');
    // Update state, log the event, etc.
  }

  async function onCreateTriggerNotification() {
    const date = new Date(Date.now() + 5000);
    // date.setHours(4);
    // date.setMinutes(52);
    console.log(date.getTime());
    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    const skipAction = {
      title: 'Skip',
      pressAction: {id: 'skip'},
    };

    // Then, create an action for the 'Taken' button
    const takenAction = {
      title: 'Taken',
      pressAction: {id: 'taken'},
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId: 'your-channel-id',
          actions: [skipAction, takenAction],
        },
      },
      trigger,
    );
  }

  setupNotificationListeners();

  const date = new Date(Date.now() + 5000);
  return (
    <View style={styles.container}>
      {/* <Text>Push Notification</Text> */}
      <TouchableOpacity
        onPress={() => onCreateTriggerNotification()}
        activeOpacity={0.6}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>
            Click me to get notifee Notification
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => showNotification('hello', 'message')}
        activeOpacity={0.6}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>Click me to get Notification</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleScheduleNotification('Hi', 'message after 5secs', date)
        }
        activeOpacity={0.6}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>
            Click me to get Notification after 5secs
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => cancelAllNotification()}
        activeOpacity={0.6}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>Cancel all Notification</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: 'blue',
    borderRadius: 24,
    marginBottom: 16,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
  },
});
