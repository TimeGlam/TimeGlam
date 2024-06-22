import React from "react";
import {
  ScrollView,
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  updateForm,
  updateAgendamento,
} from "../../../store/modules/salao/actions";
import moment from "moment";
const EspecialistasModal = ({
  form,
  colaboradores,
  agendamento,
  servicos,
  colaboradoresDia,
  horaSelecionada,
}) => {
  const dispatch = useDispatch();
  let colaboradoresIdsDisponiveis = [];

  for (let colaboradorId of Object.keys(colaboradoresDia)) {
    let horarios = colaboradoresDia[colaboradorId].flat(2);
    if (horarios.includes(horaSelecionada)) {
      colaboradoresIdsDisponiveis.push(colaboradorId);
    }
  }

  const colaboradoresDisponiveis = colaboradores.filter((c) =>
    colaboradoresIdsDisponiveis.includes(c._id)
  );
  const servico = servicos.filter((c) => c._id === agendamento.servicoId)[0];

  return (
    <Modal
      visible={form.modalEspecialista}
      animationType="slide"
      transparent={true}
      onRequestClose={() => dispatch(updateForm("modalEspecialista", false))}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <ScrollView>
          <View
            style={{ padding: 20, borderRadius: 7, backgroundColor: "#fff" }}
          >
            <Pressable
              onPress={() => dispatch(updateForm("modalEspecialista", false))}
            >
              <Text>Hide Modal</Text>
            </Pressable>
            <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
              {servico?.titulo}
            </Text>
            <Text style={{ marginBottom: 10 }}>
              Disponíveis em{" "}
              <Text style={{ textDecorationLine: "underline" }}>
                {moment(agendamento.data).format("DD/MM/YYYY (ddd) [às] HH:mm")}
              </Text>
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {colaboradoresDisponiveis.map((colaborador) => (
                <TouchableOpacity
                  key={colaborador._id}
                  style={{
                    width: (Dimensions.get("screen").width - 80) / 4,
                    height: 70,
                    alignItems: "center",
                    marginTop: 10,
                    borderWidth:
                      colaborador._id === agendamento.colaboradorId ? 2 : 0,
                    borderColor:
                      colaborador._id === agendamento.colaboradorId
                        ? "#0000ff"
                        : "transparent",
                  }}
                  onPress={() => {
                    dispatch(
                      updateAgendamento({ colaboradorId: colaborador._id })
                    );
                    dispatch(updateForm("modalEspecialista", false));
                  }}
                >
                  <Image
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 22.5,
                      marginBottom: 5,
                    }}
                    source={{ uri: colaborador.foto }}
                  />
                  <Text
                    style={{
                      fontWeight:
                        colaborador._id === agendamento.colaboradorId
                          ? "bold"
                          : "normal",
                    }}
                  >
                    {colaborador.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EspecialistasModal;
