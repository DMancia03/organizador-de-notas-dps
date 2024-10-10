import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import react from 'react';
import VerNotas from './src/screens/VerNotas';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <VerNotas/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20
  },
});
