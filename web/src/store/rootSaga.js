import { all } from 'redux-saga/effects';

import agendamento from './modules/agendamento/sagas';
import clientes from './modules/cliente/sagas';
import colaborador from './modules/colaborador/sagas';
import servico from './modules/servicos/sagas';
import horario from './modules/horario/sagas';
import estabelecimento from './modules/estabelecimento/sagas';
import auth from './modules/estabelecimento/auth';
export default function* rootSaga() {
    return yield all([
        agendamento,
        clientes,
        colaborador,
        servico,
        horario,
        estabelecimento,
        auth,
    ]);
}
