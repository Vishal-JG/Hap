import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import MyTabs from './components/NavBar';
import './styles/tailwind.css';
import AuthPage from './screens/AuthPage';
import SplashScreen from './screens/SplashScreen';
import { signOut } from './auth/auth';

const HapTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#121212',
    card: '#121212',
    text: '#EDEDED',
  },
};

export default function App() {
  // ONLY HOOKS HERE
  const [authenticated, setAuthenticated] = useState(true); // force logged-in for now
  const [showSplash] = useState(false);                     // disable splash for now

  const [fontsLoaded] = useFonts({
    Rubik: require('./assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  // NO useEffect AT ALL HERE

  const handleSignOut = async () => {
    await signOut();
    setAuthenticated(false);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!authenticated) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
        <AuthPage onAuthSuccess={() => setAuthenticated(true)} />
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <NavigationContainer theme={HapTheme}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
          <MyTabs onSignOut={handleSignOut} />
        </SafeAreaView>
      </NavigationContainer>
      <StatusBar style="light" backgroundColor="#121212" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
