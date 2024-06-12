import types from './types';
import { produce } from 'immer';

const initial_state = {
    agendamentos: [],
    agendamento: [],
};

function agendamento(state = initial_state, action) {
    switch (action.type) {
        case types.UPDATE_AGENDAMENTOS: {
            return produce(state, (draft) => {
                draft.agendamentos = action.agendamentos;

                return draft;
            });
        }
        default:
            return state;
    }
}

export default agendamento;
