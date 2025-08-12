import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { theme } from './styles';

// Import screens
import TabNavigator from './navigation/TabNavigator';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import BookingScreen from './pages/BookingScreen';
import PaymentScreen from './pages/PaymentScreen';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LanguageProvider>
          <AuthProvider>
            <NavigationContainer>
              <StatusBar 
                barStyle="light-content" 
                backgroundColor={theme.colors.background}
                translucent={false}
              />
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: theme.colors.cardBackground,
                    borderBottomColor: theme.colors.accent,
                    borderBottomWidth: 1,
                  },
                  headerTintColor: theme.colors.textPrimary,
                  headerTitleStyle: {
                    fontFamily: theme.typography.fontFamily.bold,
                    fontSize: theme.typography.fontSize.lg,
                  },
                  cardStyle: {
                    backgroundColor: theme.colors.background,
                  },
                }}
              >
                <Stack.Screen 
                  name="Main" 
                  component={TabNavigator} 
                  options={{ headerShown: false }}
                />
                <Stack.Screen 
                  name="Login" 
                  component={LoginScreen}
                  options={{ title: 'Sign In' }}
                />
                <Stack.Screen 
                  name="Register" 
                  component={RegisterScreen}
                  options={{ title: 'Sign Up' }}
                />
                <Stack.Screen 
                  name="Booking" 
                  component={BookingScreen}
                  options={{ title: 'Book Guide' }}
                />
                <Stack.Screen 
                  name="Payment" 
                  component={PaymentScreen}
                  options={{ title: 'Payment' }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
        </LanguageProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;