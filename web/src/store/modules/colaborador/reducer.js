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
    colaboradores: [],
    servicos: [],
    colaborador: {
        email: '',
        nome: '',
        telefone: '',
        dataNascimento: '',
        sexo: 'M',
        vinculo: 'A',
        especialidades: [],
        contaBancaria: {
            titular: '',
            cpfCnpj: '',
            banco: '',
            tipo: 'CC',
            agencia: '',
            numero: '',
            dv: '',
        },
    },
};

function colaborador(state = initial_state, action) {
    switch (action.type) {
        case types.UPDATE_COLABORADOR: {
            return produce(state, (draft) => {
                draft = { ...draft, ...action.payload };
                return draft;
            });
        }

        case types.RESET_COLABORADOR:
            return {
                ...state,
                colaborador: initial_state.colaborador,
                form: initial_state.form,
                components: initial_state.components,
            };
        default:
            return state;
    }
}

export default colaborador;
