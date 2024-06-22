import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "./src/pages/Home/index";
import Principal from "./src/pages/Principal/index";
import Agendamentos from "./src/pages/Agendamentos/index";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as StoreProvider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import store from "./src/store";
import { useFonts } from "expo-font";

// Criação do Stack Navigator para cada tela
const PrincipalStack = createStackNavigator();

const PrincipalStackScreen = () => (
  <PrincipalStack.Navigator>
    <PrincipalStack.Screen
      name="PrincipalScreen"
      component={Principal}
      options={{ headerShown: false }} // Ocultar o header
    />
    <PrincipalStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }} // Ocultar o header
    />
  </PrincipalStack.Navigator>
);

const AgendamentosStackScreen = () => (
  <PrincipalStack.Navigator>
    <PrincipalStack.Screen
      name="AgendamentosScreen"
      component={Agendamentos}
      options={{ headerShown: false }} // Ocultar o header
    />
    <PrincipalStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }} // Ocultar o header
    />
  </PrincipalStack.Navigator>
);

// Criação do Bottom Tab Navigator
const Tab = createBottomTabNavigator();

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StoreProvider store={store}>
        <PaperProvider theme={DefaultTheme}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Principal") {
                    iconName = focused ? "home" : "home-outline";
                  } else if (route.name === "Agendamentos") {
                    iconName = focused ? "list" : "list-outline";
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: [{ display: "flex" }, null],
              })}
            >
              <Tab.Screen
                name="Principal"
                component={PrincipalStackScreen}
                options={{
                  tabBarLabel: "Principal",
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Agendamentos"
                component={AgendamentosStackScreen}
                options={{
                  tabBarLabel: "Agendamentos",
                  headerShown: false,
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </GestureHandlerRootView>
  );
};

export default App;
