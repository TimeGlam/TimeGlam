import React, { useState, useEffect } from "react";
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

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigation.navigate("Main");
    }
  }, [token]);

  useEffect(() => {
    setErrorText("");
  }, [email, password]);

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
