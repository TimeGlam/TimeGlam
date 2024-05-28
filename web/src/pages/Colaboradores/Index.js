import { useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Button, Drawer, Modal, TagPicker, Tag } from 'rsuite';
import InfoRoundIcon from '@rsuite/icons/InfoRound';
import Table from '../../components/Table/Index';
import { useDispatch, useSelector } from 'react-redux';
import {
    allColaboradores,
    updateColaborador,
    filterColaboradores,
    addColaborador,
    resetColaborador,
    unlinkColaborador,
    allServices,
} from '../../store/modules/colaborador/actions';

import moment from 'moment';
function Colaboradores() {
    const dispatch = useDispatch();

    const {
        colaborador,
        colaboradores,
        servicos,
        form,
        components,
        default_state,
    } = useSelector((state) => state.colaborador);

    const setComponent = (component, state) => {
        dispatch(
            updateColaborador({
                components: { ...components, [component]: state },
            })
        );
    };

    const setColaborador = (key, value) => {
        dispatch(
            updateColaborador({
                colaborador: { ...colaborador, [key]: value },
            })
        );
    };

    const save = () => {
        dispatch(addColaborador());
    };

    const remover = () => {
        dispatch(unlinkColaborador());
    };
    useEffect(() => {
        dispatch(allColaboradores());
        dispatch(allServices());
    }, []);

    return (
        <div className="col p-5 overflow-auto h-100">
            <Drawer
                open={components.drawer}
                size="sm"
                onClose={() => setComponent('drawer', false)}
            >
                <Drawer.Body>
                    <h3>
                        {default_state === 'create'
                            ? 'Criar novo '
                            : 'Atualizar '}
                        Colaborador
                    </h3>
                    <div className="row mt-3">
                        <div className="form-group col-12">
                            <b className="">Email</b>
                            <div className="input-group mb-3">
                                <input
                                    disabled={default_state === 'update'}
                                    type="email"
                                    className="form-control"
                                    placeholder="email colaborador"
                                    value={colaborador.email}
                                    onChange={(e) =>
                                        setColaborador('email', e.target.value)
                                    }
                                />
                                {default_state === 'create' && (
                                    <div className="input-group-append">
                                        <Button
                                            appearance="primary"
                                            loading={form.filtering}
                                            disabled={form.filtering}
                                            onClick={() => {
                                                dispatch(filterColaboradores());
                                            }}
                                        >
                                            Pesquisar
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group col-6">
                            <b className="">Nome</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="nome do colaborador"
                                disabled={form.disabled}
                                value={colaborador.nome}
                                onChange={(e) =>
                                    setColaborador('nome', e.target.value)
                                }
                            />
                        </div>
                        <div className="form-group col-6">
                            <b className=""> Status</b>

                            <select
                                className="form-control"
                                disabled={
                                    form.disabled && default_state === 'create'
                                }
                                value={colaborador.vinculo}
                                onChange={(e) =>
                                    setColaborador('vinculo', e.target.value)
                                }
                            >
                                <option value="A">Ativo</option>
                                <option value="I">Inativo</option>
                            </select>
                        </div>
                        <div className="form-group col-6">
                            <b className="">Telefone</b>
                            <input
                                type=""
                                className="form-control"
                                placeholder="telefone do cliente"
                                disabled={form.disabled}
                                value={colaborador.telefone}
                                onChange={(e) =>
                                    setColaborador('telefone', e.target.value)
                                }
                            />
                        </div>
                        <div className="form-group col-6">
                            <b className="">Data de nascimento</b>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="telfone do cliente"
                                disabled={form.disabled}
                                value={colaborador.dataNascimento}
                                onChange={(e) =>
                                    setColaborador(
                                        'dataNascimento',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="form-group col-6">
                            <b className="">Genero</b>
                            <select
                                type=""
                                className="form-control"
                                placeholder="genero cliente"
                                disabled={form.disabled}
                                value={colaborador.genero}
                                onChange={(e) =>
                                    setColaborador('genero', e.target.value)
                                }
                            >
                                <option value="" disabled selected>
                                    Selecione
                                </option>
                                <option value={'M'}>Masculino</option>
                                <option value={'F'}>Feminino</option>
                                <option value={'O'}>Lgbtqia+</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <b>Especialidades</b>

                            <TagPicker
                                size="lg"
                                block
                                data={servicos}
                                disabled={
                                    form.disabled && default_state === 'create'
                                }
                                value={colaborador.especialidades}
                                onChange={(value) =>
                                    setColaborador('especialidades', value)
                                }
                            />
                        </div>
                    </div>
                    <Button
                        block
                        className="mt-3"
                        color={default_state === 'create' ? 'green' : 'blue'}
                        appearance="primary"
                        size="lg"
                        loading={form.saving}
                        onClick={() => save()}
                    >
                        {default_state === 'create' ? 'Salvar' : 'Atualizar'}{' '}
                        colaborador
                    </Button>
                    {default_state === 'update' && (
                        <Button
                            loading={form.saving}
                            color="red"
                            appearance="primary"
                            block
                            onClick={() => setComponent('delete', true)}
                        >
                            remover
                        </Button>
                    )}
                </Drawer.Body>
            </Drawer>
            <Modal
                open={components.delete}
                onClose={() => setComponent('delete', false)}
                size="xs"
            >
                <Modal.Body>
                    <InfoRoundIcon
                        Icon="remind"
                        style={{
                            color: '#ffb300',
                            fontSize: 24,
                        }}
                    />{' '}
                    Tem certeza que deseja deletar?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        loading={form.saving}
                        onClick={() => remover()}
                        color="red"
                        appearance="primary"
                    >
                        Sim, desejo deletar
                    </Button>
                    <Button
                        onClick={() => setComponent('delete', false)}
                        appearance="subtle"
                    >
                        cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex justify-content-between">
                        <h2 className="mb-4 mt-0">Colaboradores</h2>
                        <div>
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                    dispatch(resetColaborador());
                                    dispatch(
                                        updateColaborador({
                                            default_state: 'create',
                                        })
                                    );
                                    setComponent('drawer', true);
                                }}
                            >
                                <span className="mdi mdi-plus">
                                    Adicionar colaborador
                                </span>
                            </button>
                        </div>
                    </div>

                    <Table
                        loading={form.filtering}
                        data={colaboradores}
                        config={[
                            {
                                label: 'Nome',
                                key: 'nome',
                                width: 300,
                                fixed: true,
                            },
                            {
                                label: 'E-mail',
                                key: 'email',
                                width: 200,
                            },
                            {
                                label: 'Telefone',
                                key: 'telefone',
                                width: 200,
                            },
                            {
                                label: 'Especialidades',
                                key: 'especialidades',
                                content: (rowData) =>
                                    rowData.especialidades.length,
                                sortable: true,
                            },

                            {
                                label: 'Status',
                                key: 'vinculo',
                                width: 65,
                                content: (rowData) => (
                                    <Tag
                                        color={
                                            rowData.vinculo === 'A'
                                                ? 'green'
                                                : 'red'
                                        }
                                    >
                                        {rowData.vinculo === 'A'
                                            ? 'Ativo'
                                            : 'Inativo'}
                                    </Tag>
                                ),
                                sortable: true,
                            },
                            {
                                label: 'Gênero',
                                content: (colaborador) =>
                                    colaborador.genero === 'M'
                                        ? 'Masculino'
                                        : colaborador.genero === 'F'
                                        ? 'Feminino'
                                        : 'LGBTQIAPN+',
                                width: 200,
                            },
                            {
                                label: 'Data de cadastro',
                                content: (colaborador) =>
                                    moment(colaborador.dataCadastro).format(
                                        'DD/MM/YYYY'
                                    ),
                                width: 200,
                            },
                        ]}
                        actions={(colaborador) => (
                            <Button appearance="primary" color="blue" size="xs">
                                INFORMAÇÕES
                            </Button>
                        )}
                        onRowClick={(colaborador) => {
                            dispatch(
                                updateColaborador({
                                    colaborador,
                                    default_state: 'update',
                                })
                            );
                            setComponent('drawer', true);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Colaboradores;
