import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import {
    updateCliente,
    allClientes as actionAllClientes,
    resetCliente,
} from './actions';
import types from './types';
import api from '../../../services/api';
import consts from '../../../consts';

export function* allClientes() {
    const { form } = yield select((state) => state.cliente);
    try {
        yield put(updateCliente({ form: { ...form, filtering: true } }));
        const { data: res } = yield call(
            api.get,
            `/cliente/estabelecimento/${consts.estabelecimentoId}`
        );

        yield put(updateCliente({ form: { ...form, filtering: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }
        yield put(updateCliente({ clientes: res.clientes }));
    } catch (error) {
        yield put(updateCliente({ form: { ...form, filtering: false } }));
        alert(error.message);
    }
}

export function* filterClientes() {
    const { form, cliente } = yield select((state) => state.cliente);
    try {
        yield put(updateCliente({ form: { ...form, filtering: true } }));

        const { data: res } = yield call(api.post, `/cliente/filter`, {
            filters: {
                email: cliente.email,
                status: 'A',
            },
        });

        yield put(updateCliente({ form: { ...form, filtering: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }
        if (res.clientes.length > 0) {
            yield put(
                updateCliente({
                    cliente: res.clientes[0],
                    form: { ...form, filtering: false, disabled: true },
                })
            );
        } else {
            yield put(updateCliente({ form: { ...form, disabled: false } }));
        }
    } catch (error) {
        yield put(updateCliente({ form: { ...form, filtering: false } }));
        alert(error.message);
    }
}

export function* addCliente() {
    const { cliente, form, components } = yield select(
        (state) => state.cliente
    );

    console.log({ cliente, form, components });

    try {
        yield put(updateCliente({ form: { ...form, saving: true } }));

        const { data: res } = yield call(api.post, '/cliente', {
            cliente,
            estabelecimentoId: consts.estabelecimentoId,
        });

        console.log(res); // Log da res api

        yield put(updateCliente({ form: { ...form, saving: false } }));

        if (res.error) {
            console.error(res.message);
            alert(res.message);
            return false;
        }

        yield put(actionAllClientes());
        yield put(
            updateCliente({ components: { ...components, drawer: false } })
        );

        yield put(resetCliente());
    } catch (err) {
        console.error(err.message);
        yield put(updateCliente({ form: { ...form, saving: false } }));
        alert(err.message);
    }
}

export function* unlinkCliente() {
    const { cliente, form, components } = yield select(
        (state) => state.cliente
    );

    try {
        yield put(updateCliente({ form: { ...form, saving: true } }));

        const { data: res } = yield call(
            api.delete,
            `/cliente/vinculo/${cliente.vinculoId}`
        );

        console.log(res); // Log response

        // atualiza o estado
        yield put(
            updateCliente({
                form: { ...form, saving: false },
                components: { ...components, delete: false },
            })
        );

        if (res.error) {
            console.error(res.message); // Log do erro
            alert(res.message);
            return false;
        }

        // Atualiza lista de clientes
        yield put(actionAllClientes());
        // Fechando o drawer
        yield put(
            updateCliente({
                components: { ...components, drawer: false, delete: false },
            })
        );

        // Reset cliente
        yield put(resetCliente());
    } catch (err) {
        console.error(err.message); // Log erro
        yield put(updateCliente({ form: { ...form, saving: false } })); // saving false caso de erro
        alert(err.message);
    }
}
export default all([
    takeLatest(types.ALL_CLIENTES, allClientes),
    takeLatest(types.FILTER_CLIENTES, filterClientes),
    takeLatest(types.ADD_CLIENTE, addCliente),
    takeLatest(types.UNLINK_CLIENTE, unlinkCliente),
]);
