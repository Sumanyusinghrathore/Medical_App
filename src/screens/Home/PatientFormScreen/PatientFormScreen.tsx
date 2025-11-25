import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Switch,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import HospitalPicker from '../../../components/HospitalPicker/HospitalPicker';
import LabeledInput from '../../../components/Inputs/LabeledInput';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import { usePatients, LocationType } from '../../../context/PatientsContext';
import { COLORS } from '../../../constants';

// Static default location (Delhi)
const DEFAULT_LOCATION: LocationType = {
  latitude: 28.6139,
  longitude: 77.2090,
};

type Props = NativeStackScreenProps<any>;

type FormErrors = {
  name?: string;
  age?: string;
  condition?: string;
  hospitalId?: string;
};

const PatientFormScreen: React.FC<Props> = ({ navigation }) => {
  const { hospitals, addPatient } = usePatients();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [condition, setCondition] = useState('');
  const [hospitalId, setHospitalId] = useState<number | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Patient name is required.';
    }
    if (!age.trim()) {
      newErrors.age = 'Age is required.';
    } else {
      const ageNumber = Number(age);
      if (Number.isNaN(ageNumber) || ageNumber <= 0) {
        newErrors.age = 'Please enter a valid age.';
      }
    }
    if (!condition.trim()) {
      newErrors.condition = 'Medical condition is required.';
    }
    if (!hospitalId) {
      newErrors.hospitalId = 'Please select a hospital.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    const ageNumber = Number(age);

    addPatient({
      name: name.trim(),
      age: ageNumber,
      isEmergency,
      condition: condition.trim(),
      hospitalId,
      photoUri: undefined,
      location: DEFAULT_LOCATION,
    });

    // ✅ Show toast
    Toast.show({
      type: 'success',
      text1: 'Patient added successfully',
      text2: 'You can view it in the patient list.',
      position: 'top',
      visibilityTime: 2000,
    });
    navigation.navigate('PatientList');
  };
  const handleChangeName = (text: string) => {
    setName(text);
    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
  };

  const handleChangeAge = (text: string) => {
    setAge(text);
    if (errors.age) setErrors(prev => ({ ...prev, age: undefined }));
  };

  const handleChangeCondition = (text: string) => {
    setCondition(text);
    if (errors.condition) setErrors(prev => ({ ...prev, condition: undefined }));
  };

  const handleChangeHospital = (id: number | null) => {
    setHospitalId(id);
    if (errors.hospitalId) setErrors(prev => ({ ...prev, hospitalId: undefined }));
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Add Patient" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Basic Information</Text>
            <Text style={styles.cardSubtitle}>
              Enter basic patient details below
            </Text>

            <LabeledInput
              label="Patient Name *"
              placeholder="Enter full name"
              value={name}
              onChangeText={handleChangeName}
              error={errors.name}
            />

            <LabeledInput
              label="Age *"
              placeholder="Enter age"
              keyboardType="number-pad"
              value={age}
              onChangeText={handleChangeAge}
              error={errors.age}
            />

            <View style={styles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.switchLabel}>Emergency Case</Text>
                <Text style={styles.switchHelper}>
                  Turn ON if this is an emergency or accident case
                </Text>
              </View>
              <Switch
                value={isEmergency}
                onValueChange={setIsEmergency}
                trackColor={{ false: '#E5E7EB', true: COLORS.primary }}
                thumbColor="#ffffff"
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Medical Details</Text>
            <Text style={styles.cardSubtitle}>
              Describe the current condition
            </Text>

            <LabeledInput
              label="Medical Condition *"
              placeholder="Eg. Fracture, Chest Pain, High BP..."
              value={condition}
              onChangeText={handleChangeCondition}
              multiline
              style={{
                height: 100,
                textAlignVertical: 'top',
                borderColor: COLORS.lightGray2,
                borderWidth: 0.5,
                backgroundColor: COLORS.lightGray,
                borderRadius: 10,
              }}
              error={errors.condition}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Assign Hospital</Text>
            <Text style={styles.cardSubtitle}>
              Select the hospital where patient is admitted
            </Text>

            <HospitalPicker
              hospitals={hospitals}
              selectedHospitalId={hospitalId}
              onChange={handleChangeHospital}
              showPlaceholder
             
            />
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Patient Location</Text>
            <Text style={styles.cardSubtitle}>
              This patient is assigned a static Delhi location
            </Text>

            <View style={styles.coordsRow}>
              <View style={styles.coordItem}>
                <Text style={styles.coordLabel}>Latitude</Text>
                <Text style={styles.coordValue}>
                  {DEFAULT_LOCATION.latitude.toFixed(5)}
                </Text>
              </View>
              <View style={styles.coordItem}>
                <Text style={styles.coordLabel}>Longitude</Text>
                <Text style={styles.coordValue}>
                  {DEFAULT_LOCATION.longitude.toFixed(5)}
                </Text>
              </View>
            </View>
          </View>

          <PrimaryButton
            title="Save Patient"
            onPress={handleSubmit}
            style={styles.saveButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PatientFormScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  content: { padding: 16, paddingBottom: 32 },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    marginBottom: 12,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  switchLabel: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '600',
  },
  switchHelper: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },

  coordsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  coordItem: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
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

  saveButton: {
    marginTop: 8,
    marginBottom: 16,
  },
});
