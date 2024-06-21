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
} from "../../store/modules/salao/actions";
import { useDispatch } from "react-redux";

const Estabelecimento = ({ navigation, item }) => {
  const dispatch = useDispatch();

  //   console.log("item estabelecimento: ", item);

  function formatDuration(duration) {
    const minutes = parseInt(duration, 10);

    if (isNaN(minutes)) {
      return "Invalid duration";
    }

    if (minutes < 60) {
      return `${minutes} minutos`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours} horas`;
      } else {
        return `${hours} horas e ${remainingMinutes} minutos`;
      }
    }
  }

  return (
    <Touchable
      align="center"
      hasPadding
      height="100px"
      background="light"
      onPress={() => {
        // dispatch(updateEstabelecimento({ _id: item?._id }));
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
