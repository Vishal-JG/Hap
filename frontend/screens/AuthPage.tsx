import React, { useState, useEffect, FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signUp, signIn, getUser } from '../auth/auth';

interface SignupLoginPageProps {
  onAuthSuccess?: () => void;
}

const SignupLoginPage: FC<SignupLoginPageProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getUser().then(({ user, error }) => {
      if (error) {
        console.error('Error getting user:', error);
      }
      if (user) onAuthSuccess && onAuthSuccess();
    });
  }, [onAuthSuccess]);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');

    if (mode === 'signup') {
      const { error } = await signUp(email, password);
      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Check your email to verify your account before logging in.');
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setMessage(error.message);
      } else {
        onAuthSuccess && onAuthSuccess();
      }
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>
          {mode === 'signup' ? 'Create your Hap account' : 'Welcome back'}
        </Text>

        <View style={styles.formContainer}>
          <TextInput
            autoFocus
            style={styles.input}
            value={email}
            placeholder="Email"
            placeholderTextColor="#666666"
            onChangeText={setEmail}
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.button}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Processing…' : mode === 'signup' ? 'Sign Up' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>

        {message.length > 0 && <Text style={styles.message}>{message}</Text>}

        <View style={styles.switchModeRow}>
          {mode === 'signup' ? (
            <Text style={styles.switchModeText}>
              Already have an account?{' '}
              <Text style={styles.link} onPress={() => setMode('login')}>
                Login
              </Text>
            </Text>
          ) : (
            <Text style={styles.switchModeText}>
              New here?{' '}
              <Text style={styles.link} onPress={() => setMode('signup')}>
                Sign Up
              </Text>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',        // global background
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#1C1C1C',        // card surface
    borderRadius: 24,
    padding: 24,
    shadowColor: '#00FFC6',            // teal glow
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 18,
    elevation: 10,
  },
  header: {
    color: '#EDEDED',
    fontSize: 24,
    fontWeight: '600',                 // Rubik medium/semibold
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    gap: 12,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,255,198,0.5)', // subtle neon border
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#EDEDED',
    backgroundColor: '#121212',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#00FFC6',       // primary neon teal
    borderRadius: 999,                // pill‑shaped
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#00FFC6',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    marginTop: 10,
    color: '#FF6F61',                 // coral for errors/info
    textAlign: 'center',
    fontSize: 13,
  },
  switchModeRow: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchModeText: {
    color: '#AAAAAA',
    fontSize: 13,
  },
  link: {
    color: '#00FFC6',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default SignupLoginPage;
