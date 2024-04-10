const initial_state = {
    agendamentos: [],
};

function agendamento(state = initial_state, action) {
    switch (action.type) {
        case '@agendamento/ALL': {
            //
        }
        default:
            return state;
    }
}

export default agendamento;
