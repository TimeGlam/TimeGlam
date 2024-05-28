import { useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Button, Drawer, Modal } from 'rsuite';
import InfoRoundIcon from '@rsuite/icons/InfoRound';
import Table from '../../components/Table/Index';
import { useDispatch, useSelector } from 'react-redux';
import {
    allClientes,
    updateCliente,
    filterClientes,
    addCliente,
    resetCliente,
    unlinkCliente,
} from '../../store/modules/cliente/actions';

import moment from 'moment';
function Clientes() {
    const dispatch = useDispatch();

    const { clientes, cliente, default_state, form, components } = useSelector(
        (state) => state.cliente
    );

    const setComponent = (component, state) => {
        dispatch(
            updateCliente({
                components: { ...components, [component]: state },
            })
        );
    };

    const setCliente = (key, value) => {
        dispatch(
            updateCliente({
                cliente: { ...cliente, [key]: value },
            })
        );
    };

    const save = () => {
        dispatch(addCliente());
    };

    const remover = () => {
        dispatch(unlinkCliente());
    };
    useEffect(() => {
        dispatch(allClientes());
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
                        cliente
                    </h3>
                    <div className="row mt-3">
                        <div className="form-group col-12 mb-3">
                            <b>E-mail</b>
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="email do cliente"
                                    disabled={default_state === 'update'}
                                    value={cliente.email}
                                    onChange={(e) => {
                                        setCliente('email', e.target.value);
                                    }}
                                />

                                {default_state === 'create' && (
                                    <div className="input-group-append">
                                        <Button
                                            appearance="primary"
                                            loading={form.filtering}
                                            disabled={form.filtering}
                                            onClick={() =>
                                                dispatch(filterClientes())
                                            }
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
                                placeholder="nome do cliente"
                                disabled={form.disabled}
                                value={cliente.nome}
                                onChange={(e) =>
                                    setCliente('nome', e.target.value)
                                }
                            />
                        </div>
                        <div className="form-group col-6">
                            <b className="">Telefone</b>
                            <input
                                type=""
                                className="form-control"
                                placeholder="telefone do cliente"
                                disabled={form.disabled}
                                value={cliente.telefone}
                                onChange={(e) =>
                                    setCliente('telefone', e.target.value)
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
                                value={cliente.dataNascimento}
                                onChange={(e) =>
                                    setCliente('dataNascimento', e.target.value)
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
                                value={cliente.genero}
                                onChange={(e) =>
                                    setCliente('genero', e.target.value)
                                }
                            >
                                <option value={'M'}>Masculino</option>
                                <option value={'F'}>Feminino</option>
                                <option value={'O'}>Lgbtqia+</option>
                            </select>
                        </div>

                        <div className="form-group col-6">
                            <b className="">Documento</b>
                            <select
                                type=""
                                className="form-control"
                                disabled={form.disabled}
                                value={cliente.documento.tipo}
                                onChange={(e) =>
                                    setCliente('documento', {
                                        ...cliente.documento,
                                        tipo: e.target.value,
                                    })
                                }
                            >
                                <option value={'cpf'}>CPF</option>
                                <option value={'cpnj'}>CNPJ</option>
                            </select>
                        </div>

                        <div className="form-group col-6">
                            <b className="">Numero do documento</b>
                            <input
                                type="text"
                                className="form-control"
                                disabled={form.disabled}
                                value={cliente.documento.numero}
                                onChange={(e) =>
                                    setCliente('documento', {
                                        ...cliente.documento,
                                        numero: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="form-group col-3">
                            <b className="">CEP</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="digite o cep"
                                disabled={form.disabled}
                                value={cliente.endereco.cep}
                                onChange={(e) =>
                                    setCliente('endereco', {
                                        ...cliente.endereco,
                                        cep: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="form-group col-6">
                            <b className="">Rua</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Rua / Logradouro"
                                disabled={form.disabled}
                                value={cliente.endereco.logradouro}
                                onChange={(e) =>
                                    setCliente('endereco', {
                                        ...cliente.endereco,
                                        logradouro: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="form-group col-6">
                            <b className="">Número</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Número"
                                disabled={form.disabled}
                                value={cliente.endereco.numero}
                                onChange={(e) =>
                                    setCliente('endereco', {
                                        ...cliente.endereco,
                                        numero: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="form-group col-6">
                            <b className="">UF</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="UF"
                                disabled={form.disabled}
                                value={cliente.endereco.uf}
                                onChange={(e) =>
                                    setCliente('endereco', {
                                        ...cliente.endereco,
                                        uf: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="form-group col-6">
                            <b className="">Cidade</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Cidade"
                                disabled={form.disabled}
                                value={cliente.endereco.cidade}
                                onChange={(e) =>
                                    setCliente('endereco', {
                                        ...cliente.endereco,
                                        cidade: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <Button
                        block
                        className="mt-3"
                        color={default_state === 'create' ? 'green' : 'red'}
                        appearance="primary"
                        size="lg"
                        loading={form.saving}
                        onClick={() => {
                            if (default_state === 'create') {
                                save();
                            } else {
                                setComponent('delete', true);
                            }
                        }}
                    >
                        {default_state === 'create' ? 'Salvar' : 'Remover'}{' '}
                        cliente
                    </Button>
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
                        <h2 className="mb-4 mt-0">Clientes</h2>
                        <div>
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                    dispatch(resetCliente());
                                    dispatch(
                                        updateCliente({
                                            default_state: 'create',
                                        })
                                    );
                                    setComponent('drawer', true);
                                }}
                            >
                                <span className="mdi mdi-plus">
                                    Adicionar cliente
                                </span>
                            </button>
                        </div>
                    </div>

                    <Table
                        loading={form.filtering}
                        data={clientes}
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
                                label: 'Gênero',
                                content: (cliente) =>
                                    cliente.genero === 'M'
                                        ? 'Masculino'
                                        : cliente.genero === 'F'
                                        ? 'Feminino'
                                        : 'LGBTQIAPN+',
                                width: 200,
                            },
                            {
                                label: 'Data de cadastro',
                                content: (cliente) =>
                                    moment(cliente.dataCadastro).format(
                                        'DD/MM/YYYY'
                                    ),
                                width: 200,
                            },
                        ]}
                        actions={(cliente) => (
                            <Button appearance="primary" color="blue" size="xs">
                                INFORMAÇÕES
                            </Button>
                        )}
                        onRowClick={(cliente) => {
                            dispatch(
                                updateCliente({
                                    default_state: 'update',
                                })
                            );
                            dispatch(updateCliente({ cliente }));
                            setComponent('drawer', true);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Clientes;
