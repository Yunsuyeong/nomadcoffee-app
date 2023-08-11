import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectShop from "../screens/SelectShop";
import TakeShop from "../screens/TakeShop";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const UploadNav = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
        TabBarIndicatorStyle: { backgroundColor: "red", top: 0 },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "black",
                shadowOpacity: 0.3,
              },
            }}
          >
            <Stack.Screen
              name="Select"
              options={{ title: "Choose a Shop" }}
              component={SelectShop}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakeShop} />
    </Tab.Navigator>
  );
};

export default UploadNav;
