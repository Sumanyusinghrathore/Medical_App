import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Hospital = {
  id: number;
  name: string;
  city: string;
};

type Props = {
  hospitals: Hospital[];
  selectedHospitalId: number | null;
  onChange: (id: number | null) => void;
  showPlaceholder?: boolean;
  error?: string;
};

const HospitalPicker: React.FC<Props> = ({
  hospitals,
  selectedHospitalId,
  onChange,
  showPlaceholder = false,
  error,
}) => {
  const hasError = !!error;
  const handleChange = (value: number | string) => {
    if (value === '' || value === null) {
      onChange(null);
    } else {
      onChange(Number(value));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Hospital *</Text>
      <View
        style={[
          styles.dropdownWrapper,
          hasError && styles.dropdownError,
        ]}
      >
        <Picker
          selectedValue={selectedHospitalId ?? ''}
          onValueChange={handleChange}
          dropdownIconColor="#374151"
        >
          {showPlaceholder && (
            <Picker.Item
              label="-- Select Hospital --"
              value=""
              color="#9ca3af"
            />
          )}
          {hospitals.map(h => (
            <Picker.Item
              key={h.id}
              label={`${h.name} (${h.city})`}
              value={h.id}
              color="#111827"
            />
          ))}
        </Picker>
      </View>

      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default HospitalPicker;

const styles = StyleSheet.create({
  container: { marginBottom: 18 },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  dropdownWrapper: {
    borderWidth: 1.3,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    backgroundColor: '#f9fafb',
    overflow: 'hidden',
  },
  dropdownError: {
    borderColor: '#DC2626',
  },
  errorText: {
    marginTop: 4,
    fontSize: 11,
    color: '#DC2626',
  },
});
