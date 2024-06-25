import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import * as Location from "expo-location"; // Importar o módulo de localização do Expo
import { storeUserLocation } from "../../store/modules/loginCliente/actions";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const dispatch = useDispatch();

  // Utilizando useMemo para memoizar o seletor
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
      // Após o login bem-sucedido, buscar a localização do usuário
      getLocation();
    }
  }, [token]);

  const handleLogin = () => {
    // Validar campos de entrada
    if (!email.trim()) {
      setErrorText("Por favor, digite seu email.");
      return;
    }

    if (!password.trim()) {
      setErrorText("Por favor, digite sua senha.");
      return;
    }

    // Dispatch da ação de login
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
    } catch (error) {
      console.error("Erro ao obter a localização:", error);
    }
  };

  // Exibir a localização do usuário sempre que houver mudança
  useEffect(() => {
    if (userLocation) {
      console.log("Localização do usuário:", userLocation);
    }
  }, [userLocation]);

  return (
    <Container>
      <TitleText>Entrar</TitleText>
      {error && (
        <FooterText style={{ color: theme.colors.error }}>{error}</FooterText>
      )}
      {errorText ? (
        <FooterText style={{ color: theme.colors.error }}>
          {errorText}
        </FooterText>
      ) : null}
      <InputView>
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
      <ButtonView>
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
  );
};

export default Login;
