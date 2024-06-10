import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import {
    updateHorario,
    allHorarios as actionAllHorarios,
    resetHorario,
} from './actions';
import types from './types';
import api from '../../../services/api';
import consts from '../../../consts';

export function* allHorarios() {
    const { form } = yield select((state) => state.horario);
    try {
        yield put(updateHorario({ form: { ...form, filtering: true } }));
        const { data: res } = yield call(
            api.get,
            `/horario/estabelecimento/${consts.estabelecimentoId}`
        );

        yield put(updateHorario({ form: { ...form, filtering: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }
        yield put(updateHorario({ horarios: res.horarios }));
        console.log('oi', res.horarios);
    } catch (error) {
        yield put(updateHorario({ form: { ...form, filtering: false } }));
        alert(error.message);
    }
}

export function* filterColabores() {
    const { form, horario } = yield select((state) => state.horario);
    try {
        yield put(updateHorario({ form: { ...form, filtering: true } }));

        const { data: res } = yield call(api.post, `/horario/colaboradores`, {
            especialidades: horario.especialidades,
        });

        console.log('Response from API:', res);

        yield put(updateHorario({ form: { ...form, filtering: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }

        yield put(
            updateHorario({
                form: { ...form, filtering: false, disabled: true },
            })
        );

        yield put(updateHorario({ colaboradores: res.listaColaboradores }));
    } catch (error) {
        yield put(updateHorario({ form: { ...form, filtering: false } }));
        alert(error.message);
    }
}

export function* addHorario() {
    const { horario, form, components, default_state } = yield select(
        (state) => state.horario
    );

    console.log({ horario, form, components });

    try {
        yield put(updateHorario({ form: { ...form, saving: true } }));

        let res = {};
        if (default_state === 'create') {
            console.log('Enviando dados para POST:', {
                horario,
                estabelecimentoId: consts.estabelecimentoId,
            });
            console.log(horario);

            const response = yield call(api.post, '/horario', {
                ...horario,
                estabelecimentoId: consts.estabelecimentoId,
            });

            res = response.data;
        } else {
            const response = yield call(
                api.put,
                `/horario/${horario._id}`,
                horario
            );
            res = response.data;
        }

        console.log(res);

        yield put(updateHorario({ form: { ...form, saving: false } }));

        if (res.error) {
            console.error(res.message);
            alert(res.message);
            return false;
        }

        yield put(actionAllHorarios());
        yield put(
            updateHorario({ components: { ...components, drawer: false } })
        );

        yield put(resetHorario());
    } catch (err) {
        console.error(err.message);
        yield put(updateHorario({ form: { ...form, saving: false } }));
        alert(err.message);
    }
}

export function* removerHorario() {
    const { form, horario, components } = yield select(
        (state) => state.horario
    );

    try {
        yield put(updateHorario({ form: { ...form, saving: true } }));

        const { data: res } = yield call(api.delete, `/horario/${horario._id}`);

        console.log(res); // Log response

        // atualiza o estado
        yield put(
            updateHorario({
                form: { ...form, saving: false },
            })
        );

        if (res.error) {
            console.error(res.message); // Log do erro
            alert(res.message);
            return false;
        }

        yield put(updateHorario({ form: { ...form, saving: false } }));

        if (res.error) {
            console.error(res.message);
            alert(res.message);
            return false;
        }

        yield put(actionAllHorarios());
        yield put(
            updateHorario({ components: { ...components, drawer: false } })
        );

        yield put(resetHorario());
    } catch (err) {
        console.error(err.message); // Log erro
        yield put(updateHorario({ form: { ...form, saving: false } })); // saving false caso de erro
        alert(err.message);
    }
}

export function* allServices() {
    const { form } = yield select((state) => state.horario);

    try {
        yield put(updateHorario({ form: { ...form, filtering: true } }));

        const { data: res } = yield call(
            api.get,
            `/estabelecimento/servicos/${consts.estabelecimentoId}`
        );

        // atualiza o estado
        yield put(
            updateHorario({
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
            updateHorario({
                servicos: res.servicos,
            })
        );
    } catch (err) {
        console.error(err.message); // Log erro
        yield put(updateHorario({ form: { ...form, filtering: false } })); // filtering false caso de erro
        alert(err.message);
    }
}
export default all([
    takeLatest(types.ALL_HORARIOS, allHorarios),
    takeLatest(types.ALL_SERVICES, allServices),
    takeLatest(types.ADD_HORARIO, addHorario),
    takeLatest(types.FILTER_COLABORADORES, filterColabores),
    takeLatest(types.REMOVE_HORARIO, removerHorario),
]);
