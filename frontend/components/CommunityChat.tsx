import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

type CommunityChatProps = { title: string; onPress?: () => void;};

const CommunityChat: React.FC<CommunityChatProps> = ({ title, onPress,}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.box,
      pressed && styles.pressedContainer,
    ]}>

    <Text style={styles.title}>{title}</Text>

  </Pressable>
);

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,               // 24px radius
    backgroundColor: '#1C1C1C',     // card surface
    padding: 16,                    // ~16px, use 24 if you want bigger cards
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#00FFC6',         // teal glow
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
    elevation: 6,

  },
  title: {
    color: '#EDEDED',               // high‑contrast white
    fontSize: 18,
    fontWeight: '600',              // Rubik medium/semibold
    marginBottom: 6,
  },
  pressedContainer: {
    shadowOpacity: 0.8,             // stronger glow on press
    transform: [{ scale: 0.98 }],
    backgroundColor: '#181818',
  },
});

export default CommunityChat;
