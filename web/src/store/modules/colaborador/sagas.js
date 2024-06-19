import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import {
    updateColaborador,
    allColaboradores as actionAllColaboradores,
    resetColaborador,
} from './actions';
import types from './types';
import api from '../../../services/api';
import consts from '../../../consts';

export function* allColaboradores() {
    const { form } = yield select((state) => state.colaborador);
    try {
        yield put(updateColaborador({ form: { ...form, filtering: true } }));
        const { data: res } = yield call(
            api.get,
            `/colaborador/estabelecimento/${consts.estabelecimentoId}`
        );

        yield put(updateColaborador({ form: { ...form, filtering: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }
        yield put(updateColaborador({ colaboradores: res.colaboradores }));
        console.log(res.colaboradores);
    } catch (error) {
        yield put(updateColaborador({ form: { ...form, filtering: false } }));
        alert(error.message);
    }
}

export function* filterColabores() {
    const { form, colaborador } = yield select((state) => state.colaborador);
    try {
        yield put(updateColaborador({ form: { ...form, filtering: true } }));

        const { data: res } = yield call(api.post, `/colaborador/filter`, {
            filters: {
                email: colaborador.email,
                status: 'A',
            },
        });

        console.log('Response from API:', res);

        yield put(updateColaborador({ form: { ...form, filtering: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }
        if (res.colaboradores.length > 0) {
            console.log('Colaborador encontrado:', res.colaboradores[0]);

            yield put(
                updateColaborador({
                    colaborador: res.colaboradores[0],
                    form: { ...form, filtering: false, disabled: true },
                })
            );
        } else {
            yield put(
                updateColaborador({ form: { ...form, disabled: false } })
            );
        }
    } catch (error) {
        yield put(updateColaborador({ form: { ...form, filtering: false } }));
        alert(error.message);
    }
}

export function* addColaboradores() {
    const { colaborador, form, components, default_state } = yield select(
        (state) => state.colaborador
    );

    console.log({ colaborador, form, components });

    try {
        yield put(updateColaborador({ form: { ...form, saving: true } }));

        let res = {};
        if (default_state === 'create') {
            console.log('Enviando dados para POST:', {
                colaborador,
                estabelecimentoId: consts.estabelecimentoId,
            });
            console.log(colaborador);
            console.log(
                "Valor de 'especialidades' dentro de 'colaborador':",
                colaborador.especialidades
            );

            const response = yield call(api.post, '/colaborador', {
                colaborador,
                estabelecimentoId: consts.estabelecimentoId,
            });

            res = response.data;
        } else {
            const response = yield call(
                api.put,
                `/colaborador/${colaborador._id}`,
                {
                    vinculo: colaborador.vinculo,
                    vinculoId: colaborador.vinculoId,
                    especialidade: colaborador.especialidades,
                }
            );
            res = response.data;
        }

        console.log(res);

        yield put(updateColaborador({ form: { ...form, saving: false } }));

        if (res.error) {
            console.error(res.message);
            alert(res.message);
            return false;
        }

        yield put(actionAllColaboradores());
        yield put(
            updateColaborador({ components: { ...components, drawer: false } })
        );

        yield put(resetColaborador());
    } catch (err) {
        console.error(err.message);
        yield put(updateColaborador({ form: { ...form, saving: false } }));
        alert(err.message);
    }
}

export function* unlinkColaborador() {
    const { colaborador, form, components } = yield select(
        (state) => state.colaborador
    );

    try {
        yield put(updateColaborador({ form: { ...form, saving: true } }));

        const { data: res } = yield call(
            api.delete,
            `/colaborador/vinculo/${colaborador.vinculoId}`
        );

        console.log(res); // Log response

        // atualiza o estado
        yield put(
            updateColaborador({
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
        yield put(actionAllColaboradores());
        // Fechando o drawer
        yield put(
            updateColaborador({
                components: { ...components, drawer: false, delete: false },
            })
        );

        // Reset cliente
        yield put(resetColaborador());
    } catch (err) {
        console.error(err.message); // Log erro
        yield put(updateColaborador({ form: { ...form, saving: false } })); // saving false caso de erro
        alert(err.message);
    }
}

export function* allServices() {
    const { form } = yield select((state) => state.colaborador);

    try {
        yield put(updateColaborador({ form: { ...form, filtering: true } }));

        const { data: res } = yield call(
            api.get,
            `/estabelecimento/servicos/${consts.estabelecimentoId}`
        );

        // atualiza o estado
        yield put(
            updateColaborador({
                form: { ...form, filtering: false },
            })
        );

        if (res.error) {
            console.error(res.message); // Log do erro
            alert(res.message);
            return false;
        }

        // Fechando o drawer
        yield put(
            updateColaborador({
                servicos: res.servicos,
            })
        );
    } catch (err) {
        console.error(err.message); // Log erro
        yield put(updateColaborador({ form: { ...form, filtering: false } })); // filtering false caso de erro
        alert(err.message);
    }
}
export default all([
    takeLatest(types.ALL_COLABORADORES, allColaboradores),
    takeLatest(types.FILTER_COLABORADORES, filterColabores),
    takeLatest(types.ADD_COLABORADOR, addColaboradores),
    takeLatest(types.UNLINK_COLABORADOR, unlinkColaborador),
    takeLatest(types.ALL_SERVICES, allServices),
]);
