import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const authScreens = [
    {
      name: "Login",
      component: LoginScreen,
      headerShown: false,
    },
  ];

  return (
    <Stack.Navigator>
      {authScreens.map((data, index) => (
        <Stack.Screen
          key={index}
          name={data.name}
          component={data.component}
          options={() => ({
            headerShown: (data as any)?.headerShown ?? false,
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
