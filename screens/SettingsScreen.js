import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const SettingsScreen = () => {
  const { user, logout } = useAuth();

  const resetOnboarding = async () => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        onboardingComplete: false
      });
      alert('Onboarding will show next time you login');
    } catch (error) {
      console.error("Error resetting onboarding:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <TouchableOpacity 
          style={styles.optionButton}
          onPress={resetOnboarding}
        >
          <Text style={styles.optionText}>Redo Onboarding</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  optionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#444',
  },
  logoutButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff4444',
    alignItems: 'center',
  },
  logoutText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingsScreen;