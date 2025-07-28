import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../styles';

function Layout({ children, style, safeAreaEdges = ['top', 'bottom'] }) {
  return (
    <SafeAreaView style={[styles.container, style]} edges={safeAreaEdges}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={theme.colors.background}
        translucent={false}
      />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default Layout;