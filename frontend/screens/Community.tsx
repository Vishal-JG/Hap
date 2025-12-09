import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommunityChat from '../components/CommunityChat';


const handlePress = () => {
  alert('Component pressed!');
  // Add more logic here
};

const Community = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
    <ScrollView>
      <CommunityChat title="Sports" onPress={handlePress} />
      {/* more CommunityChat components */}
      <CommunityChat title="Music Festival" onPress={handlePress} />
      {/* more CommunityChat components */}
      <CommunityChat title="Foodies" onPress={handlePress} />
      {/* more CommunityChat components */}
      <CommunityChat title="Snake Show" onPress={handlePress} />
      {/* more CommunityChat components */}
    </ScrollView>
  </SafeAreaView>
);

export default Community;