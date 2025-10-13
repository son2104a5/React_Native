// styles/GlobalStyles.ts

import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  text: '#212529',
  background: '#ffffff',
  error: '#dc3545',
};

export const FONT_SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  title: 24,
};

export const SPACING = {
  sm: 8,
  md: 16,
  lg: 24,
};

export const CONTAINER_STYLES = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
});
