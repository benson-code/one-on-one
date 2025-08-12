import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import { theme } from '../styles';
import { useAuth } from '../context/AuthContext';

// Import screens
import HomeScreen from '../pages/HomeScreen';
import GuidesScreen from '../pages/GuidesScreen';
import CustomerDashboardScreen from '../pages/CustomerDashboardScreen';
import GuideDashboardScreen from '../pages/GuideDashboardScreen';
import ProfileScreen from '../pages/ProfileScreen';

const Tab = createBottomTabNavigator();

interface TabIconProps {
  name: string;
  color: string;
  size: number;
}

function TabIcon({ name, color, size }: TabIconProps): React.JSX.Element {
  return <Icon name={name} size={size} color={color} />;
}

function TabNavigator(): React.JSX.Element {
  const { isAuthenticated, user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.cardBackground,
          borderTopColor: theme.colors.accent,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamily.medium,
          fontSize: theme.typography.fontSize.xs,
          marginTop: 4,
        },
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
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '探索',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="search" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      
      <Tab.Screen
        name="Guides"
        component={GuidesScreen}
        options={{
          title: '導遊',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="users" color={color} size={size} />
          ),
        }}
      />

      {isAuthenticated && (
        <Tab.Screen
          name="Dashboard"
          component={user?.userType === 'guide' ? GuideDashboardScreen : CustomerDashboardScreen}
          options={{
            title: '儀表板',
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="grid" color={color} size={size} />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: isAuthenticated ? '個人檔案' : '帳戶',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;