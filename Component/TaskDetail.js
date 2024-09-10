import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';

const TaskDetail = ({ route }) => {
  const { task } = route.params;
  const [taskName, setTaskName] = useState(task.taskName);
  const [taskDescription, setTaskDescription] = useState(task.taskDescription);
  const [priority, setPriority] = useState(task.priority);

  const handleSave = () => {
    Alert.alert(
      "Confirm Changes",
      "Are you sure you want to save these changes?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Changes canceled"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            // Save changes to the task here
            console.log("Changes saved");
            // Optionally, update the task or navigate away
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextInput
          style={styles.title}
          value={taskName}
          onChangeText={setTaskName}
        />
        <TextInput
          style={styles.description}
          value={taskDescription}
          onChangeText={setTaskDescription}
          multiline
        />
        <TextInput
          style={styles.priority}
          value={priority}
          onChangeText={setPriority}
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>That's it</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  description: {
    fontSize: 18,
    marginBottom: 15,
    color: '#666',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
  priority: {
    fontSize: 18,
    color: '#007BFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default TaskDetail;
