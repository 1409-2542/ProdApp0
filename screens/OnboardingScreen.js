import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { completeOnboarding } from '../services/dbService';
import { useAuth } from '../contexts/AuthContext';

export default function OnboardingScreen({ navigation }) {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    theme: 'light',
    dailyReminder: true,
    // Add other onboarding preferences
  });

const handleComplete = async () => {
  try {
    await completeOnboarding(user.uid, preferences);
  } catch (error) {
    alert('Failed to save preferences: ' + error.message);
  }
};

  return (
    <View style={styles.container}>
      <Text>Welcome! Let's set up your preferences</Text>
      {/* Add your onboarding UI components here */}
      <Button title="Finish Setup" onPress={handleComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});