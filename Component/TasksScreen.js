import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const TasksScreen = ({ route }) => {
  const { tasks } = route.params;
  const [taskList, setTaskList] = useState(tasks);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();

  // Function to handle task updates
  const onUpdateTask = (updatedTask) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // Function to handle task deletion
  const onDeleteTask = (taskId) => {
    setTaskList(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleCheckBoxChange = (id) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
              onUpdateTask,  // Pass onUpdateTask to TaskDetail
              onDeleteTask,  
            })}

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
        keyExtractor={item => item.id}
      />
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
});

export default TasksScreen;
