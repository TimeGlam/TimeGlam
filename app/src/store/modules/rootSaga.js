import { all } from "redux-saga/effects";

import estabelecimento from "../modules/salao/sagas";

export default function* rootSaga() {
  return yield all([estabelecimento]);
}
