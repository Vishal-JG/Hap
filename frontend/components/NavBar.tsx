import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Events from '../screens/Events';
import MapScreen from '../screens/MapScreen';
import AIPlanner from '../screens/AIPlanner';
import Community from '../screens/Community';
import Mytrips from '../screens/Mytrips';
import ProfileButton from './ProfileButton'; // Adjust import path as needed

const Tab = createBottomTabNavigator();

interface MyTabsProps {
  onSignOut: () => void;
}

const MyTabs: React.FC<MyTabsProps> = ({ onSignOut }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => <ProfileButton onSignOut={onSignOut} />, // Button always at top right
      }}
    >
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Maps" component={MapScreen} />
      <Tab.Screen name="AIPlanner" component={AIPlanner} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Mytrips" component={Mytrips} />
    </Tab.Navigator>
  );
};

export default MyTabs;
