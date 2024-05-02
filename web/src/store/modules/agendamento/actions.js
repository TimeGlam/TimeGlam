import types from './types';
export function filterAgendamento(start, end) {
    return {
        type: types.FILTER_AGENDAMENTOS,
        start,
        end,
    };
}

export function updateAgendamentos(agendamentos) {
    return { type: types.UPDATE_AGENDAMENTOS, agendamentos };
}
