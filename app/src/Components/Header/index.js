import React from 'react';
import {
  Cover,
  GradientView,
  Title,
  Text,
  Badge,
  Touchable,
  Button,
  TextInput,
} from '../../styles';
import Icon from 'react-native-vector-icon/materialCommunityIcons';
import theme from '../../styles/theme.json';
import {useSelector} from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const {salao, servicos, form} = useSelector(state => state.salao);
  return (
    <>
      <Cover background={salao.capa}>
        <GradientView
          colors={['#2123f33', '#21233fe6']}
          hasPadding
          justify="flex-end">
          <Badge color={salao.isOpened ? 'success' : 'danger'}>
            {salao.isOpened ? 'ABERTO' : 'FECHADO'}
          </Badge>
          <Title color="light">{salao.nome}</Title>
          <Text color="light">
            {salao?.endereco?.cidade}• {salao.distance} kms
          </Text>
        </GradientView>
      </Cover>
      <Box background="light" align="center">
        <Box hasPadding justify="space-between">
          <Touchable
            direction="column"
            align="center"
            onPress={() => Linking.openURL(`tel:${salao.telefone}`)}>
            <Icon name="phone" size={24} color={theme.colors.muted} />
            <Text small spacing="10px 0 0">
              Ligar
            </Text>
          </Touchable>
          <Touchable
            direction="column"
            align="center"
            onPress={() => openGps(salao?.geo?.coordinates)}>
            <Icon name="map-marker" size={24} color={theme.colors.muted} />
            <Text small spacing="10px 0 0">
              Visitar
            </Text>
          </Touchable>
          <Touchable
            direction="column"
            align="center"
            onPress={() =>
              Share.share({
                message: `${salao.nome}.`,
              })
            }>
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
            uppercase={false}>
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
          onChangeText={value => dispatch(updateForm('inputFiltro', value))}
          onFocus={() => dispatch(updateForm('inputFiltroFoco', true))}
          onBlur={() => dispatch(updateForm('inputFiltroFoco', false))}
          placeholder="Digite o nome do serviço..."
        />
      </Box>
    </>
  );
};
export default Header;
