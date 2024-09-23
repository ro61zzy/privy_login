import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Drawer } from "expo-router/drawer";

import { DrawerToggleButton } from "@react-navigation/drawer";

const MainScreen: React.FC = () => {
  return (
    <View style={styles.container}>
       {/* <Drawer.Screen
        options={{
          headerShown: true,
          title: "Home",
          headerLeft: () => <DrawerToggleButton />,
        }}
      /> */}
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
