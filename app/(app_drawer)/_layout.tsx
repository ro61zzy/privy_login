// app/_layout.tsx

import React from "react";
import { Stack } from "expo-router";
import { PrivyProvider } from "@privy-io/expo";
// import { getEnv } from 'expo-env';
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import CustomDrawer from "../../components/CustomDrawer";

const Layout: React.FC = () => {
  const appId = process.env.EXPO_PUBLIC_PRIVY_APP_ID;
  const clientId = process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID;

  // Check if the appId and clientId exist, otherwise throw an error
  if (!appId || !clientId) {
    throw new Error(
      "Privy appId or clientId is not defined in the environment variables."
    );
  }

  return (
    <PrivyProvider appId={appId} clientId={clientId}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            // width: 230,
          },
          headerStyle: {
            //  backgroundColor: "#9dbd9d", // Set your desired background color
            // height: 10, // Set the custom height for the header
            justifyContent: "center", // Center content vertically
          },
          headerTitleStyle: {
            fontWeight: "bold",
            // fontSize: 18, // Adjust font size as needed
            color: "#000",
          },
          headerTintColor: "red",
          drawerLabelStyle: {
            color: "#000",
          },
        }}
      >
        <Drawer.Screen
          name="get_started"
          options={{
            headerShown: false,
            drawerLabel: "Get Started",
          }}
        />
        <Drawer.Screen
          name="login"
          options={{
            headerShown: false,
            drawerLabel: "Login",
          }}
        />
        <Drawer.Screen
          name="main"
          options={{
            headerShown: false,
            drawerLabel: "Main",
          }}
        />
      </Drawer>
    </PrivyProvider>
  );
};

export default Layout;
