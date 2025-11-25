import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS } from '../../constants';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
};

const PrimaryButton: React.FC<Props> = ({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
  fullWidth = true,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const base: ViewStyle = {
      ...styles.buttonBase,
      ...(fullWidth ? { alignSelf: 'stretch' } : {}),
    };

    switch (variant) {
      case 'outline':
        return {
          ...base,
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#2563eb',
          shadowOpacity: 0,
        };
      case 'ghost':
        return {
          ...base,
          backgroundColor: 'transparent',
          shadowOpacity: 0,
        };
      case 'primary':
      default:
        return base;
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'outline':
        return { ...styles.textBase, color: '#2563eb' };
      case 'ghost':
        return { ...styles.textBase, color: '#2563eb' };
      case 'primary':
      default:
        return styles.textBase;
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
    >
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonBase: {
    marginTop: 8,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
    shadowOpacity: 0,
  },
  textBase: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
