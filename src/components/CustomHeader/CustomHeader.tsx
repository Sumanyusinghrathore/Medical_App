import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

type Props = {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  showLogout?: boolean;
  onLogoutPress?: () => void;
};

const CustomHeader: React.FC<Props> = ({
  title,
  showBackButton = false,
  onBackPress,
  showLogout = false,
  onLogoutPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Left: Back Button */}
      <View style={styles.left}>
        {showBackButton && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>{'‹'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.right}>
        {showLogout && (
          <TouchableOpacity
            onPress={onLogoutPress}
            style={styles.logoutButton}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderColor,
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  left: {
    width: 60,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 60,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    color: COLORS.textColor,
    fontFamily: FONTS.AxiformaBold,
    textAlign: 'center',
  },
  backButton: {
    paddingVertical: 4,
    paddingRight: 8,
  },
  backText: {
    fontSize: 26,
    color: COLORS.textColor,
    fontFamily: FONTS.AxiformaBold,
  },
  logoutButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#fee2e2',
  },
  logoutText: {
    fontSize: 12,
    color: '#b91c1c',
    fontFamily: FONTS.AxiformaBold,
    fontWeight: '600',
  },
});
