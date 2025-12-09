import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

type EventBoxProps = {
  image: string;
  location: string;
  date: string;
  time: string;
  title: string;
  onPress?: () => void;
};

const EventBox: React.FC<EventBoxProps> = ({
  image,
  location,
  date,
  time,
  title,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.box,
      pressed && styles.pressedContainer,
    ]}
  >
    <View style={styles.imageWrapper}>
      <Image source={{ uri: image }} style={styles.image} />
    </View>

    <Text style={styles.title}>{title}</Text>

    <View style={styles.metaRow}>
      <Text style={styles.location}>{location}</Text>
    </View>

    <View style={styles.metaRow}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.time}> · {time}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  box: {
    borderRadius: 24,               // 24px radius
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
  imageWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,255,198,0.4)', // subtle neon border
  },
  image: {
    width: '100%',
    height: 140,
  },
  title: {
    color: '#EDEDED',               // high‑contrast white
    fontSize: 18,
    fontWeight: '600',              // Rubik medium/semibold
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  location: {
    color: '#00FFC6',               // neon teal accent
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    color: '#AAAAAA',               // muted text
    fontSize: 13,
  },
  time: {
    color: '#A070FF',               // secondary violet accent
    fontSize: 13,
  },
  pressedContainer: {
    shadowOpacity: 0.8,             // stronger glow on press
    transform: [{ scale: 0.98 }],
    backgroundColor: '#181818',
  },
});

export default EventBox;
