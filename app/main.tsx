import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Page</Text>
      <Text>Welcome to the main page of the app!</Text>
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
