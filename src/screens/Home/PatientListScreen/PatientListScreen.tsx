import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { usePatients } from '../../../context/PatientsContext';
import PatientCard from '../../../components/PatientCard/PatientCard';
import { COLORS } from '../../../constants';

type Props = NativeStackScreenProps<any>;

const PatientListScreen: React.FC<Props> = ({ navigation }) => {
  const { patients, getHospitalById } = usePatients();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {patients.length === 0 ? (
          <Text style={styles.empty}>No patients added yet.</Text>
        ) : (
          <FlatList
            data={patients}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <PatientCard
                patient={item}
                hospital={getHospitalById(item.hospitalId)}
                onPress={() =>
                  navigation.navigate('PatientDetail', { patient: item })
                }
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default PatientListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  content: { flex: 1, padding: 16 },
  empty: {
    marginTop: 20,
    textAlign: 'center',
    color: '#6b7280',
  },
});
