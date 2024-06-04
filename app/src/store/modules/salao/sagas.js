import { takeLatest, all, call, put } from "redux-saga/effects";
import consts from "../../../consts";
import api from "../../../Services/api";
import types from "./types";

import {
  updateEstabelecimento,
  updateServicos,
  updateAgendamento,
} from "./actions";

export function* getEstabelecimento() {
  try {
    const { data: res } = yield call(
      api.get,
      `/estabelecimento/${consts.estabelecimentoId}`
    );

    console.log("Dados do estabelecimento:", res);

    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(
      updateEstabelecimento({
        ...res.estabelecimento,
        distanceLocation: res.distanceLocation,
      })
    );
  } catch (err) {
    alert(err.message);
  }
}

export function* allServicos() {
  try {
    const { data: res } = yield call(
      api.get,
      `/servico/estabelecimento/${consts.estabelecimentoId}`
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

export default all([
  takeLatest(types.GET_ESTABELECIMENTO, getEstabelecimento),
  takeLatest(types.ALL_SERVICOS, allServicos),
]);
