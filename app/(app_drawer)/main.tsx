import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useEmbeddedWallet, isConnected, getUserEmbeddedWallet } from "@privy-io/expo";
import { usePrivy } from "@privy-io/expo";


const MainScreen: React.FC = () => {

  const wallet = useEmbeddedWallet();
  const { user } = usePrivy();
  const account = getUserEmbeddedWallet(user);

  const walletAddress = account ? account.address : "No wallet address";
  const walletBalance = isConnected(wallet) ? "Fetching balance..." : "Wallet not connected";

  // Here you should call a function to fetch the balance from your blockchain
  // For demonstration purposes, this is just a placeholder

  return (
    <View style={styles.container}>
      <Drawer.Screen
        options={{
          headerShown: true,
          title: "Home",
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <Text style={styles.title}>Welcome to the main page of the app!</Text>
      <Text>Wallet Address: {walletAddress}</Text>
      <Text>Wallet Balance: {walletBalance}</Text>
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

export default MainScreen;
