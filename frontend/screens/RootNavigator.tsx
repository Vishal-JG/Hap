import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from '../components/NavBar';

export type RootStackParamList = {
  Tabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootNavigatorProps = {
  onSignOut: () => void;
};

const RootNavigator: React.FC<RootNavigatorProps> = ({ onSignOut }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs">
      {props => <MyTabs {...props} onSignOut={onSignOut} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default RootNavigator;
