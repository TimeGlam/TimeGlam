import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import theme from "../../styles/theme.json";
import {
  Container,
  TitleText,
  FooterText,
  Spacer,
  Text,
  CardContainer,
} from "../../styles";
import { fetchAgendamentosRequest } from "../../store/modules/loginCliente/actions";
import { deleteAgendamento } from "../../store/modules/salao/actions";
import {
  Card,
  Avatar,
  IconButton,
  Modal,
  Portal,
  Button,
} from "react-native-paper";

const Agendamentos = () => {
  const dispatch = useDispatch();
  const { cliente, agendamentos, loading, error } = useSelector(
    (state) => state.auth
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);

  const openModal = (agendamento) => {
    setSelectedAgendamento(agendamento);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAgendamento(null);
  };

  const handleDeleteAgendamento = (agendamentoId) => {
    dispatch(deleteAgendamento(agendamentoId));
    closeModal();
  };

  useEffect(() => {
    if (cliente) {
      dispatch(fetchAgendamentosRequest(cliente._id));
    }
  }, [dispatch, cliente]);

  const formatDuration = (duracaoMinutos) => {
    const duration = moment.duration(duracaoMinutos, "minutes");
    const hours = duration.hours();
    const minutes = duration.minutes();

    if (hours > 0 && minutes > 0) {
      return `${hours}h${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes} minutos`;
    }
  };

  return (
    <Container>
      <TitleText style={{ width: "100%" }}>Meus agendamentos</TitleText>
      <ScrollView
        style={{ marginVertical: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {loading && <FooterText color="primary">Carregando...</FooterText>}
        {error && <FooterText color="error">{error}</FooterText>}
        {agendamentos.length > 0 ? (
          agendamentos.map((agendamento) => (
            <CardContainer key={agendamento._id}>
              <Card>
                <Card.Title
                  style={{ width: "100%" }}
                  title={agendamento.servicoId.titulo}
                  subtitle={`Data: ${moment(agendamento.data).format(
                    "DD/MM/YYYY HH:mm"
                  )}`}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="close-circle"
                      iconColor={theme.colors.primary}
                      onPress={() => openModal(agendamento)}
                    />
                  )}
                  left={(props) => (
                    <Avatar.Icon
                      {...props}
                      style={{ backgroundColor: theme.colors.primary }}
                      icon="calendar"
                    />
                  )}
                />
                <Card.Content>
                  <Spacer size="10px" />
                  <Text>
                    <Text bold>Colaborador:</Text>{" "}
                    {agendamento.colaboradorId.nome}
                  </Text>
                  <Spacer size="8px" />
                  <Text>
                    <Text bold>Estabelecimento:</Text>{" "}
                    {agendamento.estabelecimentoId.nome}
                  </Text>
                  <Spacer size="8px" />
                  <Text>
                    <Text bold>Valor:</Text> {agendamento.valor + " R$"}
                  </Text>
                  <Spacer size="8px" />
                  <Text>
                    <Text bold>Duração:</Text>{" "}
                    {formatDuration(agendamento.servicoId.duracao)}
                  </Text>
                </Card.Content>
              </Card>
            </CardContainer>
          ))
        ) : (
          <FooterText>Nenhum agendamento encontrado</FooterText>
        )}
      </ScrollView>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={closeModal}
          contentContainerStyle={{
            backgroundColor: theme.colors.light,
            padding: 20,
            marginHorizontal: 50,
            maxWidth: 300,
            alignSelf: "center",
            borderRadius: 10,
          }}
        >
          <Text>Deseja realmente cancelar este agendamento?</Text>
          <Spacer size="10px" />
          <Button
            mode="contained"
            onPress={() => handleDeleteAgendamento(selectedAgendamento._id)}
            buttonColor={theme.colors.danger}
            style={{ borderColor: "none" }}
          >
            Cancelar
          </Button>
          <Spacer size="10px" />
          <Button
            mode="outlined"
            onPress={closeModal}
            style={{ borderColor: "none" }}
            textColor={theme.colors.light}
            buttonColor={theme.colors.primary}
          >
            Voltar
          </Button>
        </Modal>
      </Portal>
    </Container>
  );
};

export default Agendamentos;
