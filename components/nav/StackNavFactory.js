import React from "react";
import Home from "../../screens/Home";
import Search from "../../screens/Search";
import Profile from "../../screens/Profile";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const StackNavFactory = ({ screenName }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
          shadowColor: "rgba(255,255,255,0.5)",
        },
        headerTintColor: "white",
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen name={"SHome"} component={Home} />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen
          name={"SSearch"}
          component={Search}
          options={{
            headerTitle: () => (
              <Image
                style={{ width: 120 }}
                resizeMode="contain"
                source={require("../../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Profile" ? (
        <Stack.Screen name={"SProfile"} component={Profile} />
      ) : null}
    </Stack.Navigator>
  );
};

export default StackNavFactory;
