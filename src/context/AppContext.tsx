import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define navigation state types
export const navigationStateType = {
  HOME: 'HOME',
  AUTH: 'AUTH',
  LOADING: 'LOADING',
} as const;

type NavigationStateType =
  (typeof navigationStateType)[keyof typeof navigationStateType];

interface UserData {
  id?: number;
  name?: string;
  token?: string;
}

// Define the context value type
interface AppContextType {
  userData: UserData | null;
  navigationState: NavigationStateType;
  setNavigationState: React.Dispatch<React.SetStateAction<NavigationStateType>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  configuration: any;
  updateConfiguration: React.Dispatch<React.SetStateAction<any>>;
}

// Create the context with a default value
const App = createContext<AppContextType | undefined>(undefined);

// Define props for the AppContext provider component
interface AppContextProps {
  children: ReactNode;
}

const AppContext: React.FC<AppContextProps> = ({children}) => {
  const [navigationState, setNavigationState] = useState<NavigationStateType>(
    navigationStateType.LOADING,
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [configuration, updateConfiguration] = useState<any>(null);

  // Save user data whenever it changes + update navigation state
  useEffect(() => {
    const saveDetail = async () => {
      try {
        if (userData) {
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          setNavigationState(navigationStateType.HOME);
        } else {
          await AsyncStorage.removeItem('userData');
          if (navigationState !== navigationStateType.LOADING) {
            setNavigationState(navigationStateType.AUTH);
          }
        }
      } catch (error) {
        console.log('Error saving user data:', error);
      }
    };

    saveDetail();
  }, [userData, navigationState]);

  return (
    <App.Provider
      value={{
        userData,
        navigationState,
        setNavigationState,
        setUserData,
        updateConfiguration,
        configuration,
      }}>
      {children}
    </App.Provider>
  );
};

// Custom hook to use the App context
export const useApp = (): AppContextType => {
  const context = useContext(App);
  if (!context) {
    throw new Error('useApp must be used within an AppContext provider');
  }
  return context;
};

export default AppContext;
