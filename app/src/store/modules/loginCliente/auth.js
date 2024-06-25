// src/store/modules/estabelecimento/auth/reducer.js

import types from "./types";

const INITIAL_STATE = {
  token: null,
  cliente: null,
  agendamentos: [],
  loading: false,
  error: null,
  userLocation: null, // Adicionar um novo campo para armazenar a localização do usuário
};

function clienteReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.FETCH_AGENDAMENTOS_REQUEST:
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
    case types.FETCH_AGENDAMENTOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case types.FETCH_AGENDAMENTOS_SUCCESS:
      return {
        ...state,
        agendamentos: action.payload.agendamentos,
        loading: false,
        error: null,
      };
    case types.STORE_USER_LOCATION:
      return {
        ...state,
        userLocation: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    default:
      return state;
  }
}

export default clienteReducer;
