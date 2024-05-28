import types from './types';

export function allServicos() {
    return { type: types.ALL_SERVICOS };
}

export function updateServico(payload) {
    return { type: types.UPDATE_SERVICO, payload };
}

export function addServico(colaborador) {
    return { type: types.ADD_SERVICO, colaborador };
}

export function resetServico() {
    return { type: types.RESET_SERVICO };
}

export function removeArquivo() {
    return { type: types.REMOVE_ARQUIVO };
}
export function removeServico(colaboradorId) {
    return { type: types.REMOVE_SERVICO, colaboradorId };
}
