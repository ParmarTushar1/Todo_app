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
  const navigation = useNavigation();

  const handleCheckBoxChange = (id) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Tasks</Text>
      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('TaskDetail', { task: item })}
            style={styles.todoItem}
          >
            <CheckBox
              value={item.isCompleted}
              onValueChange={() => handleCheckBoxChange(item.id)}
              tintColors={{ true: '#007BFF', false: '#bbb' }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.todoText, item.isCompleted ? styles.completedText : null]}>
                {item.taskName}
              </Text>
              <Text style={styles.todoDescription}>
                {item.taskDescription}
              </Text>
              <Text style={styles.priorityText}>{item.priority}</Text>
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
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
    color: '#333',
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
});

export default TasksScreen;
