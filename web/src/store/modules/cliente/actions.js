import types from './types';

export function allClientes() {
    return { type: types.ALL_clientes };
}

export function updateClientes(payload) {
    return { type: types.UPDATE_cliente, payload };
}
