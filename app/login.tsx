import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useLoginWithEmail } from "@privy-io/expo";

const LoginScreen: React.FC = () => {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const { state, sendCode, loginWithCode } = useLoginWithEmail();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <View>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          inputMode="email"
        />

        <Button
          title="Send Code"
          disabled={state.status === "sending-code"}
          onPress={() => sendCode({ email })}
        />

        {state.status === "sending-code" && (
          //  Shows only while the code is sending
          <Text>Sending Code...</Text>
        )}
      </View>
      <View>
        <TextInput onChangeText={setCode} />
        <Button
          title="Login"
          // Keeps button disabled until the code has been sent
          disabled={state.status !== "awaiting-code-input"}
          onPress={() => loginWithCode({ code })}
        />
      </View>
      <Button title="Go to Main Page" onPress={() => router.push("/main")} />
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
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default LoginScreen;
