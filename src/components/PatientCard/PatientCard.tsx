import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Patient, Hospital } from '../../context/PatientsContext';
import { COLORS } from '../../constants';

type Props = {
  patient: Patient;
  hospital?: Hospital;
  onPress?: () => void;
};

const PatientCard: React.FC<Props> = ({ patient, hospital, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.row}>
        {patient.photoUri ? (
          <Image source={{ uri: patient.photoUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>
              {patient.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{patient.name}</Text>
          <Text style={styles.info}>Age: {patient.age}</Text>
          <Text style={styles.info}>
            {patient.isEmergency ? 'Emergency / Accidental Case' : 'Regular Case'}
          </Text>
          <Text style={styles.condition} numberOfLines={2}>
            {patient.condition}
          </Text>
          {hospital && (
            <Text style={styles.hospital}>
              Hospital: {hospital.name} ({hospital.city})
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PatientCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  row: { flexDirection: 'row' },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  avatarPlaceholder: {
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  info: {
    fontSize: 12,
    color: '#6b7280',
  },
  condition: {
    fontSize: 12,
    color: '#374151',
    marginTop: 4,
  },
  hospital: {
    fontSize: 12,
    color: '#2563eb',
    marginTop: 4,
  },
});
