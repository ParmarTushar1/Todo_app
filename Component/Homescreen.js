import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Homescreen = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const navigation = useNavigation();

  const saveTask = () => {
    if (taskName.length > 0 && taskDescription.length > 0) {
      if (editingTaskId) {
        setTodos(todos.map(todo =>
          todo.id === editingTaskId
            ? { ...todo, taskName, taskDescription, priority }
            : todo
        ));
        setEditingTaskId(null);
      } else {
        setTodos([...todos, {
          id: Math.random().toString(),
          taskName,
          taskDescription,
          priority,
          isCompleted: false,
        }]);
      }
      clearInputs();
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (todo) => {
    setTaskName(todo.taskName);
    setTaskDescription(todo.taskDescription);
    setPriority(todo.priority);
    setEditingTaskId(todo.id);
  };

  const toggleCompletion = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo
    ));
  };

  const clearInputs = () => {
    setTaskName('');
    setTaskDescription('');
    setPriority('Medium');
  };

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigateToNotes = () => {
    navigation.navigate('NotesScreen');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>
          Todo List
        </Text>
        <View style={styles.modeToggle}>
          <Text style={isDarkMode ? styles.darkText : styles.lightText}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleMode} />
        </View>
      </View>

      <View style={[styles.combinedInputContainer, isDarkMode ? styles.darkInput : styles.lightInput]}>
        <TextInput
          style={[styles.taskNameInput, isDarkMode ? styles.darkText : styles.lightText]}
          placeholder="Task Name"
          placeholderTextColor={isDarkMode ? '#ccc' : '#555'}
          value={taskName}
          onChangeText={setTaskName}
        />
        <TextInput
          style={[styles.taskDescriptionInput, isDarkMode ? styles.darkText : styles.lightText]}
          placeholder="Task Description"
          placeholderTextColor={isDarkMode ? '#ccc' : '#555'}
          value={taskDescription}
          onChangeText={setTaskDescription}
          multiline={true}
        />
      </View>

      <View style={styles.priorityContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Priority:</Text>
        <TouchableOpacity onPress={() => setPriority('High')} style={[styles.priorityButton, priority === 'High' ? styles.highPriority : null]}>
          <Text style={styles.priorityText}>High</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPriority('Medium')} style={[styles.priorityButton, priority === 'Medium' ? styles.mediumPriority : null]}>
          <Text style={styles.priorityText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPriority('Low')} style={[styles.priorityButton, priority === 'Low' ? styles.lowPriority : null]}>
          <Text style={styles.priorityText}>Low</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={saveTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>{editingTaskId ? 'Update Task' : 'Add Task'}</Text>
      </TouchableOpacity>

      <View style={styles.boxContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('TasksScreen', { tasks: todos })}
          style={[styles.box, styles.tasksBox]}
        >
          <Text style={styles.boxTitle}>Tasks (Total: {todos.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToNotes}
          style={[styles.box, styles.noticeBox]}
        >
          <Text style={styles.boxTitle}>setNotes</Text>
          <Text>All notices will be displayed here.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 20, // Added spacing for better layout
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  combinedInputContainer: {
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
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  darkInput: {
    borderColor: '#444',
    backgroundColor: '#333',
  },
  lightInput: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  priorityButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  highPriority: {
    backgroundColor: '#ff9999',
  },
  mediumPriority: {
    backgroundColor: '#ffcc99',
  },
  lowPriority: {
    backgroundColor: '#99ff99',
  },
  priorityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#62b4e4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  darkText: {
    color: 'white',
  },
  lightText: {
    color: 'black',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    elevation: 2,
    height: 150,
  },
  tasksBox: {
    backgroundColor: '#62b4e4',
  },
  noticeBox: {
    backgroundColor: '#f7a8a3',
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Homescreen;
