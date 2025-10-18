import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventBox from '../components/EventBox';


const handlePress = () => {
  alert('Component pressed!');
  // Add more logic here
};

const Events = () => {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView>
        <EventBox
          image="https://placekitten.com/400/200"
          title="Music Festival"
          location="Central Park, NY"
          date ="Sat, July 20th"
          time="7 PM"
          onPress={handlePress} 
        />
        <EventBox
          image="https://placekitten.com/400/200"
          title="Party"
          location="Unga ootla"
          date ="Sat, July 20th"
          time="7 PM"
          onPress={handlePress} 
        />
        <EventBox
          image="https://placekitten.com/400/200"
          title="Party"
          location="namma ootla"
          date ="Saturday"
          time="7 PM"
          onPress={handlePress} 
        />
        <EventBox
          image="https://placekitten.com/400/200"
          title="Music Festival"
          location="Central Park, NY"
          date ="Sat, July 20th"
          time="7 PM"
          onPress={handlePress} 
        />
        <EventBox
          image="https://placekitten.com/400/200"
          title="Music Festival"
          location="Central Park, NY"
          date ="Sat, July 20th"
          time="7 PM"
          onPress={handlePress} 
        />
        <EventBox
          image="https://placekitten.com/400/200"
          title="Music Festival"
          location="Central Park, NY"
          date ="Sat, July 20th"
          time="7 PM"
          onPress={handlePress} 
        />
        <EventBox
          image="https://placekitten.com/400/200"
          title="Music Festival"
          location="Central Park, NY"
          date ="Sat, July 20th"
          time="7 PM"
          onPress={handlePress} 
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Events;
