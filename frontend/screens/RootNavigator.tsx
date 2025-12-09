import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from '../components/NavBar';

export type RootStackParamList = {
  Tabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={MyTabs} />
  </Stack.Navigator>
);

export default RootNavigator;
