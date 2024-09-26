import React, { useState, useEffect } from 'react';
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

  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected(wallet)) {
        try {
          const accounts = await wallet.provider.request({
            method: 'eth_requestAccounts',
          });

          const balanceHex = await wallet.provider.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest'],
          });

          // Convert the balance from Wei to Ether
          const balanceInEther = parseFloat(balanceHex) / 10 ** 18; // Assuming Ether has 18 decimals
          setBalance(balanceInEther.toFixed(4)); // Format balance to 4 decimal places
        } catch (error) {
          console.error('Error fetching balance:', error);
          setBalance('Error fetching balance');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBalance();
  }, [wallet]);

  const walletBalance = loading ? "Fetching balance..." : `${balance} ETH`;

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
