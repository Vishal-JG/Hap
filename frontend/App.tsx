import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventBox from './components/EventBox';
import './styles/tailwind.css';

export default function App() {
  return (
    <SafeAreaView>
      <EventBox
        image="https://placekitten.com/400/200"
        title="Music Festival"
        location="Central Park, NY"
        time="Sat, July 20th, 7 PM"  
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

