import { produce } from 'immer';
import types from './types';

const initial_state = {
    default_state: 'create',
    components: {
        drawer: false,
        delete: false,
    },
    form: {
        filtering: false, // filtragem de dados
        disabled: true,
        saving: false,
    },
    clientes: [],
    cliente: {
        email: '',
        nome: '',
        telefone: '',
        dataNascimento: '',
        sexo: 'M',
        documento: {
            tipo: 'cpf',
            numero: '',
        },
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

function cliente(state = initial_state, action) {
    switch (action.type) {
        case types.UPDATE_CLIENTE: {
            return produce(state, (draft) => {
                draft = { ...draft, ...action.payload };
                return draft;
            });
        }
        case types.RESET_CLIENTE:
            return {
                ...state,
                cliente: initial_state.cliente,
                form: initial_state.form,
                components: initial_state.components,
            };
        default:
            return state;
    }
}

export default cliente;
