import types from './types';
import produce from 'immer';
import consts from '../../../consts';

const INITIAL_STATE = {
  salao: {},
  servicos: [],
  agenda: [],
  colaboradores: [],
  agendamento: {
    clienteId: consts.clienteId,
    salaoId: consts.salaoId,
    servicoId: null,
    colaboradoeId: null,
    data: null,
  },
  form: {
    inputFiltro: '',
    inputFiltroFoco: false,
    modalEspecialista: false,
    modalAgendamento: 0,
    agendamentoLoading: false,
  },
};
function salao(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_SALAO: {
      return produce(state, draft => {
        draft.salao = {...draft.salao, ...action.salao};
      });
    }
    default:
      return state;
  }
}
export default salao;
