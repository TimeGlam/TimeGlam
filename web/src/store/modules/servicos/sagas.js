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
    const { servico, form, components, default_state } = yield select(
        (state) => state.servico
    );

    console.log({ servico, form, components });

    try {
        yield put(updateServico({ form: { ...form, saving: true } }));

        const form = new FormData();

        form.append('servico', JSON.stringify(servico));
        form.append('estabelecimentoId', consts.estabelecimentoId);

        for (let index = 0; index < servico.arquivos.length; index++) {
            const arquivo = servico.arquivos[index];
            form.append(`arquivo_${index}`, arquivo);
        }

        const { data: res } = yield call(
            api[default_state === 'create' ? 'post' : 'put'],
            default_state === 'create' ? `/servico` : `/servico/${servico._id}`,
            form
        );

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

        console.log(res);

        yield put(
            updateServico({
                form: { ...form, saving: false },
                components: { ...components, delete: false },
            })
        );

        if (res.error) {
            console.error(res.message);
            alert(res.message);
            return false;
        }

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
        console.error(err.message);
        yield put(updateServico({ form: { ...form, saving: false } }));
        alert(err.message);
    }
}

export function* removeArquivo({ key }) {
    const { form } = yield select((state) => state.servico);

    try {
        yield put(updateServico({ form: { ...form, saving: true } }));

        const { data: res } = yield call(api.post, `/servico/delete-arquivo/`, {
            key,
        });

        console.log(res); // Log response

        // atualiza o estado
        yield put(
            updateServico({
                form: { ...form, saving: false },
            })
        );

        if (res.error) {
            console.error(res.message);
            alert(res.message);
            return false;
        }
    } catch (err) {
        console.error(err.message); // Log erro
        yield put(updateServico({ form: { ...form, saving: false } }));
        alert(err.message);
    }
}

export default all([
    takeLatest(types.ALL_SERVICOS, allServicos),
    takeLatest(types.ADD_SERVICO, addServico),
    takeLatest(types.REMOVE_SERVICO, removeServico),
    takeLatest(types.REMOVE_ARQUIVO, removeArquivo),
]);
