import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const NoteDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { note, onUpdateNote, onDeleteNote } = route.params;

  const [noteText, setNoteText] = useState(note.text);
  const [isItemAdded, setIsItemAdded] = useState(note.text.trim().length > 0);

  useMemo(() => {
    setNoteText(note.text);
    setIsItemAdded(note.text.trim().length > 0);
  }, [note]);

  useMemo(() => {
    setIsItemAdded(noteText.trim().length > 0);
  }, [noteText]);

  const handleSave = () => {
    if (noteText.trim().length > 0) {
      onUpdateNote({ ...note, text: noteText });
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isItemAdded && (
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        style={styles.textInput}
        value={noteText}
        onChangeText={text => {
          setNoteText(text);
        }}
        multiline
        placeholder="Type your note here"
        textAlignVertical="top"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-start', // Align children to the top
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align header content to the right
    marginBottom: 10,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Set text color to blue
  },
  textInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    textAlignVertical: 'top', // Ensure text starts from the top of the input
  },
});

export default NoteDetailScreen;
