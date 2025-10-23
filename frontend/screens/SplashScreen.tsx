import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen: React.FC = () => {
  useEffect(() => {
    // Normally navigate here, but leave blank or comment if no navigation props
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash-icon.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Hap?</Text>
      <Text style={styles.tagline}>Find joy in every journey</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1e28ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 42,
    color: 'white',
    fontWeight: '700',
  },
  tagline: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    opacity: 0.8,
  },
});

export default SplashScreen;
