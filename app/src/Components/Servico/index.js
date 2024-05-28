import React from 'react';
import {Text, Box, Touchable} from '../../styles';
import {Button} from 'react-native-paper';
const servico = () => {
  return (
    <Touchable height="100px" hasPaddding aling="center" background="light">
      <Cover image="https://th.bing.com/th/id/OIP.eao2CNOd22X5_RHH-Y2L6AAAAA?rs=1&pid=ImgDetMain" />
      <Box direction="Column">
        <Text bold color="dark">
          Corte de Cabelo Feminino
        </Text>
        <Text Small>R$ 45</Text>
      </Box>
      <Box>
        <Button
          icon="cloxk-check-outiline"
          background="sucess"
          mode="contained"
          textColor="leight">
          Agendar
        </Button>
      </Box>
    </Touchable>
  );
};
export default servico;
