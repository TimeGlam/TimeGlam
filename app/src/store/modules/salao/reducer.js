import types from "./types";
import { produce } from "immer";
import consts from "../../../consts";
import _ from "lodash";

const INITIAL_STATE = {
  estabelecimento: {},
  estabelecimentos: [],
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
    case types.UPDATE_ESTABELECIMENTOS: {
      return produce(state, (draft) => {
        draft.estabelecimentos = action.estabelecimentos;
      });
    }
    case types.UPDATE_ESTABELECIMENTO: {
      return produce(state, (draft) => {
        draft.estabelecimento = {
          ...state.estabelecimento,
          ...action.estabelecimento,
        };
      });
    }
    case types.UPDATE_SERVICOS: {
      return produce(state, (draft) => {
        draft.servicos = action.servicos;
      });
    }
    case types.UPDATE_FORM: {
      return produce(state, (draft) => {
        Object.keys(action.payload).forEach((key) => {
          draft.form[key] = action.payload[key];
        });
      });
    }
    case types.UPDATE_AGENDA: {
      return produce(state, (draft) => {
        draft.agenda = action.agenda;
      });
    }
    case types.UPDATE_AGENDAMENTO: {
      return produce(state, (draft) => {
        if (action.agendamento.servicoId) {
          draft.form.modalAgendamento = 2;
        }
        draft.agendamento = { ...draft.agendamento, ...action.agendamento };
      });
    }
    // case types.UPDATE_COLABORADORES: {
    //   return produce(state, (draft) => {
    //     draft.colaboradores = _.uniq([
    //       ...state.colaboradores,
    //       ...action.colaboradores,
    //     ]);
    //   });
    // }
    case types.UPDATE_COLABORADORES: {
      return produce(state, (draft) => {
        draft.colaboradores = action.colaboradores;
      });
    }
    default:
      return state;
  }
}
export default estabelecimento;
