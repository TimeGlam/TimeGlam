import { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { filterAgendamento } from '../../store/modules/agendamento/actions';
import utils from '../../utils';
const localizer = momentLocalizer(moment);
function Agendamentos() {
    const dispatch = useDispatch();
    const { agendamentos } = useSelector((state) => state.agendamento);

    const formatEventos = agendamentos.map((agendamento) => ({
        title: `${agendamento.servicoId.titulo} - ${agendamento.clienteId.nome} - ${agendamento.colaboradorId.nome}`,
        start: moment(agendamento.data).toDate(),
        end: moment(agendamento.data)
            .add(
                utils.hourToMinutes(
                    moment(agendamento.servicoId.duracao).format('HH:mm')
                ),
                'minutes'
            )
            .toDate(),
    }));
    const formatPeriodo = (periodo) => {
        let periodoFinal = {};

        if (Array.isArray(periodo)) {
            periodoFinal = {
                start: moment(periodo[0]).format('YYYY-MM-DD'),
                end: moment(periodo[periodo.length - 1]).format('YYYY-MM-DD'),
            };
        } else {
            periodoFinal = {
                start: moment(periodo.start).format('YYYY-MM-DD'),
                end: moment(periodo.end).format('YYYY-MM-DD'),
            };
        }
        return periodoFinal;
    };

    useEffect(() => {
        dispatch(
            filterAgendamento(
                moment().weekday(0).format('YYYY-MM-DD'),
                moment().weekday(6).format('YYYY-MM-DD')
            )
        );
        //    start: moment().weekday(0).format('YYYY-MM-DD'),
        //  end: moment().weekday(6).format('YYYY-MM-DD'),
    }, []);
    return (
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4 mt-0">Agendamentos</h2>
                    <Calendar
                        localizer={localizer}
                        onRangeChange={(periodo) => {
                            const { start, end } = formatPeriodo(periodo);
                            dispatch(filterAgendamento(start, end));
                        }}
                        events={formatEventos}
                        startAccessor="start"
                        defaultView="week"
                        endAccessor="end"
                        selectable={true}
                        popup
                        style={{ height: 600 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Agendamentos;
