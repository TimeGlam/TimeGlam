import { produce } from 'immer';
import types from './types';
import moment from 'moment';

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
    servicos: [],
    servico: {
        titulo: '',
        preco: '',
        comissao: '',
        duracao: moment('00:30', 'HH:mm').format(),
        recorrencia: '',
        descricao: '',
        status: 'A',
        arquivos: [],
    },
};

function servico(state = initial_state, action) {
    switch (action.type) {
        case types.UPDATE_SERVICO: {
            return produce(state, (draft) => {
                draft = { ...draft, ...action.payload };
                return draft;
            });
        }

        case types.RESET_SERVICO:
            return {
                ...state,
                servico: initial_state.servico,
                form: initial_state.form,
                components: initial_state.components,
            };
        default:
            return state;
    }
}

export default servico;
