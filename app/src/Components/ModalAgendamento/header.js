import React from 'react';
import {Touchable, GradientView, Text, Spacer, Box} from '../../styles';
import theme from '../../styles/theme.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ModalHeader = () => {
  return (
    <View style={StyleSheet.headerContainer}>
      <GradientView
        colors={[theme.colors.dark, theme.colors.primary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Box>
          <Touchable hasPadding>
            <Icon
              Name="chevron-left"
              color={theme.colors.light}
              size={30}></Icon>
            <View style={{marginLeft: 20}}>
              <Text color="light">Finalizar Agendamento</Text>
              <Spacer size="3px" />
              <Text small colo="light">
                Horário, pagamento e especialista
              </Text>
            </View>
          </Touchable>
        </Box>
      </GradientView>
    </View>
  );
};
const style = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 70,
  },
});
export default ModalHeader;
