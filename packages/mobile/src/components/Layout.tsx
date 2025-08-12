import React, { ReactNode } from 'react';
import { View, StyleSheet, StatusBar, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { theme } from '../styles';

interface LayoutProps {
  children: ReactNode;
  style?: ViewStyle;
  safeAreaEdges?: Edge[];
}

interface Styles {
  container: ViewStyle;
}

function Layout({ children, style, safeAreaEdges = ['top', 'bottom'] }: LayoutProps): JSX.Element {
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

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default Layout;