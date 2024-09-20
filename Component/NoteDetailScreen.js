import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const NoteDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { note, onUpdateNote } = route.params;

  const [noteText, setNoteText] = useState(note.text);
  const [isSaveVisible, setIsSaveVisible] = useState(false);

  // Handle changes to noteText to determine when to show "Save"
  useEffect(() => {
    if (noteText.trim() !== note.text.trim() && noteText.trim().length > 0) {
      setIsSaveVisible(true);
    } else {
      setIsSaveVisible(false);
    }
  }, [noteText]);

  const handleSave = () => {
    if (noteText.trim().length > 0) {
      onUpdateNote({ ...note, text: noteText });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={noteText}
        onChangeText={text => setNoteText(text)}
        multiline
        placeholder="Type your note here"
        textAlignVertical="top"
      />
      {isSaveVisible && (
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
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
    backgroundColor: '#f5f5f5',
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
    textAlignVertical: 'top',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 20,  // 20 pixels from the bottom
    right: 20,   // 20 pixels from the right
  },
  saveButton: {
    backgroundColor: '#62b4e4',
   
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default NoteDetailScreen;
