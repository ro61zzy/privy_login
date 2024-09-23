import React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";


const GetStartedScreen: React.FC = () => {
  const router = useRouter();

  

  return (
  
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Drawer.Screen
        options={{
          headerShown: false,
          title: "Welcome Page",
          // headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the App!</Text>
        <Button title="Get Started" onPress={() => router.push("/login")} />
      </View>
    </SafeAreaView>
   
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

export default GetStartedScreen;
