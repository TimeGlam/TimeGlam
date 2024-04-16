import { produce } from 'immer';
import types from './types';

const initial_state = {
    clientes: [],
};

function cliente(state = initial_state, action) {
    switch (action.type) {
        case types.UPDATE_CLIENTES: {
            return produce(state, (draft) => {
                draft = { ...draft, ...action.payload };
                return draft;
            });
        }
        default:
            return state;
    }
}

export default cliente;
