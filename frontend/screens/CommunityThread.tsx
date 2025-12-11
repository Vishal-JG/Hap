import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CommunityPost from '../components/CommunityPost';

type Props = {
  route: { params: { topic: string } };
};

const CommunityThread: React.FC<Props> = ({ route }) => {
  const { topic } = route.params;
  const [votes, setVotes] = useState(0);

  const handlePress = () => {
    Alert.alert('Post pressed');
  };

  const handleUpvote = () => {
    setVotes((v) => v + 1);
  };

  const handleDownvote = () => {
    setVotes((v) => v - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Discussion: {topic}</Text>

        <CommunityPost
      image="https://placekitten.com/400/200"
      title="Music Festival"
      location="Central Park, NY"
      date="Sat, July 20th"
      time="7 PM"
      votes = {10}
      onPress={handlePress}
      user = "John"
    />
    <CommunityPost
      image="https://placekitten.com/400/201"
      title="Street Food Crawl"
      location="Chinatown"
      date="Sun, July 21st"
      time="6 PM"
      votes={32}
      onPress={handlePress}
      user = "Peter"
    />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  subtitle: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 16,
  },
});

export default CommunityThread;
