import { takeLatest, all, call, put, select } from "redux-saga/effects";
import api from "../../../Services/api";
import types from "./types";

import {
  updateEstabelecimento,
  updateServicos,
  updateAgendamento,
  updateAgenda,
  updateColaboradores,
  updateForm,
  updateEstabelecimentos,
} from "./actions";
import moment from "moment";
import util from "../../../util";
import { Alert } from "react-native";

export function* allEstabelecimentos() {
  try {
    const { data: res } = yield call(
      api.get,
      "/estabelecimento/estabelecimentos"
    );

    console.log("Dados dos estabelecimentos:", res);

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(updateEstabelecimentos(res.estabelecimentos));
  } catch (err) {
    alert(err.message, "deu erro");
  }
}

export function* getEstabelecimento(action) {
  try {
    const { estabelecimentoId } = action;
    const { data: res } = yield call(
      api.get,
      `/estabelecimento/${estabelecimentoId}`
    );

    console.log("Dados do estabelecimento:", res);

    if (res.error) {
      alert(res.message);
      return false;
    }

    const location = res.distanceLocation.toFixed(2);

    yield put(
      updateEstabelecimento({
        ...res.estabelecimento,
        distanceLocation: location,
      })
    );
  } catch (err) {
    alert(err.message);
  }
}

export function* allServicos(action) {
  try {
    const { estabelecimentoId } = action;
    const { data: res } = yield call(
      api.get,
      `/servico/estabelecimento/${estabelecimentoId}`
    );

    console.log("Dados dos serviços:", res);

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(updateServicos(res.servicos));
  } catch (err) {
    alert(err.message, "deu erro");
  }
}

export function* filterAgenda() {
  try {
    const { agendamento, agenda } = yield select(
      (state) => state.estabelecimento
    );

    const { data: res } = yield call(
      api.post,
      `/agendamento/dias-disponiveis`,
      {
        ...agendamento,
        data: moment().format("YYYY-MM-DD"),
      }
    );

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(updateAgenda(res.agenda));
    yield put(updateColaboradores(res.colaboradores));

    const { horariosDisponiveis, data, colaboradorId } = yield call(
      util.selectAgendamento,
      res.agenda
    );

    yield put(
      updateAgendamento({
        data: moment(`${data}T${horariosDisponiveis[0][0]}`).format(),
        colaboradorId,
      })
    );

    console.log("filter agenda", res);
  } catch (err) {
    alert(err.message);
  }
}

export function* saveAgendamento() {
  try {
    yield put(updateForm("agendamentoLoading", true));

    const { agendamento } = yield select((state) => state.estabelecimento);
    const { data: res } = yield call(api.post, `/agendamento`, agendamento);

    if (res.error) {
      alert(res.message);
      return false;
    }

    const clienteEstabelecimentoPayload = {
      estabelecimentoId: agendamento.estabelecimentoId,
      clienteId: agendamento.clienteId,
    };
    const { data: res2 } = yield call(
      api.post,
      `/cliente/estabelecimento`,
      clienteEstabelecimentoPayload
    );

    if (res2.error) {
      alert(res2.message);
      return false;
    }

    Alert.alert("Sucesso ✔️", "Horário agendado com sucesso", [
      { text: "Voltar", onPress: () => {} },
    ]);

    yield put(updateForm("agendamentoLoading", false));
  } catch (err) {
    alert(err.message);
  }
}

export default all([
  takeLatest(types.ALL_ESTABELECIMENTOS, allEstabelecimentos),
  takeLatest(types.GET_ESTABELECIMENTO, getEstabelecimento),
  takeLatest(types.ALL_SERVICOS, allServicos),
  takeLatest(types.FILTER_AGENDA, filterAgenda),
  takeLatest(types.SAVE_AGENDAMENTO, saveAgendamento),
]);
