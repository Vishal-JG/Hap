import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommunityThread = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thread title here</Text>
      {/* later: list of posts with upvotes/downvotes */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  title: {
    color: '#EDEDED',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default CommunityThread;
