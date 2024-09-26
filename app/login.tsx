import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { PrivyProvider, useLoginWithEmail } from "@privy-io/expo";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const { sendCode } = useLoginWithEmail();
  const { loginWithCode } = useLoginWithEmail();

  return (
    <View>
      <Text>Login</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        inputMode="email"
      />

      <Button title="send code" onPress={() => sendCode({ email })} />

      <Text>Login</Text>

      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Code"
        inputMode="numeric"
      />
      <Button
        title="login"
        onPress={() => loginWithCode({ code: code, email: "user@email.com" })}
      />
    </View>
  );
};

const LoginWrapper: React.FC = () => {
  const appId = process.env.EXPO_PUBLIC_PRIVY_APP_ID;
  const clientId = process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID;

  if (!appId || !clientId) {
    throw new Error(
      "Privy appId or clientId is not defined in the environment variables."
    );
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
    color: "red",
    marginTop: 10,
  },
});

export default LoginWrapper;
