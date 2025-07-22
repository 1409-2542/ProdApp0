import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { logout } = useAuth(); // Get logout function from AuthContext

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Productivity App!</Text>
      <Button 
        title="Logout" 
        onPress={logout} // Will redirect back to AuthScreen
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});