import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <Button
        title="Go to Main Page"
        onPress={() => router.push('/main')}
      />
      <Button
        title="Sign Up"
        onPress={() => alert("Sign-up functionality here")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
