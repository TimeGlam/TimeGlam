import types from './types';

export function allColaboradores() {
    return { type: types.ALL_COLABORADORES };
}

export function updateColaborador(payload) {
    return { type: types.UPDATE_COLABORADOR, payload };
}

export function filterColaboradores() {
    return { type: types.FILTER_COLABORADORES };
}

export function addColaborador(colaborador) {
    return { type: types.ADD_COLABORADOR, colaborador };
}

export function resetColaborador() {
    return { type: types.RESET_COLABORADOR };
}
export function unlinkColaborador(colaboradorId) {
    return { type: types.UNLINK_COLABORADOR, colaboradorId };
}

export function allServices() {
    return { type: types.ALL_SERVICES };
}
