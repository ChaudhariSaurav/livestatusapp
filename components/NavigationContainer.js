import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import CardComponent from './CardComponent';
import PNRStatusComponent from './PNRStatusComponent';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CardComponent">
        <Stack.Screen name="CardComponent" component={CardComponent} />
        <Stack.Screen name="PNRStatus" component={PNRStatusComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
