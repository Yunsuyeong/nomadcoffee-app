import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabsNav from "./TabsNav";

const Stack = createNativeStackNavigator();

const LoggedNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
    </Stack.Navigator>
  );
};

export default LoggedNav;
