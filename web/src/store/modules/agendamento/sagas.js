import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '../../../services/api';
import { updateAgendamentos } from './actions';
import types from './types';
import consts from '../../../consts';
export function* filtrarAgendamento({ start, end }) {
    try {
        const { data: res } = yield call(api.post, '/agendamento/filter', {
            estabelecimentoId: consts.estabelecimentoId,
            range: {
                start: start,
                end: end,
            },
        });
        console.log('start end', start, end);
        if (res.error) {
            alert(res.message);
            return false;
        }
        yield put(updateAgendamentos(res.agendamentos));
    } catch (error) {
        alert(error.message);
    }
}

export default all([takeLatest(types.FILTER_AGENDAMENTOS, filtrarAgendamento)]);
