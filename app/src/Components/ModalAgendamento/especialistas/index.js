import React from "react";
import { useDispatch } from "react-redux";
import { updateForm } from "../../../store/modules/salao/actions";
import { Box, Text, CustomImageBackground, Button } from "../../../styles/";
import theme from "../../../styles/theme.json";

export default function EspecialistasPicker({ colaboradores, agendamento }) {
  const dispatch = useDispatch();
  const colaborador = colaboradores.filter((c) => {
    if (c._id === agendamento.colaboradorId) {
      // console.log("colaborador", c);
      return true;
    }
    return false;
  })[0];

  // console.log("filter colaborador", colaborador);

  return (
    <>
      <Box hasPadding removePaddingBottom direction="column">
        <Text bold color="dark">
          Gostaria de trocar o(a) especialista?
        </Text>
        <Box spacing="20px 0 0" align="center" height="50px">
          <Box align="center">
            <CustomImageBackground
              width="45px"
              height="45px"
              circle
              source={{ uri: colaborador?.foto }}
            />
            <Text small>{colaborador?.nome}</Text>
          </Box>
          <Box>
            <Button
              uppercase={false}
              onPress={() => dispatch(updateForm("modalEspecialista", true))}
              buttonColor={theme.colors.primary}
              mode="contained"
              block
            >
              Trocar Especialista
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
