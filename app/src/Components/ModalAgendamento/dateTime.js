import React from "react";
import { FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { updateAgendamento } from "../../store/modules/salao/actions";
import { Box, Title, Text, Touchable } from "../../styles";
import util from "../../util";
import theme from "../../styles/theme.json";
import moment from "moment/min/moment-with-locales";
moment.locale("pt-br");

const DateTime = ({
  servico,
  agenda,
  dataSelecionada,
  horaSelecionada,
  horariosDisponiveis,
}) => {
  const dispatch = useDispatch();

  const setAgendamentoData = (value, isTime = false) => {
    const { horariosDisponiveis } = util.selectAgendamento(
      agenda,
      isTime ? dataSelecionada : value
    );

    let data = !isTime
      ? `${value}T${horariosDisponiveis[0][0]}`
      : `${dataSelecionada}T${value}`;
    dispatch(updateAgendamento({ data }));
  };

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
    <>
      <Text bold color="dark" hasPadding>
        Pra quando você gostaria de agendar?
      </Text>
      <FlatList
        data={agenda}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 0,
        }}
        contentContainerStyle={{
          paddingLeft: 20,
          height: 85,
        }}
        renderItem={({ item }) => {
          const date = moment(Object.keys(item)[0]);
          const dateISO = moment(date).format("YYYY-MM-DD");
          const selected = dateISO === dataSelecionada;

          return (
            <Touchable
              key={dateISO}
              width="70px"
              height="80px"
              spacing="0 10px 0 0"
              background={selected ? "primary" : "light"}
              rounded="10px"
              direction="column"
              justify="center"
              align="center"
              border={`1px solid ${util.toAlpha(theme.colors.muted, 20)}`}
              onPress={() => setAgendamentoData(dateISO)}
            >
              <Text small color={selected ? "light" : undefined}>
                {util.diasSemana[date.day()]}
              </Text>
              <Title small color={selected ? "light" : undefined}>
                {date.format("DD")}
              </Title>
              <Text small color={selected ? "light" : undefined}>
                {date.format("MMMM")}
              </Text>
            </Touchable>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <Box hasPadding direction="column" height="60px">
        <Text bold color="dark">
          Que horas?{" "}
          <Text small composed>
            Duração aprox.{" "}
            <Text small underline composed>
              {formatDuration(servico?.duracao)}
            </Text>
          </Text>
        </Text>
      </Box>
      <FlatList
        data={horariosDisponiveis}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 0,
        }}
        contentContainerStyle={{
          paddingLeft: 20,
          height: 80,
        }}
        renderItem={({ item, index }) => (
          <Box direction="column" spacing="0 10px 0 0">
            {item.map((horario) => {
              const selected = horario === horaSelecionada;
              return (
                <Touchable
                  key={horario}
                  width="100px"
                  height="35px"
                  spacing="0 0 5px 0"
                  background={selected ? "primary" : "light"}
                  rounded="7px"
                  direction="column"
                  justify="center"
                  align="center"
                  border={`1px solid ${util.toAlpha(theme.colors.muted, 20)}`}
                  onPress={() => setAgendamentoData(horario, true)}
                >
                  <Text color={selected ? "light" : undefined}>{horario}</Text>
                </Touchable>
              );
            })}
          </Box>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default DateTime;
