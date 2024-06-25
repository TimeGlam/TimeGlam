import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as StoreProvider, useSelector } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import store from "./src/store";
import { useFonts } from "expo-font";
import theme from "./src/styles/theme.json";
import Home from "./src/pages/Home/index";
import Principal from "./src/pages/Principal/index";
import Agendamentos from "./src/pages/Agendamentos/index";
import Login from "./src/pages/Login/index";
import CadastroUsuario from "./src/pages/CadastroUsuario/index";

// Criação do Stack Navigator para cada tela
const PrincipalStack = createStackNavigator();

const PrincipalStackScreen = () => (
  <PrincipalStack.Navigator>
    <PrincipalStack.Screen
      name="PrincipalScreen"
      component={Principal}
      options={{ headerShown: false }}
    />
    <PrincipalStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
  </PrincipalStack.Navigator>
);

const AgendamentosStackScreen = () => (
  <PrincipalStack.Navigator>
    <PrincipalStack.Screen
      name="AgendamentosScreen"
      component={Agendamentos}
      options={{ headerShown: false }}
    />
    <PrincipalStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
  </PrincipalStack.Navigator>
);

// Criação do Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Principal") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Agendamentos") {
          iconName = focused ? "calendar" : "calendar-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: theme.colors.primary,
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
);

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Signup"
      component={CadastroUsuario}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Main"
      component={MainTabs}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

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
            <AuthStackScreen />
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </GestureHandlerRootView>
  );
};

export default App;
