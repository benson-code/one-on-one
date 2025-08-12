import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Layout from '../components/Layout';
import { theme } from '../styles';
import { useAuth } from '../context/AuthContext';

function ProfileScreen({ navigation }) {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      '登出',
      '您確定要登出嗎？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '登出', 
          style: 'destructive',
          onPress: logout 
        }
      ]
    );
  };

  const menuItems = [
    {
      icon: 'user',
      title: '編輯個人檔案',
      onPress: () => navigation.navigate('EditProfile'),
      show: isAuthenticated
    },
    {
      icon: 'credit-card',
      title: '付款方式',
      onPress: () => navigation.navigate('PaymentMethods'),
      show: isAuthenticated
    },
    {
      icon: 'bell',
      title: '通知',
      onPress: () => navigation.navigate('Notifications'),
      show: isAuthenticated
    },
    {
      icon: 'help-circle',
      title: '幫助與支援',
      onPress: () => navigation.navigate('Help'),
      show: true
    },
    {
      icon: 'info',
      title: '關於',
      onPress: () => navigation.navigate('About'),
      show: true
    }
  ];

  const renderMenuItem = (item, index) => {
    if (!item.show) return null;
    
    return (
      <TouchableOpacity
        key={index}
        style={styles.menuItem}
        onPress={item.onPress}
      >
        <View style={styles.menuItemLeft}>
          <Icon name={item.icon} size={20} color={theme.colors.textPrimary} />
          <Text style={styles.menuItemText}>{item.title}</Text>
        </View>
        <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    );
  };

  return (
    <Layout safeAreaEdges={['top', 'bottom']}>
      <View style={styles.container}>
        {isAuthenticated ? (
          <View style={styles.userSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.firstName?.charAt(0) || 'U'}
              </Text>
            </View>
            <Text style={styles.userName}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <View style={styles.userType}>
              <Text style={styles.userTypeText}>
                {user?.userType === 'guide' ? '導遊' : '顧客'}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.guestSection}>
            <Text style={styles.guestTitle}>歡迎來到 ONEonone</Text>
            <Text style={styles.guestSubtitle}>
              登入以存取您的預約和偏好設定
            </Text>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>登入</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerButtonText}>註冊</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.menuSection}>
          {menuItems.map(renderMenuItem)}
        </View>

        {isAuthenticated && (
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Icon name="log-out" size={20} color={theme.colors.error} />
            <Text style={styles.logoutButtonText}>登出</Text>
          </TouchableOpacity>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  userSection: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.cardBackground,
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarText: {
    fontSize: theme.typography.fontSize['2xl'],
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.white,
  },
  userName: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  userType: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  userTypeText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.white,
  },
  guestSection: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.cardBackground,
    marginBottom: theme.spacing.md,
  },
  guestTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  guestSubtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    minWidth: 200,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.white,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
    minWidth: 200,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
  },
  menuSection: {
    backgroundColor: theme.colors.cardBackground,
    marginBottom: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark700,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
  },
  logoutButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.error,
    marginLeft: theme.spacing.sm,
  },
});

export default ProfileScreen;