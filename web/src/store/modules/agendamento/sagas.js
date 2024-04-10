import { all, takeLatest, call } from 'redux-saga/effects';
import api from '../../../services/api';
import types from './types';
import consts from '../../../consts';
export function* filtrarAgendamento({ start, end }) {
    try {
        const res = yield call(api.post, '/agendamento/filter', {
            estabelecimentoId: '65dab55776929dc9681186d5',
            range: {
                start: start,
                end: end,
            },
        });
        console.log(res.data);
    } catch (error) {
        alert(error.message);
    }
}

export default all([takeLatest('@agendamento/FILTER', filtrarAgendamento)]);
