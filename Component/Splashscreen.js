import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const Splashscreen = ({ navigation }) => {

  useEffect(() => {
    fetch('https://user-gateway.test.ideopay.in/api/v1/onload/data')
      .then(response => response.json())
      .then(data => {
        console.log(data);

        const timeout = setTimeout(() => {
          navigation.navigate('WelcomeScreen');
        }, 3000);
        return () => clearTimeout(timeout);
      })
      .catch(error => {
        console.error('Error fetching splash screen data:', error);
      });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('/home/tushar/Desktop/sample/Todo/Component/Assets.img/Todo-icon-hero.png')}
        style={styles.image}
      />
      <Text style={styles.tagline}>Your Tasks, Your Way</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#62b4e4',
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  tagline: {
    marginTop: 5,
    fontSize: 19,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Splashscreen;
