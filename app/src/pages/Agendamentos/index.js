import React from "react";
import { View, Text, Button } from "react-native";

export default function Agendamentos() {
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Agendamentos</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </>
  );
}
