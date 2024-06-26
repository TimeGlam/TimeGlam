import React, { useEffect } from "react";
import { View, ImageBackground } from "react-native";
import { Spacer, Title } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../styles/theme.json";
import {
  allEstabelecimentos,
  updateForm,
} from "../../store/modules/salao/actions";
import { Avatar, Caption, Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
const moment = require("moment");

const HeaderHome = () => {
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
      <ImageBackground
        source={require("../../assets/imgs/background_home.png")}
        style={{ width: "100%", height: 200 }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "transparent"]}
          style={{
            flex: 1,
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar.Icon
              size={50}
              icon="account-circle"
              color={theme.colors.light}
              style={{ backgroundColor: theme.colors.primary }}
            />
            <View style={{ marginLeft: 15, flex: 1 }}>
              <Title
                numberOfLines={1}
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: theme.colors.light,
                }}
              >{`Seja bem vindo! ${cliente.nome}`}</Title>
              <Caption
                numberOfLines={1}
                style={{ fontSize: 14, color: theme.colors.light }}
              >{`Hoje é: ${hoje}`}</Caption>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View
        style={{
          backgroundColor: theme.colors.light,
          padding: 16,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Title small>Estabelecimentos ({estabelecimentos.length})</Title>
        <Spacer />
        <Searchbar
          placeholder="Digite o nome do estabelecimento..."
          value={form.inputFiltro}
          onChangeText={(value) => dispatch(updateForm("inputFiltro", value))}
          onFocus={() => dispatch(updateForm("inputFiltroFoco", true))}
          onBlur={() => dispatch(updateForm("inputFiltroFoco", false))}
          style={{ elevation: 0, backgroundColor: theme.colors.muted }}
          iconColor={theme.colors.primary}
          placeholderTextColor={theme.colors.dark}
        />
      </View>
    </>
  );
};

export default HeaderHome;
