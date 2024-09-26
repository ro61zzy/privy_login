import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
  const [network, setNetwork] = useState<string | null>(null);
  const [networkSwitched, setNetworkSwitched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch balance and network when wallet is connected or network is switched
  const fetchBalanceAndNetwork = async () => {
    if (isConnected(wallet)) {
      try {
        const accounts = await wallet.provider.request({
          method: 'eth_requestAccounts',
        });

        const balanceHex = await wallet.provider.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest'],
        });

        const networkId = await wallet.provider.request({
          method: 'eth_chainId',
        });
        console.log("Network ID:", networkId);

        // Convert balance from Wei to Ether
        const balanceInEther = parseFloat(balanceHex) / 10 ** 18; 
        setBalance(balanceInEther.toFixed(4)); 
        setNetwork(networkId);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance('Error fetching balance');
      } finally {
        setLoading(false);
      }
    }
  };


  // Function to switch to Sepolia
  const switchToSepolia = async () => {
    try {
      if (isConnected(wallet)) {
        await wallet.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID
        });
        setNetworkSwitched(true); // Trigger re-fetch after network switch
        setErrorMessage('');
        console.log('Switched to Sepolia!');
      } else {
        setErrorMessage('Wallet not connected.');
      }
    } catch (error) {
      console.error('Error switching to Sepolia:', error);
      setErrorMessage('Failed to switch to Sepolia.');
    }
  };

  const walletBalance = loading ? "Fetching balance..." : `${balance} ETH`;

    // Fetch balance and network initially
    useEffect(() => {
      fetchBalanceAndNetwork();
    }, [ walletBalance, networkSwitched]);  // Re-fetch when wallet changes or network is switched
  

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
      <Text>Network ID: {network} (Current Network)</Text>

      {/* Button to switch to Sepolia */}
      <Button title="Switch to Sepolia" onPress={switchToSepolia} />

      {networkSwitched ? (
        <Text style={styles.successText}>Successfully switched to Sepolia!</Text>
      ) : null}

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
<Text>

      {walletBalance}
</Text>
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
  successText: {
    color: 'green',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default MainScreen;
