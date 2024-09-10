// TaskDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const TaskDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.taskName}>{task.taskName}</Text>
      <Text style={styles.taskDescription}>{task.taskDescription}</Text>
      <Text style={styles.priority}>{task.priority}</Text>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  taskName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskDescription: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  priority: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskDetailScreen;
