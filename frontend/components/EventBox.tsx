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

const EventBox: React.FC<EventBoxProps> = ({ image, location, date, time, title, onPress }) => (
  <Pressable 
    onPress={onPress} 
    style={({ pressed }) => [
      styles.box,
      pressed ? styles.pressedContainer : null,
    ]}>

      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.date}>{date}</Text> <Text style={styles.time}>{time}</Text>

  </Pressable>
);

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,
    backgroundColor: '#d3eaffff',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 10,
    elevation: 2,
    shadowColor: '#000'
  },
  image: {
    width: '100%',
    height: 30,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  location: {
    color: '#666'
  },
  date: {
    color: '#888'
  },
  time: {
    color: '#888'
  },
  pressedContainer: {
    backgroundColor: '#84b2deff'
  }
});

export default EventBox;
