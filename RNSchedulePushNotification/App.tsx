import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  showNotification,
  handleScheduleNotification,
  cancelAllNotification,
} from './src/notification.android';

const App = () => {
  const date = new Date(Date.now() + 5000);
  return (
    <View style={styles.container}>
      {/* <Text>Push Notification</Text> */}
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
