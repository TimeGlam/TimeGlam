import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Importe o GestureHandlerRootView

import Home from "./src/pages/Home/index";

import { Provider as StoreProvider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import store from "./src/store";
import { useFonts } from "expo-font";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Ubuntu-Regular": require("./src/assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Medium": require("./src/assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu-Light": require("./src/assets/fonts/Ubuntu-Light.ttf"),
    "Ubuntu-Bold": require("./src/assets/fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-BoldItalic": require("./src/assets/fonts/Ubuntu-BoldItalic.ttf"),
    "Ubuntu-Italic": require("./src/assets/fonts/Ubuntu-Italic.ttf"),
    "Ubuntu-LightItalic": require("./src/assets/fonts/Ubuntu-LightItalic.ttf"),
    "Ubuntu-MediumItalic": require("./src/assets/fonts/Ubuntu-MediumItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Se as fontes estiverem carregadas, retorne o aplicativo
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StoreProvider store={store}>
        <PaperProvider theme={DefaultTheme}>
          <Home />
        </PaperProvider>
      </StoreProvider>
    </GestureHandlerRootView>
  );
};

export default App;
