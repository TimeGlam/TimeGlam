import { takeLatest, call, put, all } from "redux-saga/effects";
import api from "../../../Services/api";
import {
  loginSuccess,
  loginFailure,
  fetchAgendamentosRequest,
  fetchAgendamentosSuccess,
  fetchAgendamentosFailure,
} from "./actions";
import { updateCliente } from "../salao/actions";
import types from "./types";

export function* login({ payload }) {
  try {
    const { email, senha } = payload;
    const res = yield call(api.post, "/cliente/login", { email, senha });

    if (res.data.erro) {
      yield put(loginFailure(res.data.message));
    } else {
      const {
        token,
        payload: { cliente },
      } = res.data;
      yield put(loginSuccess(token));
      yield put(updateCliente(cliente));

      // Disparar a ação para buscar os agendamentos do cliente
      yield put(fetchAgendamentosRequest(cliente._id));
    }

    console.log("resposta login: ", res);
  } catch (err) {
    yield put(loginFailure(err.message));
  }
}

export function* fetchAgendamentos({ payload }) {
  try {
    const { clienteId } = payload;
    console.log("NKsadjlkasjd", clienteId);
    const res = yield call(api.get, `/cliente/${clienteId}`);

    if (res.data.erro) {
      yield put(fetchAgendamentosFailure(res.data.message));
    } else {
      yield put(fetchAgendamentosSuccess(res.data.agendamentos));
      console.log("agendamentosAqui", res.data.agendamentos);
    }
  } catch (err) {
    yield put(fetchAgendamentosFailure(err.message));
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, login),
  takeLatest(types.FETCH_AGENDAMENTOS_REQUEST, fetchAgendamentos),
]);
