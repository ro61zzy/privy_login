// app/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import { PrivyProvider } from '@privy-io/expo';

const Layout: React.FC = () => {
  const appId = process.env.EXPO_PUBLIC_PRIVY_APP_ID;
  const clientId = process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID;

  // // Check if the appId and clientId exist, otherwise throw an error
  // if (!appId || !clientId) {
  //   throw new Error("Privy appId or clientId is not defined in the environment variables.");
  // }

  return (
    <PrivyProvider appId={appId} clientId={clientId}>
      <Stack />
    </PrivyProvider>
  );
};

export default Layout;
