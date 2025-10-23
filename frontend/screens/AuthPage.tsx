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
    getUser().then(({ user }) => {
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
      <Text style={styles.header}>{mode === 'signup' ? 'Sign Up' : 'Login'}</Text>
      <View style={styles.formContainer}>
        <TextInput
          autoFocus
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Processing...' : mode === 'signup' ? 'Sign Up' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>
      {message.length > 0 && <Text style={styles.message}>{message}</Text>}
      <View style={{ marginTop: 20 }}>
        {mode === 'signup' ? (
          <Text>
            Already have an account?{' '}
            <Text style={styles.link} onPress={() => setMode('login')}>Login</Text>
          </Text>
        ) : (
          <Text>
            New here?{' '}
            <Text style={styles.link} onPress={() => setMode('signup')}>Sign Up</Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#000000ff' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 18, alignSelf: 'center', color: 'white'},
  formContainer: { gap: 12, marginBottom: 12, color: 'white' },
  input: { borderWidth: 1, borderColor: '#cccccce1', borderRadius: 6, padding: 10, marginBottom: 10, color:'white' },
  button: { backgroundColor: '#8c4eefb0', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
  message: { marginTop: 8, color: 'red', textAlign: 'center' },
  link: { color: '#007AFF', textDecorationLine: 'underline', textAlign: 'center' }
});

export default SignupLoginPage;
