import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native'; // Add these imports
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { checkOnboardingStatus } from '../services/dbService';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user } = useAuth();
  const [isNewUser, setIsNewUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        if (user) {
          const status = await checkOnboardingStatus(user.uid);
          setIsNewUser(!status);
        }
      } catch (error) {
        console.error("Onboarding check error:", error);
        setIsNewUser(true); // Default to onboarding if check fails
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading your preferences...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : isNewUser ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;