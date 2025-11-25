import React, { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { COLORS } from "../constants";
import { navigationRef } from "./RootNavigation";
import AuthStack from "./AuthStack";
import { navigationStateType, useApp } from "../context/AppContext";
import Loader from "../components/Loader/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeStack from "./HomeStack";

const MainStack = () => {
  const { navigationState, setNavigationState, setUserData, userData } =
    useApp();

  useEffect(() => {
    const setUserDetail = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (userData && JSON.parse(userData)) {
        setUserData(JSON.parse(userData));
      } else {
        setNavigationState(navigationStateType.AUTH);
      }
    };
    setUserDetail();
  }, []);

  const renderStack = () => {
    switch (navigationState) {
      case navigationStateType.AUTH:
        return <AuthStack />;

      case navigationStateType.HOME:
        return <HomeStack />;

      default:
        return <Loader />;
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
        <StatusBar
          translucent={true}
          backgroundColor={COLORS.MoodyBlue}
        />
        {renderStack()}
    </NavigationContainer>
  );
};

export default MainStack;
