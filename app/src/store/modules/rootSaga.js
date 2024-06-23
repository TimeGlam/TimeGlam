import { all } from "redux-saga/effects";

import estabelecimento from "../modules/salao/sagas";
import loginCliente from "../modules/loginCliente/sagas";

export default function* rootSaga() {
  return yield all([estabelecimento, loginCliente]);
}
