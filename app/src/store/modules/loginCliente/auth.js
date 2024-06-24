// src/store/modules/estabelecimento/auth/reducer.js

import types from "./types";

const INITIAL_STATE = {
  token: null,
  cliente: null,
  agendamentos: [],
  loading: false,
  error: null,
};

function clienteReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        cliente: action.payload.cliente,
        loading: false,
        error: null,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case types.FETCH_AGENDAMENTOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_AGENDAMENTOS_SUCCESS:
      return {
        ...state,
        agendamentos: action.payload.agendamentos,
        loading: false,
        error: null,
      };
    case types.FETCH_AGENDAMENTOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default clienteReducer;
