// src/store/modules/estabelecimento/auth/actions.js

import types from './types';

export function loginRequest(email, senha) {
    return {
        type: types.LOGIN_REQUEST,
        payload: { email, senha },
    };
}

export function loginSuccess(token) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: { token },
    };
}

export function loginFailure(error) {
    return {
        type: types.LOGIN_FAILURE,
        payload: { error },
    };
}
