import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splashscreen from './Component/Splashscreen';
import WelcomeScreen from './Component/Welcomescreen';
import Homescreen from './Component/Homescreen';
import TaskDetailScreen from './Component/TaskDetailScreen';
import TasksScreen from './Component/TasksScreen';
import TaskDetail from './Component/TaskDetail';




const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splashscreen" component={Splashscreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
           <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: true }} />
           <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} options={{ headerShown: true }} />
            <Stack.Screen name="TaskDetail" component={TaskDetail} options={{ headerShown: true }} />
                        <Stack.Screen name="TasksScreen" component={TasksScreen} options={{ headerShown: true }} />
           
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
