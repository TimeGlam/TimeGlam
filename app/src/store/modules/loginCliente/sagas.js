import { takeLatest, call, put, all } from "redux-saga/effects";
import api from "../../../Services/api";
import { loginSuccess, loginFailure } from "./actions";
import types from "./types";

export function* login({ payload }) {
  try {
    const { email, senha } = payload;
    const response = yield call(api.post, "/cliente/login", {
      email,
      senha,
    });

    if (response.data.erro) {
      yield put(loginFailure(response.data.message));
    } else {
      yield put(loginSuccess(response.data.token));
    }
    console.log("respostaLogin", response);
  } catch (err) {
    yield put(loginFailure(err.message));
  }
}

export default all([takeLatest(types.LOGIN_REQUEST, login)]);
