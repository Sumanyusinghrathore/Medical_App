export type Patient = {
  id: string;
  name: string;
  age: string;
  medicalCondition: string;
  isEmergency: boolean;
  hospital: string;
  photo?: {
    uri: string;
    fileName?: string;
    type?: string;
  } | null;
  latitude: number;
  longitude: number;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};