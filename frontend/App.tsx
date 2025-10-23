import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './components/NavBar';
import './styles/tailwind.css';
import AuthPage from './screens/AuthPage';
import SplashScreen from './screens/SplashScreen';
import { getUser, signOut } from './auth/auth'; // your auth functions
import ProfileButton from './components/ProfileButton';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 3000);

    getUser().then(({ user }) => {
      setAuthenticated(!!user);
      setLoading(false);
    });

    return () => clearTimeout(splashTimer);
  }, []);

  const handleSignOut = async () => {
  const { error } = await signOut();
  if (error) {
    alert('Error signing out: ' + error.message);
  } else {
    setAuthenticated(false);
  }
};


  if (showSplash) {
    return <SplashScreen />;
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!authenticated) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AuthPage onAuthSuccess={() => setAuthenticated(true)} />
      </SafeAreaView>
    );
  }

  // Render main app with tabs, pass ProfileButton through nav header via MyTabs or your stack config
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <MyTabs onSignOut={handleSignOut} />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
