import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotesScreen = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const addNote = () => {
    if (taskName.trim().length > 0 || taskDescription.trim().length > 0) {
      const combinedNote = `${taskName}\n\n${taskDescription}`;
      setNotes([...notes, { id: Math.random().toString(), text: combinedNote }]);
      setTaskName('');
      setTaskDescription('');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openNoteDetail = (note) => {
    setSelectedNote(note);
    navigation.navigate('NoteDetailScreen', { 
      note,
      onUpdateNote: handleUpdateNote,
      onDeleteNote: handleDeleteNote,
    });
  };

  const handleUpdateNote = useCallback((updatedNote) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
  }, [notes]);

  const handleDeleteNote = useCallback((id) => {
    setNotes(notes.filter(note => note.id !== id));
  }, [notes]);

  const confirmDeleteNote = (note) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            handleDeleteNote(note.id);
            setSelectedNote(null); // Deselect note after deletion
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Notes</Text>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
        </TouchableOpacity>
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
      <ScrollView style={styles.notesContainer}>
        {notes.map(note => (
          <View key={note.id} style={[styles.noteContainer, isDarkMode ? styles.darkNote : styles.lightNote]}>
            <TouchableOpacity onPress={() => openNoteDetail(note)} style={styles.note}>
              <Text style={isDarkMode ? styles.darkText : styles.lightText}>{note.text}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={addNote} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>
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
  notesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  noteContainer: {
    marginBottom: 10,
  },
  note: {
    padding: 10,
    borderBottomWidth: 1,
  },
  lightNote: {
    borderBottomColor: '#ddd',
  },
  darkNote: {
    borderBottomColor: '#444',
  },
  addButton: {
    backgroundColor: '#62b4e4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
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
    color: '#62b4e4',
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

});

export default NotesScreen;