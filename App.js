import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import react from 'react';
import VerEtiquetas from './src/screens/VerEtiquetas';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './src/screens/Dashboard';

export default function App() {
  return (
    <NavigationContainer>
      <Dashboard/>
    </NavigationContainer>
  );
}