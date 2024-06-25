import React from "react";
import { ScrollView, Text } from "react-native";
import { Modal, Portal, Divider } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  updateForm,
  updateAgendamento,
} from "../../../store/modules/salao/actions";
import moment from "moment/min/moment-with-locales";
moment.locale("pt-br");
import {
  CloseButton,
  ColaboradorFoto,
  ColaboradorItem,
  ModalBody,
  ModalHeader,
  ServicoTitle,
} from "../../../styles";
import theme from "../../../styles/theme.json";

const EspecialistasModal = ({
  form,
  colaboradores,
  agendamento,
  servicos,
  colaboradoresDia,
  horaSelecionada,
}) => {
  const dispatch = useDispatch();

  const colaboradoresIdsDisponiveis = Object.keys(colaboradoresDia).filter(
    (colaboradorId) =>
      colaboradoresDia[colaboradorId].flat(2).includes(horaSelecionada)
  );

  const colaboradoresDisponiveis = colaboradores.filter((c) =>
    colaboradoresIdsDisponiveis.includes(c._id)
  );

  const servico = servicos.find((s) => s._id === agendamento.servicoId);

  return (
    <Portal>
      <Modal
        visible={form.modalEspecialista}
        onDismiss={() => dispatch(updateForm("modalEspecialista", false))}
        contentContainerStyle={{
          backgroundColor: theme.colors.light,
          borderRadius: 10,
          marginHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <ModalHeader>
          <ServicoTitle>{servico?.titulo}</ServicoTitle>
          <CloseButton
            icon="close"
            size={24}
            iconColor={theme.colors.primary}
            onPress={() => dispatch(updateForm("modalEspecialista", false))}
          />
        </ModalHeader>
        <ModalBody>
          <Divider style={{ marginVertical: 10 }} />
          <Text style={{ marginBottom: 10, fontSize: 16 }}>
            Disponíveis em{" "}
            <Text style={{ textDecorationLine: "underline" }}>
              {moment(agendamento.data).format("DD/MM/YYYY (ddd) [às] HH:mm")}
            </Text>
          </Text>
          <ScrollView style={{ maxHeight: 300 }}>
            {colaboradoresDisponiveis.map((colaborador) => (
              <ColaboradorItem
                key={colaborador._id}
                style={[
                  {
                    backgroundColor:
                      colaborador._id === agendamento.colaboradorId
                        ? "#f0f0f0"
                        : "transparent",
                  },
                ]}
                onPress={() => {
                  dispatch(
                    updateAgendamento({ colaboradorId: colaborador._id })
                  );
                  dispatch(updateForm("modalEspecialista", false));
                }}
              >
                <ColaboradorFoto source={{ uri: colaborador.foto }} />
                <Text
                  style={[
                    { fontSize: 16 },
                    {
                      fontWeight:
                        colaborador._id === agendamento.colaboradorId
                          ? "bold"
                          : "normal",
                    },
                  ]}
                >
                  {colaborador.nome}
                </Text>
              </ColaboradorItem>
            ))}
          </ScrollView>
        </ModalBody>
      </Modal>
    </Portal>
  );
};

export default EspecialistasModal;
