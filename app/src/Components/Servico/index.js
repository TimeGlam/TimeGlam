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
} from "../../store/modules/salao/actions";
import { useDispatch } from "react-redux";

const Servico = ({ item }) => {
  const dispatch = useDispatch();

  // console.log("item servico: ", item);

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
        dispatch(updateAgendamento({ servicoId: item?._id }));
        dispatch(filterAgenda());
      }}
    >
      <CustomImageBackground
        source={{
          uri: item?.arquivos
            ? `${util.AWS.bucketURL}/${item?.arquivos[0]?.arquivo}`
            : "",
        }}
      />
      <Box direction="column">
        <Text bold color="dark">
          {item?.titulo}
        </Text>
        <Spacer />
        <Text small>
          R$ {item?.preco} • {formatDuration(item?.duracao)}
        </Text>
      </Box>
      <Box direction="column" align="flex-end">
        <Button
          icon="clock-check-outline"
          background="success"
          buttonColor={theme.colors.primary}
          mode="contained"
        >
          AGENDAR
        </Button>
      </Box>
    </Touchable>
  );
};

export default Servico;
