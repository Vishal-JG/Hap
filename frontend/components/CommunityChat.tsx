import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

type CommunityChatProps = { 
  title: string | React.ReactNode; 
  onPress?: () => void;
};

const CommunityChat: React.FC<CommunityChatProps> = ({ title, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.box,
      pressed && styles.pressedContainer,
    ]}
  >
    {typeof title === 'string' ? (
      <Text style={styles.title}>{title}</Text>
    ) : (
      title
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,               
    backgroundColor: '#1C1C1C',     
    padding: 16,                    
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#00FFC6',         
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    color: '#EDEDED',               
    fontSize: 18,
    fontWeight: '600',              
    marginBottom: 6,
  },
  pressedContainer: {
    shadowOpacity: 0.8,             
    transform: [{ scale: 0.98 }],
    backgroundColor: '#181818',
  },
});

export default CommunityChat;
