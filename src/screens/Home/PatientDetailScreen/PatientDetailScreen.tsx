import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MapView, { Marker, Region } from 'react-native-maps';

import { usePatients } from '../../../context/PatientsContext';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import { COLORS } from '../../../constants';

type Props = NativeStackScreenProps<any>;

const PatientDetailScreen: React.FC<Props> = ({ route }) => {
  const { patient } = route.params;
  const { getHospitalById } = usePatients();

  if (!patient) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.notFound}>Patient not found.</Text>
        </View>
      </View>
    );
  }

  const hospital = getHospitalById(patient.hospitalId);
  const hasLocation = !!patient.location;

  const region: Region | undefined = hasLocation
    ? {
        latitude: patient.location.latitude,
        longitude: patient.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : undefined;

  return (
    <View style={styles.container}>
      <CustomHeader title="Patient Detail" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Top Card */}
        <View style={styles.card}>
          <View style={styles.headerRow}>
            {patient.photoUri ? (
              <Image source={{ uri: patient.photoUri }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>
                  {patient.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <View style={styles.headerInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{patient.name}</Text>
                <View
                  style={[
                    styles.chip,
                    patient.isEmergency
                      ? styles.chipEmergency
                      : styles.chipRegular,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      patient.isEmergency
                        ? styles.chipTextEmergency
                        : styles.chipTextRegular,
                    ]}
                  >
                    {patient.isEmergency ? 'Emergency' : 'Regular'}
                  </Text>
                </View>
              </View>

              <Text style={styles.infoText}>Age: {patient.age}</Text>
              {hospital && (
                <Text style={styles.infoText}>
                  Hospital:{' '}
                  <Text style={styles.infoHighlight}>{hospital.name}</Text>
                  {hospital.city ? ` • ${hospital.city}` : ''}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Condition</Text>
            <Text style={styles.sectionText}>{patient.condition}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Location</Text>

          {hasLocation && region ? (
            <>
              <View style={styles.coordsRow}>
                <View style={styles.coordItem}>
                  <Text style={styles.coordLabel}>Latitude</Text>
                  <Text style={styles.coordValue}>
                    {patient.location.latitude.toFixed(5)}
                  </Text>
                </View>
                <View style={styles.coordItem}>
                  <Text style={styles.coordLabel}>Longitude</Text>
                  <Text style={styles.coordValue}>
                    {patient.location.longitude.toFixed(5)}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.sectionText}>
              No location captured for this patient.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PatientDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },
  avatarPlaceholder: {
    backgroundColor: '#E0ECFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  chipEmergency: {
    backgroundColor: '#FEE2E2',
  },
  chipRegular: {
    backgroundColor: '#DCFCE7',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  chipTextEmergency: {
    color: '#B91C1C',
  },
  chipTextRegular: {
    color: '#166534',
  },

  infoText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  infoHighlight: {
    color: '#111827',
    fontWeight: '600',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
  },

  coordsRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  coordItem: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  coordLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 2,
  },
  coordValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },

  notFound: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6B7280',
  },
});
