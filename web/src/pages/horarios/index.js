import { useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import InfoRoundIcon from '@rsuite/icons/InfoRound';
import { DatePicker, Drawer, TagPicker, Button, Modal } from 'rsuite';
import {
    allServices,
    allHorarios,
    updateHorario,
    filterColaboradores,
    removeHorario,
    addHorario,
} from '../../store/modules/horario/actions';
import moment from 'moment';
import 'moment/locale/pt-br';

const localizer = momentLocalizer(moment);

function Horarios() {
    const dispatch = useDispatch();
    const {
        horarios,
        colaboradores,
        horario,
        servicos,
        components,
        form,
        default_state,
    } = useSelector((state) => state.horario);

    const setComponent = (component, state) => {
        dispatch(
            updateHorario({
                components: { ...components, [component]: state },
            })
        );
    };

    const diasSemana = [
        'domingo',
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado',
    ];

    const setHorario = (key, value) => {
        dispatch(
            updateHorario({
                horario: { ...horario, [key]: value },
            })
        );
    };
    const remover = () => {
        dispatch(removeHorario());
    };

    const save = () => {
        dispatch(addHorario());
    };

    const diasSemanaData = [
        new Date(2023, 3, 9, 0, 0, 0, 0), // domingo
        new Date(2023, 3, 10, 0, 0, 0, 0), // segunda-feira
        new Date(2023, 3, 11, 0, 0, 0, 0), // terça-feira
        new Date(2023, 3, 12, 0, 0, 0, 0), // quarta-feira
        new Date(2023, 3, 13, 0, 0, 0, 0), // quinta-feira
        new Date(2023, 3, 14, 0, 0, 0, 0), // sexta-feira
        new Date(2023, 3, 15, 0, 0, 0, 0), // sábado
    ];

    const formatEvents = () => {
        let listaEventos = [];

        horarios.map((hor) => {
            hor.dias.map((dia) => {
                listaEventos.push({
                    resource: { horario: hor },
                    title: `${hor.especialidades.length} espec. e ${hor.colaboradores.length} colab. disponíveis`,
                    start: new Date(
                        diasSemanaData[dia].setHours(
                            parseInt(moment(hor.inicio).format('HH')),
                            parseInt(moment(hor.inicio).format('mm'))
                        )
                    ),
                    end: new Date(
                        diasSemanaData[dia].setHours(
                            parseInt(moment(hor.fim).format('HH')),
                            parseInt(moment(hor.fim).format('mm'))
                        )
                    ),
                });
            });
        });

        return listaEventos;
    };

    useEffect(() => {
        dispatch(allHorarios());
        dispatch(allServices());
    }, [dispatch]);

    useEffect(() => {
        dispatch(filterColaboradores());
    }, [horario.especialidades]);

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
                        Horário
                    </h3>
                    <div className="row mt-3">
                        <div className="form-group col-12">
                            <b className="">Dias Semana</b>
                            <TagPicker
                                size="lg"
                                block
                                value={horario.dias}
                                data={diasSemana.map((label, value) => ({
                                    label,
                                    value,
                                }))}
                                onChange={(value) => {
                                    setHorario('dias', value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <b className="d-block">Início</b>
                        <DatePicker
                            size="lg"
                            block
                            format="HH:mm"
                            hideMinutes={(min) => ![0, 30].includes(min)}
                            value={horario.inicio}
                            onChange={(e) => {
                                setHorario('inicio', e);
                            }}
                        />
                    </div>
                    <div className="row mt-3">
                        <b className="d-block">Fim</b>
                        <DatePicker
                            size="lg"
                            block
                            format="HH:mm"
                            hideMinutes={(min) => ![0, 30].includes(min)}
                            value={horario.fim}
                            onChange={(e) => {
                                setHorario('fim', e);
                            }}
                        />
                    </div>
                    <div className="row mt-3">
                        <b className="d-block">Especialidades disponíveis</b>
                        <TagPicker
                            size="lg"
                            block
                            data={servicos}
                            value={horario.especialidades}
                            onChange={(e) => {
                                setHorario('especialidades', e);
                            }}
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <b className="d-block">Colaboradores</b>
                        <TagPicker
                            size="lg"
                            block
                            data={colaboradores}
                            value={horario.colaboradores}
                            onChange={(colaboradores) => {
                                setHorario('colaboradores', colaboradores);
                            }}
                        />
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
                        Horário
                    </Button>
                    {default_state === 'update' && (
                        <Button
                            loading={form.saving}
                            color="red"
                            appearance="primary"
                            block
                            onClick={() => setComponent('delete', true)}
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
                    Tem certeza que deseja remover?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        loading={form.saving}
                        onClick={() => remover()}
                        color="red"
                        appearance="primary"
                    >
                        Sim, desejo remover
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
                        <h2 className="mb-4 mt-0">Horários - Atendimento</h2>
                        <div>
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                    dispatch(
                                        updateHorario({
                                            default_state: 'create',
                                        })
                                    );
                                    setComponent('drawer', true);
                                }}
                            >
                                <span className="mdi mdi-plus">
                                    Resgistrar horário
                                </span>
                            </button>
                        </div>
                    </div>

                    <Calendar
                        onSelectEvent={(eventoSelecionado) => {
                            const { resource, start, end } = eventoSelecionado;
                            dispatch(
                                updateHorario({
                                    horario: {
                                        ...resource.horario,
                                        dias: resource.horario.dias,
                                        inicio: start,
                                        fim: end,
                                    },

                                    default_state: 'update',
                                })
                            );
                            setComponent('drawer', true);
                        }}
                        localizer={localizer}
                        formats={{
                            dateFormat: 'dd',
                            dayFormat: (date, culture, localizer) =>
                                localizer.format(date, 'dddd', culture),
                        }}
                        onSelectSlot={(slotSelecionado) => {
                            const { start, end } = slotSelecionado;
                            dispatch(
                                updateHorario({
                                    horario: {
                                        ...horario,
                                        dias: [moment(start).day()],
                                        inicio: start,
                                        fim: end,
                                    },
                                    default_state: 'create',
                                })
                            );
                            setComponent('drawer', true);
                        }}
                        events={formatEvents()}
                        defaultDate={diasSemanaData[0]}
                        selectable={true}
                        popup={true}
                        toolbar={false}
                        view="week"
                        style={{ height: '70vh', minHeight: '70vh' }}
                        culture="pt-br"
                        defaultView
                    />
                </div>
            </div>
        </div>
    );
}

export default Horarios;
