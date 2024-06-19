import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Linking, Share, ImageBackground } from "react-native";
import {
  Text,
  Title,
  Badge,
  Box,
  Button,
  Touchable,
  TextInput,
  CustomImageBackground,
  GradientView,
} from "../../styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { updateForm } from "../../store/modules/salao/actions";
import theme from "../../styles/theme.json";

const Header = () => {
  const dispatch = useDispatch();
  const { estabelecimento, servicos, form } = useSelector(
    (state) => state.estabelecimento
  );

  const openGps = (coords) => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${coords[0]},${coords[1]}`
    );
  };
  return (
    <>
      <CustomImageBackground
        source={{ uri: estabelecimento.capa }}
        style={{ width: "100%", height: 300 }}
      >
        <GradientView
          hasPadding
          justify="flex-end"
          colors={["#21232F33", "#21232FE6"]}
        >
          <Badge color={estabelecimento.isOpened ? "success" : "danger"}>
            {estabelecimento.isOpened ? "ABERTO" : "FECHADO"}
          </Badge>
          <Title color="light">{estabelecimento.nome}</Title>
          <Text color="light">
            {estabelecimento?.endereco?.cidade} •
            {estabelecimento.distanceLocation}
            kms
          </Text>
        </GradientView>
      </CustomImageBackground>
      <Box background="light" align="center">
        <Box hasPadding justify="space-between">
          <Touchable
            style={{ width: "50px" }}
            direction="column"
            align="center"
            onPress={() => Linking.openURL(`tel:${estabelecimento.telefone}`)}
          >
            <Icon name="phone" size={24} color={theme.colors.muted} />
            <Text small spacing="10px 0 0">
              Ligar
            </Text>
          </Touchable>
          <Touchable
            direction="column"
            align="center"
            style={{ width: "50px" }}
            onPress={() => openGps(estabelecimento?.geo?.coordinates)}
          >
            <Icon name="map-marker" size={24} color={theme.colors.muted} />
            <Text small spacing="10px 0 0">
              Visitar
            </Text>
          </Touchable>
          <Touchable
            direction="column"
            align="center"
            style={{ width: "50px" }}
            onPress={() =>
              Share.share({
                message: `${estabelecimento.nome} - Salão na caralho.`,
              })
            }
          >
            <Icon name="share" size={24} color={theme.colors.muted} />
            <Text small spacing="10px 0 0">
              Enviar
            </Text>
          </Touchable>
        </Box>
        <Box align="center" justify="center" direction="column" hasPadding>
          <Button
            icon="clock-check-outline"
            background="success"
            mode="contained"
            uppercase={false}
          >
            Agendar Agora
          </Button>
          <Text small spacing="10px 0 0 0">
            Horarios disponíveis
          </Text>
        </Box>
      </Box>

      <Box background="light" direction="column" spacing="10px 0 0" hasPadding>
        <Title small>Serviços ({servicos.length})</Title>
        <TextInput
          value={form.inputFiltro}
          onChangeText={(value) => dispatch(updateForm("inputFiltro", value))}
          onFocus={() => dispatch(updateForm("inputFiltroFoco", true))}
          onBlur={() => dispatch(updateForm("inputFiltroFoco", false))}
          placeholder="Digite o nome do serviço..."
        />
      </Box>
    </>
  );
};

export default Header;
