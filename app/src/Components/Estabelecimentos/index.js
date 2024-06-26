import React from "react";
import {
  Text,
  Box,
  Button,
  CustomImageBackground,
  Spacer,
  Touchable,
} from "../../styles";
import theme from "../../styles/theme.json";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  updateAgendamento,
  getEstabelecimento,
  allServicos,
} from "../../store/modules/salao/actions";
import { useDispatch, useSelector } from "react-redux";

const Estabelecimentos = ({ navigation, item }) => {
  const dispatch = useDispatch();
  const { cliente } = useSelector((state) => state.estabelecimento);

  return (
    <Touchable
      align="center"
      hasPadding
      height="100px"
      background="light"
      onPress={() => {
        dispatch(getEstabelecimento(item._id));
        dispatch(allServicos(item._id));
        dispatch(
          updateAgendamento({
            estabelecimentoId: item._id,
          })
        );
        dispatch(
          updateAgendamento({
            clienteId: cliente._id,
          })
        );
        navigation.navigate("Estabelecimento");
      }}
    >
      {item?.foto ? (
        <CustomImageBackground
          source={{
            uri: item.foto,
          }}
        />
      ) : (
        <Icon name="image" size={40} /> // Ícone padrão quando não houver foto
      )}
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

export default Estabelecimentos;
