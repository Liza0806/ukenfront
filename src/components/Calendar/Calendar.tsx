import { Calendar, dateFnsLocalizer, Event as CalendarEvent } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css';

export interface EventTypeForCalendar {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    id: string | number; 
}

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface MyCalendarProps {
    events: EventTypeForCalendar[];
    onEventClick?: (event: EventTypeForCalendar) => void; 
}

export const MyCalendar: React.FC<MyCalendarProps> = ({ events, onEventClick }) => {

    const handleSelectEvent = (event: EventTypeForCalendar) => {
        if (onEventClick) {
            onEventClick(event);
        }
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 800 }}
                onSelectEvent={handleSelectEvent} 
            />
        </div>
    );
}
