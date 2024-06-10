import { produce } from 'immer';
import types from './types';

const initial_state = {
    default_state: 'create',
    components: {
        drawer: false,
        delete: false,
        view: 'week',
    },
    form: {
        filtering: false, // filtragem de dados
        disabled: true,
        saving: false,
    },

    horario: {
        dias: [],
        inicio: '',
        fim: '',
        especialidades: [],
        colaboradores: [],
    },
    colaboradores: [],
    horarios: [],
    servicos: [],
};

function horario(state = initial_state, action) {
    switch (action.type) {
        case types.UPDATE_HORARIO: {
            return produce(state, (draft) => {
                draft = { ...draft, ...action.payload };
                return draft;
            });
        }

        case types.RESET_HORARIO:
            return {
                ...state,
                horario: initial_state.horario,
                form: initial_state.form,
                components: initial_state.components,
            };
        default:
            return state;
    }
}

export default horario;
