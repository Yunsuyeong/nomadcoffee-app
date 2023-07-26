import { View } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import LoggedNav from "./navigators/LoggedNav";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    Promise.all([...fontPromises, ...imagePromises]);
  };
  useEffect(() => {
    const preload = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        preloadAssets();
      } catch (err) {
        console.error(err);
      } finally {
        setAppIsReady(true);
      }
    };
    preload();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null;
  }
  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <LoggedNav />
        </NavigationContainer>
      </ApolloProvider>
    </View>
  );
}
