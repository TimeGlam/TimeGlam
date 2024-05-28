import {takeLatest, all} from 'redux-saga/effects';
import consts from '../../../consts';
import api from '../../../Services/api';
import types from './types';

import {
  updateSalao,
  updateServicos,
  updateAgenda,
  updateAgendamento,
  updateColaboradores,
  updateForm,
} from './actions';

export function* getSalao() {
  try {
    const {data: res} = yield call(api.get, `/salao/${consts.salaoId}`);
    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(updateSalao(res.salao));
  } catch (err) {
    alert(err.message);
  }
}
export default all([takeLatest(types.GET_SALAO, getSalao)]);
