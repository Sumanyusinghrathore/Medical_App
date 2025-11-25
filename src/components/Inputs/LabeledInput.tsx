import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

type Props = {
  label: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  error?: string;
} & TextInputProps;

const LabeledInput: React.FC<Props> = ({
  label,
  value,
  containerStyle,
  inputStyle,
  labelStyle,
  error,
  ...rest
}) => {
  const hasError = !!error;

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>

      <TextInput
        value={value}
        style={[
          styles.input,
          hasError && styles.inputError,
          inputStyle,
        ]}
        placeholderTextColor="#9ca3af"
        {...rest}
      />

      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default LabeledInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.3,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: '#000000',
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  inputError: {
    borderColor: '#DC2626', // red
  },
  errorText: {
    marginTop: 4,
    fontSize: 11,
    color: '#DC2626',
  },
});
