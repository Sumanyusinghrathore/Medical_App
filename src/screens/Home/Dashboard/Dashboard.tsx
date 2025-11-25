import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import { useApp, navigationStateType } from '../../../context/AppContext';

type Props = NativeStackScreenProps<any>;

const Dashboard: React.FC<Props> = ({ navigation }) => {
  const [filterText, setFilterText] = useState('');
  const { setUserData, setNavigationState } = useApp();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('userData');
          setUserData(null);
          setNavigationState(navigationStateType.AUTH);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Dashboard"
        showLogout
        onLogoutPress={handleLogout}
      />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>Medical Dashboard</Text>
            <Text style={styles.appTagline}>
              Quickly manage emergency & regular patients
            </Text>
          </View>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>Admin</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.card, styles.statsCard]}>
            <Text style={styles.cardLabel}>Total Patients</Text>
            <Text style={styles.cardValue}>24</Text>
            <Text style={styles.cardHint}>Including OPD & Emergency</Text>
          </View>

          <View style={[styles.card, styles.statsCard, styles.emergencyCard]}>
            <Text style={styles.cardLabel}>Emergency</Text>
            <Text style={styles.cardValue}>5</Text>
            <Text style={styles.cardHint}>Accidental / Critical cases</Text>
          </View>
        </View>

        {/* Action Cards */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.card, styles.actionCard]}
            onPress={() => navigation.navigate('PatientList')}
            activeOpacity={0.9}
          >
            <View style={styles.actionIconWrapper}>
              <Text style={styles.actionIcon}>📋</Text>
            </View>
            <Text style={styles.actionTitle}>Patient List</Text>
            <Text style={styles.actionDesc}>
              View all registered patients with status & hospital details.
            </Text>
            <Text style={styles.actionLink}>Open List →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.actionCard, styles.actionCardGreen]}
            onPress={() => navigation.navigate('PatientForm')}
            activeOpacity={0.9}
          >
            <View
              style={[styles.actionIconWrapper, styles.actionIconWrapperGreen]}
            >
              <Text style={styles.actionIcon}>➕</Text>
            </View>
            <Text style={styles.actionTitle}>Add New Patient</Text>
            <Text style={styles.actionDesc}>
              Register accidental / emergency or regular cases in a few steps.
            </Text>
            <Text style={styles.actionLink}>Create Record →</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.footerText}>
          Designed for triage & emergency coordination •{' '}
          {new Date().getFullYear()}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef2ff' },
  scroll: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1d4ed8',
  },
  appTagline: {
    marginTop: 4,
    fontSize: 13,
    color: '#6b7280',
    maxWidth: 260,
  },
  roleBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  roleText: {
    fontSize: 11,
    color: '#0369a1',
    fontWeight: '600',
  },

  // Cards base
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  // Stats cards
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statsCard: {
    flex: 1,
  },
  emergencyCard: {
    backgroundColor: '#fef2f2',
  },
  cardLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  cardHint: {
    marginTop: 4,
    fontSize: 11,
    color: '#6b7280',
  },

  // Action cards
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  actionCard: {
    flex: 1,
  },
  actionCardGreen: {
    backgroundColor: '#ecfdf5',
  },
  actionIconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIconWrapperGreen: {
    backgroundColor: '#dcfce7',
  },
  actionIcon: {
    fontSize: 18,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  actionLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
  },

  // Filter / form card
  filterCard: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 4,
  },
  inputInner: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f9fafb',
  },
  placeholderLike: {
    fontSize: 13,
  },
  placeholderVisible: {
    color: '#9ca3af',
  },
  placeholderHidden: {
    color: 'transparent',
  },

  filterButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  smallButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButtonPrimary: {
    backgroundColor: '#2563eb',
  },
  smallButtonGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  smallButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  smallButtonGhostText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '500',
  },

  footerText: {
    marginTop: 18,
    fontSize: 11,
    textAlign: 'center',
    color: '#9ca3af',
  },
});
