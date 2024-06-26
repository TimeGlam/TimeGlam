import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import {
  Button,
  Container,
  TitleText,
  InputView,
  StyledTextInput,
  ButtonView,
  FooterText,
  SignupText,
} from "../../styles";
import theme from "../../styles/theme.json";
import { loginRequest } from "../../store/modules/loginCliente/actions";
import * as Location from "expo-location";
import { storeUserLocation } from "../../store/modules/loginCliente/actions";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const { loading, error, token, userLocation } = useMemo(
    () => authState,
    [authState]
  );

  useEffect(() => {
    setErrorText("");
  }, [email, password]);

  useEffect(() => {
    if (token) {
      getLocation();
    }
  }, [token]);

  const handleLogin = () => {
    if (!email.trim()) {
      setErrorText("Por favor, digite seu email.");
      return;
    }

    if (!password.trim()) {
      setErrorText("Por favor, digite sua senha.");
      return;
    }

    dispatch(loginRequest(email, password));
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      dispatch(
        storeUserLocation(location.coords.latitude, location.coords.longitude)
      );
      navigation.navigate("Main");
    } catch (error) {}
  };

  useEffect(() => {
    if (userLocation) {
      console.log("Localização do usuário:", userLocation);
    }
  }, [userLocation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Container style={{ width: "100%", alignItems: "center" }}>
            <ImageBackground
              source={require("../../assets/imgs/Logo.png")}
              style={{
                width: "100%",
                height: 150,
                marginBottom: 20,
              }}
              resizeMode="contain"
            />

            {errorText ? (
              <FooterText style={{ color: theme.colors.error }}>
                {errorText}
              </FooterText>
            ) : null}
            <InputView style={{ width: "80%" }}>
              <StyledTextInput
                placeholder="Digite seu email"
                autoCorrect={false}
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <StyledTextInput
                placeholder="Digite sua senha"
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
            </InputView>
            <ButtonView style={{ width: "80%" }}>
              <Button onPress={handleLogin} buttonColor={theme.colors.primary}>
                {loading ? "Carregando..." : "Entrar"}
              </Button>
            </ButtonView>
            <FooterText>
              Não tem conta?{" "}
              <SignupText onPress={() => navigation.navigate("Signup")}>
                Cadastre-se
              </SignupText>
            </FooterText>
          </Container>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
