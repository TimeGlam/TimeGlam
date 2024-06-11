import React, { useEffect, useMemo, useRef } from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";

import ModalResume from "./resume";
import ModalHeader from "./header";
import DateTimePicker from "./dateTime";
import EspecialistasPicker from "./especialistas";
import EspecialistasModal from "./especialistas/modal";
import PaymentPicker from "./especialistas/payment";

import { useSelector, useDispatch } from "react-redux";
import { updateForm, saveAgendamento } from "../../store/modules/salao/actions";

import { Button, Box, Title, Text, Spacer } from "../../styles";
import theme from "../../styles/theme.json";

import moment from "moment";
import util from "../../util";

const ModalAgendamento = () => {
  const dispatch = useDispatch();

  const { form, servicos, agendamento, agenda, colaboradores } = useSelector(
    (state) => state.estabelecimento
  );

  const servico = servicos.filter((s) => s._id === agendamento.servicoId)[0];
  const dataSelecionada = moment(agendamento.data).format("YYYY-MM-DD");
  const horaSelecionada = moment(agendamento.data).format("HH:mm");

  const { horariosDisponiveis, colaboradoresDia } = util.selectAgendamento(
    agenda,
    dataSelecionada,
    agendamento.colaboradorId
  );

  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const setSnap = (snapIndex) => {
    if (sheetRef.current) {
      sheetRef.current.snapToIndex(snapIndex);
    }
  };

  // useEffect(() => {
  //   setSnap(form.inputFiltroFoco ? 0 : form.modalAgendamento);
  // }, [form.modalAgendamento, form.inputFiltroFoco]);

  useEffect(() => {
    if (form.modalAgendamento) {
      setSnap(form.modalAgendamento);
    }
  }, [form.modalAgendamento]);

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => {
          dispatch(updateForm("modalAgendamento", 0));
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          style={{
            backgroundColor: "#fff",
          }}
        >
          <ModalHeader
            form={form}
            onPress={() => {
              dispatch(
                updateForm(
                  "modalAgendamento",
                  form.modalAgendamento === 1 ? 2 : 1
                )
              );
            }}
          />
          <ModalResume servicos={servicos} agendamento={agendamento} />
          {agenda.length > 0 && (
            <>
              <DateTimePicker
                servico={servico}
                servicos={servicos}
                agendamento={agendamento}
                agenda={agenda}
                dataSelecionada={dataSelecionada}
                horaSelecionada={horaSelecionada}
                horariosDisponiveis={horariosDisponiveis}
              />
              <EspecialistasPicker
                colaboradores={colaboradores}
                agendamento={agendamento}
              />
              {/* <PaymentPicker />'  */}
              <Box hasPadding>
                <Button
                  icon="check"
                  buttonColor={theme.colors.primary}
                  mode="contained"
                  block
                  disabled={form.agendamentoLoading}
                  loading={form.agendamentoLoading}
                  uppercase={false}
                  onPress={() => dispatch(saveAgendamento())}
                >
                  Confirmar meu agendamento
                </Button>
              </Box>
            </>
          )}
        </ScrollView>
        <EspecialistasModal
          form={form}
          colaboradores={colaboradores}
          agendamento={agendamento}
          servicos={servicos}
          horaSelecionada={horaSelecionada}
          colaboradoresDia={colaboradoresDia}
        />
      </BottomSheet>
    </>
  );
};
export default ModalAgendamento;
