import types from './types';
import produce from 'immer';
const initial_state = {
    agendamentos: [],
};

function agendamento(state = initial_state, action) {
    switch (action.type) {
        case types.UPDATE_AGENDAMENTOS: {
            //
        }
        default:
            return state;
    }
}

export default agendamento;
