import { combineReducers } from 'redux';

import agendamento from './modules/agendamento/reducer';
import cliente from './modules/cliente/reducer';
import colaborador from './modules/colaborador/reducer';
import servico from './modules/servicos/reducer';
import horario from './modules/horario/reducer';
import estabelecimento from './modules/estabelecimento/reducer';
import auth from './modules/estabelecimento/auth';
export default combineReducers({
    agendamento,
    cliente,
    colaborador,
    servico,
    horario,
    estabelecimento,
    auth,
});
