import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment, { weekdays } from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);
function Agendamentos() {
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
