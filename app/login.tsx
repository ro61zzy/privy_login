import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { PrivyProvider, useLoginWithEmail, useEmbeddedWallet, isNotCreated } from "@privy-io/expo";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step to track whether to show email or code input

  const { sendCode } = useLoginWithEmail();
  const { loginWithCode } = useLoginWithEmail();
  const wallet = useEmbeddedWallet();

  const handleSendCode = async () => {
    setLoading(true);
    try {
      await sendCode({ email });
      Alert.alert("Code sent!", "Check your email for the verification code.");
      setStep(2); // Move to the next step to enter code
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginWithCode({ code, email });
      Alert.alert("Success", "You are now logged in!");

      // Create the wallet if it doesn't exist
      if (isNotCreated(wallet)) {
        await wallet.create({ recoveryMethod: 'privy' });
      }

      router.push('/main'); // Navigate to the home screen
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {step === 1 && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            inputMode="email"
          />
          <Button title="Send Code" onPress={handleSendCode} disabled={loading} />
        </View>
      )}

      {step === 2 && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder="Verification Code"
            inputMode="numeric"
          />
          <Button title="Login" onPress={handleLogin} disabled={loading} />
        </View>
      )}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
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
});

export default LoginWrapper;
