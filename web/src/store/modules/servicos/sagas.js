import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import {
    updateServico,
    allServicos as actionAllServicos,
    resetServico,
} from './actions';
import types from './types';
import api from '../../../services/api';
import consts from '../../../consts';

export function* allServicos() {
    const { form } = yield select((state) => state.servico);
    try {
        yield put(updateServico({ form: { ...form, filtering: true } }));
        const { data: res } = yield call(
            api.get,
            `/servico/estabelecimento/${consts.estabelecimentoId}`
        );

        yield put(updateServico({ form: { ...form, filtering: false } }));

        if (res.error) {
            alert(res.message);
            return false;
        }
        yield put(updateServico({ servicos: res.servicos }));
        console.log(res.servicos);
    } catch (error) {
        yield put(updateServico({ form: { ...form, filtering: false } }));
        alert(error.message);
    }
}

export function* addServico() {
    const { colaborador, form, components, default_state } = yield select(
        (state) => state.colaborador
    );

    console.log({ colaborador, form, components });

    try {
        yield put(updateServico({ form: { ...form, saving: true } }));

        let res = {};
        if (default_state === 'create') {
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

        yield put(updateServico({ form: { ...form, saving: false } }));

        if (res.error) {
            console.error(res.message);
            alert(res.message);
            return false;
        }

        yield put(actionAllServicos());
        yield put(
            updateServico({ components: { ...components, drawer: false } })
        );

        yield put(resetServico());
    } catch (err) {
        console.error(err.message);
        yield put(updateServico({ form: { ...form, saving: false } }));
        alert(err.message);
    }
}

export function* removeServico() {
    const { colaborador, form, components } = yield select(
        (state) => state.colaborador
    );

    try {
        yield put(updateServico({ form: { ...form, saving: true } }));

        const { data: res } = yield call(
            api.delete,
            `/colaborador/vinculo/${colaborador.vinculoId}`
        );

        console.log(res); // Log response

        // atualiza o estado
        yield put(
            updateServico({
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
        yield put(actionAllServicos());
        // Fechando o drawer
        yield put(
            updateServico({
                components: { ...components, drawer: false, delete: false },
            })
        );

        // Reset cliente
        yield put(resetServico());
    } catch (err) {
        console.error(err.message); // Log erro
        yield put(updateServico({ form: { ...form, saving: false } })); // saving false caso de erro
        alert(err.message);
    }
}

export function* removeArquivo() {}

export default all([
    takeLatest(types.ALL_SERVICOS, allServicos),
    takeLatest(types.ADD_SERVICO, addServico),
    takeLatest(types.REMOVE_SERVICO, removeServico),
    takeLatest(types.REMOVE_ARQUIVO, removeArquivo),
]);
