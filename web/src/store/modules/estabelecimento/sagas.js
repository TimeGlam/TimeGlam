import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '../../../services/api';
import { loginSuccess, loginFailure } from './actions';
import types from './types';

export function* login({ payload }) {
    try {
        const { email, senha } = payload;
        const response = yield call(api.post, '/estabelecimento/login', {
            email,
            senha,
        });

        if (response.data.erro) {
            yield put(loginFailure(response.data.message));
        } else {
            yield put(loginSuccess(response.data.token));
        }
    } catch (err) {
        yield put(loginFailure(err.message));
    }
}

export default all([takeLatest(types.LOGIN_REQUEST, login)]);
