import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import react from 'react';
import VerNotas from './src/screens/VerNotas';

export default function App() {
  return (
    <View style={styles.container}>
      <VerNotas />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20
  },
});
