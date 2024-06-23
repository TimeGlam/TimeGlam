import { takeLatest, call, put, all } from "redux-saga/effects";
import api from "../../../Services/api";
import { loginSuccess, loginFailure } from "./actions";
import { updateCliente } from "../salao/actions";
import types from "./types";

export function* login({ payload }) {
  try {
    const { email, senha } = payload;
    const res = yield call(api.post, "/cliente/login", {
      email,
      senha,
    });

    if (res.data.erro) {
      yield put(loginFailure(res.data.message));
    } else {
      yield put(loginSuccess(res.data.token));
      yield put(updateCliente(res.data.payload.cliente));
    }

    console.log("resposta login: ", res);
  } catch (err) {
    yield put(loginFailure(err.message));
  }
}

export default all([takeLatest(types.LOGIN_REQUEST, login)]);
