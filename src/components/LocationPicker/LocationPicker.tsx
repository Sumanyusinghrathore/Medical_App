import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { LocationType } from '../../context/PatientsContext';

type Props = {
  value?: LocationType;
  onChange: (location: LocationType) => void;
};

const DEFAULT_LOCATION: LocationType = {
  latitude: 28.6139, 
  longitude: 77.2090,
};

const LocationPicker: React.FC<Props> = ({ value, onChange }) => {
  const currentLocation = value ?? DEFAULT_LOCATION;

  const handleUseStaticLocation = () => {
    onChange(DEFAULT_LOCATION);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Patient Location</Text>

      <PrimaryButton
        title="Use Static Location"
        onPress={handleUseStaticLocation}
        variant="outline"
        style={{ alignSelf: 'flex-start' }}
        textStyle={{ fontSize: 14 }}
      />

      <View style={styles.coordsRow}>
        <View style={styles.coordItem}>
          <Text style={styles.coordLabel}>Latitude</Text>
          <Text style={styles.coordValue}>
            {currentLocation.latitude.toFixed(5)}
          </Text>
        </View>
        <View style={styles.coordItem}>
          <Text style={styles.coordLabel}>Longitude</Text>
          <Text style={styles.coordValue}>
            {currentLocation.longitude.toFixed(5)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: { marginTop: 16, marginBottom: 16 },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  coordsRow: {
    flexDirection: 'row',
    marginTop: 12,
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
});
