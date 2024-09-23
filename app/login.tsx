import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { PrivyProvider, useLoginWithEmail } from "@privy-io/expo";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  
  const { state, sendCode, loginWithCode } = useLoginWithEmail({
    onLoginSuccess: (user, isNewUser) => {
      // Navigate to the main page on successful login
      router.push("/(app_drawer)/main");
    },
    onError: (error) => {
      // Handle the error (you can show an alert or a message)
      alert(error.message);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          inputMode="email"
          style={styles.input}
        />
        <Button
          title="Send Code"
          disabled={state.status === "sending-code"}
          onPress={() => sendCode({ email })}
        />
        {state.status === "sending-code" && (
          <Text style={styles.loadingText}>Sending Code...</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder="Code"
          style={styles.input}
        />
        <Button
          title="Login"
          disabled={state.status !== "awaiting-code-input"}
          onPress={() => loginWithCode({ code, email, disableSignup: true })}
        />
        {state.status === 'submitting-code' && (
          <ActivityIndicator size="small" color="#0000ff" />
        )}
      </View>
      {state.status === 'error' && (
        <Text style={styles.errorText}>{state.error?.message || "An error occurred."}</Text>
      )}
      <Button title="Sign Up" onPress={() => alert("Sign-up functionality here")} />
    </View>
  );
};

const LoginWrapper: React.FC = () => {
  const appId = process.env.EXPO_PUBLIC_PRIVY_APP_ID;
  const clientId = process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID;

  if (!appId || !clientId) {
    throw new Error("Privy appId or clientId is not defined in the environment variables.");
  }

  return (
    <PrivyProvider appId={appId} clientId={clientId}>
      <LoginScreen />
    </PrivyProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loadingText: {
    textAlign: "center",
    color: "#666",
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginWrapper;
