import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Box, TextInput, Title } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
const moment = require("moment");
import {
  allEstabelecimentos,
  updateForm,
} from "../../store/modules/salao/actions";

const HeaderPrincipal = () => {
  const dispatch = useDispatch();
  const { cliente, form, estabelecimentos } = useSelector(
    (state) => state.estabelecimento
  );

  const hoje = moment().format("DD/MM/YYYY");

  useEffect(() => {
    dispatch(allEstabelecimentos());
  }, []);

  return (
    <>
      <Box background="light" direction="column" spacing="30px 0 0" hasPadding>
        <Title>Seja bem vindo! {cliente.nome} </Title>
        <Title small>Hoje é: {hoje} 📅</Title>
      </Box>
      <Box background="light" direction="column" spacing="10px 0 0" hasPadding>
        <Title small>Estabelecimentos ({estabelecimentos.length})</Title>
        <TextInput
          value={form.inputFiltro}
          onChangeText={(value) => dispatch(updateForm("inputFiltro", value))}
          onFocus={() => dispatch(updateForm("inputFiltroFoco", true))}
          onBlur={() => dispatch(updateForm("inputFiltroFoco", false))}
          placeholder="Digite o nome do estabelecimento..."
        />
      </Box>
    </>
  );
};

export default HeaderPrincipal;
