import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type EventBoxProps = {
  image: string;
  location: string;
  time: string;
  title: string;
};

const EventBox: React.FC<EventBoxProps> = ({ image, location, time, title }) => (
  <View style={styles.box}>
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.location}>{location}</Text>
    <Text style={styles.time}>{time}</Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,
    backgroundColor: '#d3eaffff',
    padding: 16,
    marginVertical: 30,
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
  time: {
    color: '#888'
  }
});

export default EventBox;
