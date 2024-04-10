import produce from 'immer';
import types from './types';

const initialState = {
    clientes: [],
};

function cliente(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_cliente: {
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
