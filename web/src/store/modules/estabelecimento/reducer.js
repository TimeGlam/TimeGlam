import { produce } from 'immer';
import types from './types';

const initial_state = {
    default_state: 'create',
    components: {
        drawer: false,
        delete: false,
    },
    form: {
        filtering: false,
        disabled: true,
        saving: false,
    },
    estabelecimentos: [],
    estabelecimento: {
        email: '',
        nome: '',
        telefone: '',
        senha: '',
        endereco: {
            cidade: '',
            uf: '',
            cep: '',
            logradouro: '',
            numero: '',
            pais: 'br',
        },
    },
};

function estabelecimento(state = initial_state, action) {
    switch (action.type) {
        case types.UPDATE_ESTABELECIMENTO: {
            return produce(state, (draft) => {
                draft = { ...draft, ...action.payload };
                return draft;
            });
        }
        case types.RESET_ESTABELECIMENTO:
            return {
                ...state,
                estabelecimento: initial_state.estabelecimento,
                form: initial_state.form,
                components: initial_state.components,
            };

        case types.LOGOUT:
            return produce(state, (draft) => {
                draft.token = null;
            });

        default:
            return state;
    }
}

export default estabelecimento;
