import types from "./types";
import { produce } from "immer";
import consts from "../../../consts";

const INITIAL_STATE = {
  estabelecimento: {},
  servicos: [],
  agenda: [],
  colaboradores: [],
  agendamento: {
    clienteId: consts.clienteId,
    estabelecimentoId: consts.estabelecimentoId,
    servicoId: null,
    colaboradorId: null,
    data: null,
  },
  form: {
    inputFiltro: "",
    inputFiltroFoco: false,
    modalEspecialista: false,
    modalAgendamento: 0,
    agendamentoLoading: false,
  },
};
function estabelecimento(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_ESTABELECIMENTO: {
      return produce(state, (draft) => {
        draft.estabelecimento = {
          ...draft.estabelecimento,
          ...action.estabelecimento,
        };
      });
    }
    case types.UPDATE_SERVICOS: {
      return produce(state, (draft) => {
        draft.servicos = action.servicos;
      });
    }

    default:
      return state;
  }
}
export default estabelecimento;
