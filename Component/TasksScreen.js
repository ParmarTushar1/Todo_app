import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const TasksScreen = ({ route }) => {
  const { tasks, onTasksUpdate } = route.params; // Assuming onTasksUpdate is a function passed to update tasks
  const [taskList, setTaskList] = useState(tasks);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isActionHeaderVisible, setIsActionHeaderVisible] = useState(false);
  const navigation = useNavigation();

  const onUpdateTask = (updatedTask) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskList(updatedTaskList);
    onTasksUpdate(updatedTaskList); // Update the parent component if necessary
  };

  const onDeleteTask = (id) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          const updatedTaskList = taskList.filter((task) => task.id !== id);
          setTaskList(updatedTaskList);
          onTasksUpdate(updatedTaskList); // Ensure the parent component is updated
          setIsActionHeaderVisible(false); // Hide the action header after deletion
        },
      },
    ]);
  };

  const handleCheckBoxChange = (id) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTaskList(updatedTaskList);
    onTasksUpdate(updatedTaskList); // Update parent component if necessary
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLongPress = (task) => {
    setSelectedTask(task);
    setIsActionHeaderVisible(true);
  };

  const moveToNotesSection = () => {
    console.log('Moved to Notes Section:', selectedTask);
    setIsActionHeaderVisible(false);
  };

  const pinTask = () => {
    // Filter out the selected task and add it to the top
    const updatedTaskList = taskList.filter((task) => task.id !== selectedTask.id);
    updatedTaskList.unshift(selectedTask); // Add the selected task to the top
    setTaskList(updatedTaskList);
    onTasksUpdate(updatedTaskList);
    setIsActionHeaderVisible(false);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>All Tasks</Text>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('TaskDetail', {
              task: item,
              onUpdateTask,
              onDeleteTask,
            })}
            onLongPress={() => handleLongPress(item)}
            style={[styles.todoItem, isDarkMode ? styles.darkTodoItem : styles.lightTodoItem]}
          >
            <CheckBox
              value={item.isCompleted}
              onValueChange={() => handleCheckBoxChange(item.id)}
              tintColors={{ true: '#007BFF', false: '#bbb' }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.todoText, item.isCompleted ? styles.completedText : null, isDarkMode ? styles.darkTodoText : styles.lightTodoText]}>
                {item.taskName}
              </Text>
              <Text style={[styles.todoDescription, isDarkMode ? styles.darkTodoDescription : styles.lightTodoDescription]}>
                {item.taskDescription}
              </Text>
              <Text style={[styles.priorityText, isDarkMode ? styles.darkPriorityText : styles.lightPriorityText]}>
                {item.priority}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
      {isActionHeaderVisible && (
        <View style={styles.actionHeader}>
          <TouchableOpacity onPress={moveToNotesSection} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📋 Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pinTask} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📌 Pin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeleteTask(selectedTask.id)} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>🗑️ Delete</Text>
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
    backgroundColor: '#f8f8f8',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  toggleButton: {
    padding: 10,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  todoItem: {
    padding: 15,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lightTodoItem: {
    borderBottomColor: '#eee',
  },
  darkTodoItem: {
    borderBottomColor: '#444',
  },
  todoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightTodoText: {
    color: '#333',
  },
  darkTodoText: {
    color: '#fff',
  },
  todoDescription: {
    fontSize: 14,
  },
  lightTodoDescription: {
    color: '#555',
  },
  darkTodoDescription: {
    color: '#aaa',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  priorityText: {
    fontSize: 14,
  },
  lightPriorityText: {
    color: '#555',
  },
  darkPriorityText: {
    color: '#aaa',
  },
  actionHeader: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#62b4e4',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  actionButton: {
    padding: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TasksScreen;
