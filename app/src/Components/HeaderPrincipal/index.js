import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Box, TextInput, Title } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import {
  allEstabelecimentos,
  updateForm,
} from "../../store/modules/salao/actions";

const HeaderPrincipal = () => {
  const dispatch = useDispatch();
  const { estabelecimento, form, estabelecimentos } = useSelector(
    (state) => state.estabelecimento
  );

  // console.log("estabelecimento", estabelecimento);

  useEffect(() => {
    dispatch(allEstabelecimentos());
  }, []);

  return (
    <>
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
