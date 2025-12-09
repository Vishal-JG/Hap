import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Events from '../screens/Events';
import MapScreen from '../screens/MapScreen';
import AIPlanner from '../screens/AIPlanner';
import Mytrips from '../screens/Mytrips';
import ProfileButton from './ProfileButton';
import { Ionicons } from '@expo/vector-icons';
import CommunityStack from '../screens/CommunityStack';

const Tab = createBottomTabNavigator();

interface MyTabsProps {
  onSignOut: () => void;
}

const MyTabs: React.FC<MyTabsProps> = ({ onSignOut }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => <ProfileButton onSignOut={onSignOut} />,
        tabBarIcon: ({ color }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Events') iconName = 'calendar-outline';
          else if (route.name === 'Maps') iconName = 'map-outline';
          else if (route.name === 'AIPlanner') iconName = 'sparkles-outline';
          else if (route.name === 'Community') iconName = 'people-outline';
          else iconName = 'briefcase-outline'; // Mytrips

          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: '#00FFC6',
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarStyle: {
          backgroundColor: '#1C1C1C',
          borderTopColor: 'rgba(255,255,255,0.1)',
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
      })}
    >
      <Tab.Screen
        name="Events"
        component={Events}
        options={{ title: 'Haps' }}
      />
      <Tab.Screen
        name="Maps"
        component={MapScreen}
        options={{ title: 'Map' }}
      />
      <Tab.Screen
        name="AIPlanner"
        component={AIPlanner}
        options={{ title: 'AI Planner' }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityStack}   // <-- use the stack here
        options={{ title: 'Finds', headerShown: false }}
      />
      <Tab.Screen
        name="Mytrips"
        component={Mytrips}
        options={{ title: 'My Trips' }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
