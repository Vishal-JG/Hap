import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Community from './Community';
import CommunityThread from './CommunityThread';

export type CommunityStackParamList = {
  CommunityHome: undefined;
  CommunityThread: { topic: string };
};

const Stack = createNativeStackNavigator<CommunityStackParamList>();

const CommunityStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#121212' },
      headerTintColor: '#EDEDED',
      headerTitleStyle: { fontSize: 18, fontWeight: '600' },
    }}
  >
    <Stack.Screen
      name="CommunityHome"
      component={Community}
      options={{ title: 'Community' }}
    />
    <Stack.Screen
      name="CommunityThread"
      component={CommunityThread}
      options={({ route }) => ({
        title: route.params.topic,
      })}
    />
  </Stack.Navigator>
);

export default CommunityStack;
