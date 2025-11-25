import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { launchImageLibrary } from 'react-native-image-picker';

type Props = {
  label?: string;
  value?: string;
  onChange: (uri: string) => void;
};

const ImagePickerField: React.FC<Props> = ({ label = 'Patient Photo', value, onChange }) => {
  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.6,
    });

    if (result && result.assets && result.assets[0]?.uri) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {value ? (
        <Image source={{ uri: value }} style={styles.image} />
      ) : (
        <Text style={styles.helper}>No image selected</Text>
      )}

      <PrimaryButton
        title={value ? 'Change Photo' : 'Upload Photo'}
        onPress={handlePickImage}
        variant="outline"
        style={{ marginTop: 8, alignSelf: 'flex-start' }}
        textStyle={{ fontSize: 14 }}
      />
    </View>
  );
};

export default ImagePickerField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  helper: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 6,
  },
});
