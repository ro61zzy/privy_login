// entrypoint.js

// Import required polyfills first
import 'fast-text-encoding';
import 'react-native-get-random-values';
import '@ethersproject/shims';


// Import dotenv to load environment variables
import 'dotenv/config';


// Then import the expo router
import 'expo-router/entry';