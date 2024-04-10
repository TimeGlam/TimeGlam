import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect } from 'react';
const localizer = momentLocalizer(moment);
function Agendamentos() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: '@adgendamento/FILTER',
            start: moment().weekday(0).format('YYYY-MM-DD'),
            end: moment().weekday(6).format('YYYY-MM-DD'),
        });
    }, []);
    return (
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4 mt-0">Agendamentos</h2>
                    <Calendar
                        localizer={localizer}
                        events={[
                            {
                                title: 'Evento',
                                start: moment().toDate(),
                                end: moment().add(90, 'minutes').toDate(),
                            },
                        ]}
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
