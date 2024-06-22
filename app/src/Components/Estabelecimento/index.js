import React from "react";

import {
  Text,
  Box,
  Button,
  CustomImageBackground,
  Spacer,
  Touchable,
} from "../../styles";
import moment from "moment";
import util from "../../util";
import theme from "../../styles/theme.json";
import {
  updateAgendamento,
  filterAgenda,
  resetAgendamento,
  updateEstabelecimento,
  getEstabelecimento,
} from "../../store/modules/salao/actions";
import { useDispatch } from "react-redux";

const Estabelecimento = ({ navigation, item }) => {
  const dispatch = useDispatch();

  //   console.log("item estabelecimento: ", item);

  return (
    <Touchable
      align="center"
      hasPadding
      height="100px"
      background="light"
      onPress={() => {
        dispatch(getEstabelecimento(item._id));
        navigation.navigate("Home");
      }}
    >
      <CustomImageBackground
        source={{
          uri: item?.foto,
        }}
      />
      <Box direction="column">
        <Text bold color="dark">
          {item?.nome}
        </Text>
        <Spacer />
      </Box>
      <Box direction="column" align="flex-end">
        <Button
          icon="clock-check-outline"
          background="success"
          buttonColor={theme.colors.primary}
          mode="contained"
        >
          VISITAR
        </Button>
      </Box>
    </Touchable>
  );
};

export default Estabelecimento;
