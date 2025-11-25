import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useApp, navigationStateType } from '../../context/AppContext';
import LabeledInput from '../../components/Inputs/LabeledInput';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

type Props = NativeStackScreenProps<any>;

const LoginScreen: React.FC<Props> = () => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('12345678');
  const { setUserData, setNavigationState } = useApp();

  const handleLogin = async () => {
    if (email === 'admin@gmail.com' && password === '12345678') {
      const user = { id: 1, name: 'Admin User', email: 'admin@gmail.com' };
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      setUserData(user);
      setNavigationState(navigationStateType.HOME);
      Alert.alert('Success', 'Login Successful!');
    } else {
      Alert.alert('Error', 'Invalid email or password!');
    }
  };

  const isDisabled = !email || !password;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.appName}>Medical App</Text>
          <Text style={styles.appTagline}>Manage your patients in one place</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome back 👋</Text>
          <Text style={styles.cardSubtitle}>Login to continue</Text>

          <LabeledInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <LabeledInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <PrimaryButton
            title="Login"
            onPress={handleLogin}
            disabled={isDisabled}
            variant="primary"
          />
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} Medical App • All rights reserved
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2ff',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  appName: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1d4ed8',
    letterSpacing: 0.5,
  },
  appTagline: {
    marginTop: 6,
    fontSize: 13,
    color: '#6b7280',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  cardSubtitle: {
    marginTop: 4,
    marginBottom: 18,
    fontSize: 13,
    color: '#6b7280',
  },
  footerText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 11,
    color: '#9ca3af',
  },
});
