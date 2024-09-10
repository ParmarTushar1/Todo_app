// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Switch,
//   ScrollView,
// } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';

// const Homescreen = () => {
//   const [todos, setTodos] = useState([]);
//   const [taskName, setTaskName] = useState('');  // Separate input for task name
//   const [taskDescription, setTaskDescription] = useState('');  // Separate input for task description
//   const [priority, setPriority] = useState('Medium');
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [editingTaskId, setEditingTaskId] = useState(null);

//   const saveTask = () => {
//     if (taskName.length > 0 && taskDescription.length > 0) {
//       if (editingTaskId) {
//         setTodos(todos.map(todo =>
//           todo.id === editingTaskId
//             ? { ...todo, taskName, taskDescription, priority }
//             : todo
//         ));
//         setEditingTaskId(null);
//       } else {
//         setTodos([...todos, {
//           id: Math.random().toString(),
//           taskName,
//           taskDescription,
//           priority,
//           isCompleted: false,
//         }]);
//       }
//       clearInputs();
//     }
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const editTodo = (todo) => {
//     setTaskName(todo.taskName);
//     setTaskDescription(todo.taskDescription);
//     setPriority(todo.priority);
//     setEditingTaskId(todo.id);
//   };

//   const toggleCompletion = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id
//         ? { ...todo, isCompleted: !todo.isCompleted }
//         : todo
//     ));
//   };

//   const clearInputs = () => {
//     setTaskName('');
//     setTaskDescription('');
//     setPriority('Medium');
//   };

//   const toggleMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <ScrollView contentContainerStyle={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
//       <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>
//         Todo List (Total Tasks: {todos.length})
//       </Text>

//       <View style={styles.modeToggle}>
//         <Text style={isDarkMode ? styles.darkText : styles.lightText}>
//           {isDarkMode ? 'Dark Mode' : 'Light Mode'}
//         </Text>
//         <Switch value={isDarkMode} onValueChange={toggleMode} />
//       </View>

//       {/* Separate inputs for Task Name and Description */}
//       <TextInput
//         style={[styles.taskNameInput, isDarkMode ? styles.darkInput : styles.lightInput]}
//         placeholder="Task Name"
//         placeholderTextColor={isDarkMode ? '#bbb' : '#555'}
//         value={taskName}
//         onChangeText={setTaskName}
//       />
      
//       <TextInput
//         style={[styles.taskDescriptionInput, isDarkMode ? styles.darkInput : styles.lightInput]}
//         placeholder="Task Description"
//         placeholderTextColor={isDarkMode ? '#bbb' : '#555'}
//         value={taskDescription}
//         onChangeText={setTaskDescription}
//         multiline={true}
//       />

//       <View style={styles.priorityContainer}>
//         <Text style={isDarkMode ? styles.darkText : styles.lightText}>Priority:</Text>
//         <TouchableOpacity onPress={() => setPriority('High')} style={[styles.priorityButton, priority === 'High' ? styles.highPriority : null]}>
//           <Text style={styles.priorityText}>High</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setPriority('Medium')} style={[styles.priorityButton, priority === 'Medium' ? styles.mediumPriority : null]}>
//           <Text style={styles.priorityText}>Medium</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setPriority('Low')} style={[styles.priorityButton, priority === 'Low' ? styles.lowPriority : null]}>
//           <Text style={styles.priorityText}>Low</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity onPress={saveTask} style={styles.addButton}>
//         <Text style={styles.addButtonText}>{editingTaskId ? 'Update Task' : 'Add Task'}</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={todos}
//         renderItem={({ item }) => (
//           <View style={styles.todoItem}>
//             <CheckBox
//               value={item.isCompleted}
//               onValueChange={() => toggleCompletion(item.id)}
//             />
//             <View style={{ flex: 1 }}>
//               <Text style={[styles.todoText, item.isCompleted ? styles.completedText : null, isDarkMode ? styles.darkText : styles.lightText]}>
//                 {item.taskName}
//               </Text>
//               <Text style={[styles.todoDescription, isDarkMode ? styles.darkText : styles.lightText]}>
//                 {item.taskDescription}
//               </Text>
//               <Text style={[styles.priorityText, styles[`priority${item.priority}`]]}>{item.priority}</Text>
//             </View>
//             <View style={styles.actions}>
//               <TouchableOpacity onPress={() => editTodo(item)}>
//                 <Text style={styles.editText}>Edit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => deleteTodo(item.id)}>
//                 <Text style={styles.deleteText}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         keyExtractor={item => item.id}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   lightContainer: {
//     backgroundColor: 'white',
//   },
//   darkContainer: {
//     backgroundColor: '#333',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   modeToggle: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   taskNameInput: {
//     height: 40,
//     padding: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     fontSize: 18,
//   },
//   taskDescriptionInput: {
//     height: 100,
//     padding: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     textAlignVertical: 'top',
//     fontSize: 14,
//   },
//   darkInput: {
//     borderColor: '#555',
//     color: 'white',
//   },
//   lightInput: {
//     borderColor: '#ccc',
//     color: 'black',
//   },
//   priorityContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   priorityButton: {
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: '#ddd',
//   },
//   highPriority: {
//     backgroundColor: '#ff9999',
//   },
//   mediumPriority: {
//     backgroundColor: '#ffcc99',
//   },
//   lowPriority: {
//     backgroundColor: '#99ff99',
//   },
//   priorityText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   addButton: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   addButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   todoItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   todoText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     flex: 1,
//   },
//   todoDescription: {
//     fontSize: 14,
//     color: '#555',
//   },
//   completedText: {
//     textDecorationLine: 'line-through',
//   },
//   priorityText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   actions: {
//     flexDirection: 'row',
//   },
//   editText: {
//     color: '#007BFF',
//     marginRight: 10,
//   },
//   deleteText: {
//     color: '#FF4C4C',
//   },
//   priorityHigh: {
//     color: '#ff0000',
//   },
//   priorityMedium: {
//     color: '#ffa500',
//   },
//   priorityLow: {
//     color: '#008000',
//   },
//   darkText: {
//     color: 'white',
//   },
//   lightText: {
//     color: 'black',
//   },
// });

// export default Homescreen;


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Switch,
//   ScrollView,
// } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// const Homescreen = () => {
//   const [todos, setTodos] = useState([]);
//   const [taskName, setTaskName] = useState('');  // Separate input for task name
//   const [taskDescription, setTaskDescription] = useState('');  // Separate input for task description
//   const [priority, setPriority] = useState('Medium');
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [editingTaskId, setEditingTaskId] = useState(null);

//   const navigation = useNavigation(); // Initialize navigation

//   const saveTask = () => {
//     if (taskName.length > 0 && taskDescription.length > 0) {
//       if (editingTaskId) {
//         setTodos(todos.map(todo =>
//           todo.id === editingTaskId
//             ? { ...todo, taskName, taskDescription, priority }
//             : todo
//         ));
//         setEditingTaskId(null);
//       } else {
//         setTodos([...todos, {
//           id: Math.random().toString(),
//           taskName,
//           taskDescription,
//           priority,
//           isCompleted: false,
//         }]);
//       }
//       clearInputs();
//     }
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const editTodo = (todo) => {
//     setTaskName(todo.taskName);
//     setTaskDescription(todo.taskDescription);
//     setPriority(todo.priority);
//     setEditingTaskId(todo.id);
//   };

//   const toggleCompletion = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id
//         ? { ...todo, isCompleted: !todo.isCompleted }
//         : todo
//     ));
//   };

//   const clearInputs = () => {
//     setTaskName('');
//     setTaskDescription('');
//     setPriority('Medium');
//   };

//   const toggleMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <ScrollView contentContainerStyle={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
//       <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>
//         Todo List (Total Tasks: {todos.length})
//       </Text>

//       <View style={styles.modeToggle}>
//         <Text style={isDarkMode ? styles.darkText : styles.lightText}>
//           {isDarkMode ? 'Dark Mode' : 'Light Mode'}
//         </Text>
//         <Switch value={isDarkMode} onValueChange={toggleMode} />
//       </View>

//       {/* Separate inputs for Task Name and Description */}
//       <TextInput
//         style={[styles.taskNameInput, isDarkMode ? styles.darkInput : styles.lightInput]}
//         placeholder="Task Name"
//         placeholderTextColor={isDarkMode ? '#bbb' : '#555'}
//         value={taskName}
//         onChangeText={setTaskName}
//       />
      
//       <TextInput
//         style={[styles.taskDescriptionInput, isDarkMode ? styles.darkInput : styles.lightInput]}
//         placeholder="Task Description"
//         placeholderTextColor={isDarkMode ? '#bbb' : '#555'}
//         value={taskDescription}
//         onChangeText={setTaskDescription}
//         multiline={true}
//       />

//       <View style={styles.priorityContainer}>
//         <Text style={isDarkMode ? styles.darkText : styles.lightText}>Priority:</Text>
//         <TouchableOpacity onPress={() => setPriority('High')} style={[styles.priorityButton, priority === 'High' ? styles.highPriority : null]}>
//           <Text style={styles.priorityText}>High</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setPriority('Medium')} style={[styles.priorityButton, priority === 'Medium' ? styles.mediumPriority : null]}>
//           <Text style={styles.priorityText}>Medium</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setPriority('Low')} style={[styles.priorityButton, priority === 'Low' ? styles.lowPriority : null]}>
//           <Text style={styles.priorityText}>Low</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity onPress={saveTask} style={styles.addButton}>
//         <Text style={styles.addButtonText}>{editingTaskId ? 'Update Task' : 'Add Task'}</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={todos}
//         renderItem={({ item }) => (
//           <TouchableOpacity 
//             onPress={() => navigation.navigate('TaskDetail', { task: item })} // Navigate to TaskDetail screen
//             style={styles.todoItem}
//           >
//             <CheckBox
//               value={item.isCompleted}
//               onValueChange={() => toggleCompletion(item.id)}
//               tintColors={{ true: '#007BFF', false: '#bbb' }} // Set colors for checked and unchecked states
//             />
//             <View style={{ flex: 1 }}>
//               <Text style={[styles.todoText, item.isCompleted ? styles.completedText : null, isDarkMode ? styles.darkText : styles.lightText]}>
//                 {item.taskName}
//               </Text>
//               <Text style={[styles.todoDescription, isDarkMode ? styles.darkText : styles.lightText]}>
//                 {item.taskDescription}
//               </Text>
//               <Text style={[styles.priorityText, styles[`priority${item.priority}`]]}>{item.priority}</Text>
//             </View>
//             <View style={styles.actions}>
//               <TouchableOpacity onPress={() => editTodo(item)}>
//                 <Text style={styles.editText}>Edit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => deleteTodo(item.id)}>
//                 <Text style={styles.deleteText}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         )}
//         keyExtractor={item => item.id}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   lightContainer: {
//     backgroundColor: 'white',
//   },
//   darkContainer: {
//     backgroundColor: '#333',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   modeToggle: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   taskNameInput: {
//     height: 40,
//     padding: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     fontSize: 18,
//   },
//   taskDescriptionInput: {
//     height: 100,
//     padding: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     textAlignVertical: 'top',
//     fontSize: 14,
//   },
//   darkInput: {
//     borderColor: '#555',
//     color: 'white',
//   },
//   lightInput: {
//     borderColor: '#ccc',
//     color: 'black',
//   },
//   priorityContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   priorityButton: {
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: '#ddd',
//   },
//   highPriority: {
//     backgroundColor: '#ff9999',
//   },
//   mediumPriority: {
//     backgroundColor: '#ffcc99',
//   },
//   lowPriority: {
//     backgroundColor: '#99ff99',
//   },
//   priorityText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   addButton: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   addButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   todoItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   todoText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     flex: 1,
//   },
//   todoDescription: {
//     fontSize: 14,
//     color: '#555',
//   },
//   completedText: {
//     textDecorationLine: 'line-through',
//   },
//   priorityText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   actions: {
//     flexDirection: 'row',
//   },
//   editText: {
//     color: '#007BFF',
//     marginRight: 10,
//   },
//   deleteText: {
//     color: '#FF4C4C',
//   },
//   priorityHigh: {
//     color: '#ff0000',
//   },
//   priorityMedium: {
//     color: '#ffa500',
//   },
//   priorityLow: {
//     color: '#008000',
//   },
//   darkText: {
//     color: 'white',
//   },
//   lightText: {
//     color: 'black',
//   },
// });

// export default Homescreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
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

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>
        Todo List
      </Text>

      <View style={styles.modeToggle}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleMode} />
      </View>

      <TextInput
        style={[styles.taskNameInput, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Task Name"
        placeholderTextColor={isDarkMode ? '#bbb' : '#555'}
        value={taskName}
        onChangeText={setTaskName}
      />
      
      <TextInput
        style={[styles.taskDescriptionInput, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Task Description"
        placeholderTextColor={isDarkMode ? '#bbb' : '#555'}
        value={taskDescription}
        onChangeText={setTaskDescription}
        multiline={true}
      />

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
          style={styles.box}
        >
          <Text style={styles.boxTitle}>Tasks (Total: {todos.length})</Text>
        </TouchableOpacity>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Notice Area</Text>
          {/* Add content for Notice Area here */}
          <Text>All notices will be displayed here.</Text>
        </View>
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
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  taskNameInput: {
    height: 40,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 18,
  },
  taskDescriptionInput: {
    height: 100,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  darkInput: {
    borderColor: '#555',
    color: 'white',
  },
  lightInput: {
    borderColor: '#ccc',
    color: 'black',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  priorityButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
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
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  todoDescription: {
    fontSize: 14,
    color: '#555',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  priorityText: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
  },
  editText: {
    color: '#007BFF',
    marginRight: 10,
  },
  deleteText: {
    color: '#FF4C4C',
  },
  priorityHigh: {
    color: '#ff0000',
  },
  priorityMedium: {
    color: '#ffa500',
  },
  priorityLow: {
    color: '#008000',
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
    marginTop: 20,
  },
  box: {
    flex: 1,
    backgroundColor: '#62b4e4',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    elevation: 2,
    height: 150,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Homescreen;
