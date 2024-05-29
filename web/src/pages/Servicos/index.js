import { useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import {
    Button,
    Drawer,
    Modal,
    TagPicker,
    Tag,
    DatePicker,
    Uploader,
} from 'rsuite';
import InfoRoundIcon from '@rsuite/icons/InfoRound';
import { Icon } from '@rsuite/icons';
import { FaCamera, FaReact, FaAddressBook, FaSpinner } from 'react-icons/fa';

import Table from '../../components/Table/Index';
import { useDispatch, useSelector } from 'react-redux';
import {
    allServicos,
    updateServico,
    addServico,
    resetServico,
    removeServico,
    removeArquivo,
} from '../../store/modules/servicos/actions';

import consts from '../../consts';
import moment from 'moment';
function Servicos() {
    const dispatch = useDispatch();

    const { servico, servicos, form, components, default_state } = useSelector(
        (state) => state.servico
    );

    const setComponent = (component, state) => {
        dispatch(
            updateServico({
                components: { ...components, [component]: state },
            })
        );
    };

    const setServico = (key, value) => {
        dispatch(
            updateServico({
                servico: { ...servico, [key]: value },
            })
        );
    };

    const save = () => {
        dispatch(addServico());
    };

    const remover = () => {
        dispatch(removeServico());
    };
    useEffect(() => {
        dispatch(allServicos());
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
                        Serviço
                    </h3>
                    <div className="row mt-3">
                        <div className="form-group col-6">
                            <b className=""> Título</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Título do serviço"
                                value={servico.titulo}
                                onChange={(e) => {
                                    setServico('titulo', e.target.value);
                                }}
                            />
                        </div>

                        <div className="form-group col-3">
                            <b className=""> Preço</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Preço do serviço"
                                value={servico.preco}
                                onChange={(e) => {
                                    setServico('preco', e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group col-3">
                            <b className=""> Recorrência</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Recorrência"
                                value={servico.recorrencia}
                                onChange={(e) => {
                                    setServico('recorrencia', e.target.value);
                                }}
                            />
                        </div>

                        <div className="form-group col-3">
                            <b className=""> Comissão %</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Comissão serviço"
                                value={servico.comissao}
                                onChange={(e) => {
                                    setServico('comissao', e.target.value);
                                }}
                            />
                        </div>

                        <div className="form-group col-4">
                            <b className=""> Duração</b>
                            <DatePicker
                                block
                                format="HH:mm"
                                value={moment(servico.duracao).toDate()}
                                hideMinutes={(min) => ![0, 30].includes(min)}
                                onChange={(e) => {
                                    console.log(
                                        'Valor de servico.duracao:',
                                        servico.duracao
                                    );
                                    setServico('duracao', e);
                                }}
                            />
                        </div>

                        <div className="form-group col-4">
                            <b className=""> Status</b>
                            <select
                                className="form-control"
                                value={servico.status}
                                onChange={(e) =>
                                    setServico('status', e.target.value)
                                }
                            >
                                <option value="A">Ativo</option>
                                <option value="I">Inativo</option>
                            </select>
                        </div>

                        <div className="form-group col-12">
                            <b className=""> Status</b>
                            <textarea
                                rows="5"
                                className="form-control"
                                placeholder="descrição"
                                value={servico.descricao}
                                onChange={(e) =>
                                    setServico('descricao', e.target.value)
                                }
                            ></textarea>
                        </div>

                        <div className="form-group col-12">
                            <b className="d-block">Imagens</b>

                            <Uploader
                                multiple
                                autoUpload={false}
                                listType="picture"
                                defaultFileList={servico.arquivos.map(
                                    (servico, index) => ({
                                        name: servico?.arquivo,
                                        key: index,
                                        url: `${consts.bucketUrl}/${servico?.arquivo}`,
                                    })
                                )}
                                onChange={(files) => {
                                    const arquivos = files
                                        .filter((file) => file.blobFile)
                                        .map((file) => file.blobFile);

                                    setServico('arquivos', arquivos);
                                }}
                                onRemove={(file) => {
                                    if (
                                        default_state === 'update' &&
                                        file.url
                                    ) {
                                        dispatch(removeArquivo(file.name));
                                    }
                                }}
                            >
                                <button>
                                    <Icon as={FaCamera} size="2em" />
                                </button>
                            </Uploader>
                        </div>
                    </div>
                    <Button
                        loading={form.saving}
                        color={default_state === 'create' ? 'green' : 'primary'}
                        size="lg"
                        block
                        onClick={() => save()}
                        className="mt-3"
                    >
                        {default_state === 'create' ? 'Salvar' : 'Atualizar'}
                        Serviço
                    </Button>
                    {default_state === 'update' && (
                        <Button
                            loading={form.saving}
                            color="red"
                            size="lg"
                            block
                            onClick={() => setComponent('delete', true)}
                            className="mt-1"
                        >
                            Remover
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
                        <h2 className="mb-4 mt-0">Serviços</h2>
                        <div>
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                    dispatch(resetServico());
                                    dispatch(
                                        updateServico({
                                            default_state: 'create',
                                        })
                                    );
                                    setComponent('drawer', true);
                                }}
                            >
                                <span className="mdi mdi-plus">
                                    Adicionar serviço
                                </span>
                            </button>
                        </div>
                    </div>

                    <Table
                        loading={form.filtering}
                        data={servicos}
                        config={[
                            {
                                label: 'Titulo',
                                key: 'titulo',
                                sortable: true,
                                fixed: true,
                                width: 200,
                            },
                            {
                                label: 'R$ PREÇO',
                                content: (servico) =>
                                    `R$ ${servico.preco.toFixed(2)}`,
                            },

                            {
                                label: '% COMISSÃO',
                                content: (servico) => `${servico.comissao} %`,
                            },
                            {
                                label: 'Recorrência',
                                content: (servico) =>
                                    `${servico.recorrencia} dias`,
                            },
                            {
                                label: 'Duracao',
                                key: 'duracao',
                                sortable: true,
                                content: (servico) =>
                                    moment(servico.duracao).format('HH:mm'),
                            },

                            {
                                label: 'Status',
                                key: 'status',
                                content: (servico) => (
                                    <Tag
                                        color={
                                            servico.status === 'A'
                                                ? 'green'
                                                : 'red'
                                        }
                                    >
                                        {servico.status === 'A'
                                            ? 'Ativo'
                                            : 'Inativo'}
                                    </Tag>
                                ),
                            },
                        ]}
                        actions={(servico) => (
                            <Button appearance="primary" color="blue" size="xs">
                                INFORMAÇÕES
                            </Button>
                        )}
                        onRowClick={(servico) => {
                            dispatch(
                                updateServico({
                                    servico,
                                    default_state: 'update',
                                })
                            );
                            console.log('horario', servico.duracao);
                            setComponent('drawer', true);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Servicos;
