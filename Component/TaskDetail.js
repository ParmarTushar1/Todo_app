import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';

const TaskDetail = ({ route }) => {
  const { task, onUpdateTask, onDeleteTask } = route.params || {};
  
  const [taskName, setTaskName] = useState(task?.taskName || '');
  const [taskDescription, setTaskDescription] = useState(task?.taskDescription || '');
  const [priority, setPriority] = useState(task?.priority || '');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleUpdateTask = useCallback(() => {
    if (!task) {
      Alert.alert("Error", "Task not found.");
      return;
    }

    if (!onUpdateTask) {
      console.error("onUpdateTask function is not provided");
      return;
    }

    // Debugging output
    console.log('Updating Task:', {
      id: task.id, // Ensure the task ID is included
      taskName,
      taskDescription,
      priority,
    });

    onUpdateTask({
      id: task.id, // Ensure to include the task ID
      taskName,
      taskDescription,
      priority,
    });

    setHasChanges(false); // Reset hasChanges after update
  }, [task, taskName, taskDescription, priority, onUpdateTask]);

  const confirmDeleteTask = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => {
          if (onDeleteTask) {
            onDeleteTask(task.id);
          } else {
            console.error("onDeleteTask function is not provided");
          }
        }},
      ]
    );
  };

  const handleInputChange = (setter) => (value) => {
    setter(value);
    setHasChanges(true);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Task Details</Text>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={[styles.inputContainer, isDarkMode ? styles.darkInput : styles.lightInput]}>
          <TextInput
            style={[styles.taskNameInput, isDarkMode ? styles.darkText : styles.lightText]}
            placeholder="Task Name"
            placeholderTextColor={isDarkMode ? '#ccc' : '#555'}
            value={taskName}
            onChangeText={handleInputChange(setTaskName)}
          />
          <TextInput
            style={[styles.taskDescriptionInput, isDarkMode ? styles.darkText : styles.lightText]}
            placeholder="Task Description"
            placeholderTextColor={isDarkMode ? '#ccc' : '#555'}
            value={taskDescription}
            onChangeText={handleInputChange(setTaskDescription)}
            multiline
          />
          <TextInput
            style={[styles.priorityInput, isDarkMode ? styles.darkText : styles.lightText]}
            placeholder="Priority"
            placeholderTextColor={isDarkMode ? '#ccc' : '#555'}
            value={priority}
            onChangeText={handleInputChange(setPriority)}
          />
        </View>
      </ScrollView>

      {hasChanges && (
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity onPress={handleUpdateTask} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#222',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  contentContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  taskNameInput: {
    height: 40,
    fontSize: 18,
    marginBottom: 10,
  },
  taskDescriptionInput: {
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  priorityInput: {
    height: 40,
    fontSize: 18,
    marginTop: 10,
  },
  darkInput: {
    borderColor: '#444',
    backgroundColor: '#333',
  },
  lightInput: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    overflow: 'hidden',
  },
  saveButton: {
    backgroundColor: '#62b4e4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButton: {
    padding: 10,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default TaskDetail;
