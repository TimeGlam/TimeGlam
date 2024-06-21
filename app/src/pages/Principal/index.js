import React from "react";
import { View, Text, Button } from "react-native";
import { Box, TextInput, Title } from "../../styles";
import { useSelector } from "react-redux";

const OutraPagina = ({ navigation }) => {
  const { estabelecimento, servicos, form } = useSelector(
    (state) => state.estabelecimento
  );

  console.log(estabelecimento);
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Another Page</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </>
  );
};

export default OutraPagina;
