import * as React from 'react';
import { useState, useEffect, createRef, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Storage from 'expo-storage';

import {ICCalendar, ICItem} from './assets/Icons';
import {Home} from './pages/Home';
import {Sections} from './pages/Sections';
import {Chat} from './pages/Chat';
import {Setup} from './pages/Setup';

function Main({navigation, route}) {
  /*const cookie = route.params.cookie;*/
  useEffect(() => {
      navigation.setOptions({
          headerShown: false 
      });
  });
  //// Setting Profile Data on Start ///////////////////////////////////
  useEffect(()=>{
  }, [navigation]);
  //////////////////////////////////////////////////////////////////////
  
  const Tab = createBottomTabNavigator();
  // https://stackoverflow.com/questions/60439210/how-to-pass-props-to-screen-component-with-a-tab-navigator
  // https://reactnavigation.org/docs/tab-based-navigation/
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              return <ICCalendar width={30} height={30}/>;
            } else if (route.name === 'Activities') {
              return <ICItem width={30} height={30}/>;
            }

            // You can return any component that you like here!
            return <ICItem width={30} height={30}/>;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle:  { height: 60 }
        })}
    >
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Activities" component={Sections}/>
      <Tab.Screen name="ChatGPT" component={Chat}/>
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Setup" component={Setup} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
    {/*<View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>*/}
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
