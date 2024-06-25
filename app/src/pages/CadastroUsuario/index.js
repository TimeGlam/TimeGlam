import React, { useState } from "react";
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
import DropDown from "react-native-paper-dropdown";
import { View, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    dataNascimento: new Date(),
    genero: "",
    documento: {
      tipo: "cpf",
      numero: "",
    },
    endereco: {
      pais: "br",
    },
  });
  const [errorText, setErrorText] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleDocumentChange = (field, value) => {
    setFormData({
      ...formData,
      documento: {
        ...formData.documento,
        [field]: value,
      },
    });
  };

  const handleSignup = () => {
    const { nome, email, telefone, senha, dataNascimento, genero, documento } =
      formData;

    if (
      !nome.trim() ||
      !email.trim() ||
      !telefone.trim() ||
      !senha.trim() ||
      !dataNascimento ||
      !genero.trim() ||
      !documento.numero.trim()
    ) {
      setErrorText("Por favor, preencha todos os campos.");
      return;
    }

    dispatch(signupRequest(formData));
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Container>
      <TitleText style={{ width: 200 }}>Cadastro ✨</TitleText>
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
          placeholder="Digite seu nome"
          autoCorrect={false}
          value={formData.nome}
          onChangeText={(value) => handleInputChange("nome", value)}
        />
        <StyledTextInput
          placeholder="Digite seu email"
          autoCorrect={false}
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        <StyledTextInput
          placeholder="Digite seu telefone"
          autoCorrect={false}
          value={formData.telefone}
          onChangeText={(value) => handleInputChange("telefone", value)}
        />
        <StyledTextInput
          placeholder="Digite sua senha"
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
          value={formData.senha}
          onChangeText={(value) => handleInputChange("senha", value)}
        />

        {/* Botão para abrir o DateTimePicker */}

        <Text>Data de Nascimento</Text>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.light,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginTop: 10,
            borderWidth: 1,
            borderColor: "black",
          }}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: "black", fontSize: 16 }}>
            {formatDate(formData.dataNascimento)}
          </Text>
        </TouchableOpacity>
        {/* Renderização condicional do DateTimePicker */}
        {showDatePicker && (
          <DateTimePicker
            label={"nascimento"}
            value={formData.dataNascimento}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || formData.dataNascimento;
              setFormData({ ...formData, dataNascimento: currentDate });
              setShowDatePicker(false);
            }}
          />
        )}

        <View style={{ width: "100%", marginVertical: 8 }}>
          <DropDown
            mode="outlined"
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={formData.genero}
            setValue={(value) => handleInputChange("genero", value)}
            list={[
              { label: "Escolha o gênero", value: "" },
              { label: "Masculino", value: "M" },
              { label: "Feminino", value: "F" },
              { label: "Outro", value: "O" },
            ]}
          />
        </View>

        <StyledTextInput
          placeholder="Digite seu CPF"
          autoCorrect={false}
          value={formData.documento.numero}
          onChangeText={(value) => handleDocumentChange("numero", value)}
        />
      </InputView>
      <ButtonView>
        <Button onPress={handleSignup} buttonColor={theme.colors.primary}>
          {loading ? "Carregando..." : "Cadastrar"}
        </Button>
      </ButtonView>
      <FooterText>
        Já tem uma conta?{" "}
        <SignupText onPress={() => navigation.navigate("Login")}>
          Entrar
        </SignupText>
      </FooterText>
    </Container>
  );
};

export default Signup;
