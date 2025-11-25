import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/Home/Dashboard/Dashboard";
import PatientDetailScreen from "../screens/Home/PatientDetailScreen/PatientDetailScreen";
import PatientFormScreen from "../screens/Home/PatientFormScreen/PatientFormScreen";
import PatientListScreen from "../screens/Home/PatientListScreen/PatientListScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const HomeScreens = [
    {
      name: "Home",
      component: Dashboard,
      headerShown: false,
    },
    {
      name: "PatientList",
      component: PatientListScreen,
      headerShown: true,
    },
    {
      name: "PatientForm",
      component: PatientFormScreen,
      headerShown: false,
    },
    {
      name: "PatientDetail",
      component: PatientDetailScreen,
      headerShown: false,
    },
  ];

  return (
    <Stack.Navigator initialRouteName="Home">
      {HomeScreens.map((data, index) => (
        <Stack.Screen
          key={index}
          name={data.name}
          component={data.component}
          options={{
            headerShown: data.headerShown ?? false,
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
