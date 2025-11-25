import React, { createContext, useContext, useState, ReactNode } from 'react';
import hospitalsData from '../data/hospitals.json';
import patientsData from '../data/patients.json';

export type LocationType = {
  latitude: number;
  longitude: number;
};

export type Hospital = {
  id: number;
  name: string;
  city: string;
};

export type Patient = {
  id: number;
  name: string;
  age: number;
  isEmergency: boolean;
  condition: string;
  hospitalId: number;
  photoUri?: string;
  location?: LocationType;
};

type PatientsContextType = {
  patients: Patient[];
  hospitals: Hospital[];
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  getHospitalById: (id: number) => Hospital | undefined;
};

const PatientsContext = createContext<PatientsContextType | undefined>(
  undefined
);

export const PatientsProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useState<Patient[]>(patientsData as Patient[]);
  const [hospitals] = useState<Hospital[]>(hospitalsData as Hospital[]);

  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      ...patient,
      id: patients.length ? patients[patients.length - 1].id + 1 : 1,
    };
    setPatients(prev => [...prev, newPatient]);
  };

  const getHospitalById = (id: number) =>
    hospitals.find(h => h.id === id);

  return (
    <PatientsContext.Provider
      value={{ patients, hospitals, addPatient, getHospitalById }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = () => {
  const ctx = useContext(PatientsContext);
  if (!ctx) {
    throw new Error('usePatients must be used inside PatientsProvider');
  }
  return ctx;
};
