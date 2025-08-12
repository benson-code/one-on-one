import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { theme } from '../styles';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  showLogo?: boolean;
  showProfile?: boolean;
}

interface Styles {
  container: ViewStyle;
  logoContainer: ViewStyle;
  logoIcon: ViewStyle;
  logoText: TextStyle;
  logoTitle: TextStyle;
  rightContainer: ViewStyle;
  avatar: ImageStyle;
}

function Header({ showLogo = true, showProfile = true }: HeaderProps): JSX.Element {
  const { isAuthenticated, user } = useAuth();

  return (
    <View style={styles.container}>
      {showLogo && (
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoText}>O</Text>
          </View>
          <Text style={styles.logoTitle}>ONEonone</Text>
        </View>
      )}
      
      <View style={styles.rightContainer}>
        {showProfile && isAuthenticated && user?.avatar && (
          <Image 
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.accent,
    backgroundColor: theme.colors.cardBackground,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  logoText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
  },
  logoTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;