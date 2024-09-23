// app/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import { PrivyProvider } from '@privy-io/expo';

const Layout: React.FC = () => {
  return (
    <PrivyProvider appId={'insert-your-privy-app-id'} clientId={'insert-your-privy-app-client-id'}>
      <Stack />
    </PrivyProvider>
  );
};

export default Layout;
