import { takeLatest, all, call, put } from 'redux-saga/effects';
import { updateClientes } from './actions';
import types from './types';
import api from '../../../services/api';
import consts from '../../../consts';

export function* allClientes() {
    try {
        const { data: res } = yield call(
            api.get,
            `/cliente/estabelecimento/${consts.estabelecimentoId}`
        );

        if (res.error) {
            alert(res.message);
            return false;
        }
        yield put(updateClientes({ clientes: res.clientes }));
    } catch (error) {
        alert(error.message);
    }
}

export default all([takeLatest(types.ALL_clientes, allClientes)]);