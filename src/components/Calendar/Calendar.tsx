// import {
//   Calendar,
//   dateFnsLocalizer } from "react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import enUS from "date-fns/locale/en-US";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { ParticipantType } from "../../redux/types/types";

// export interface EventTypeForCalendar {
//   title: string;
//   start: Date;
//   end: Date;
//   allDay?: boolean;
//   id: string | number;
//   participants: ParticipantType[];
//   groupId: string
// }

// const locales = {
//   "en-US": enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// interface MyCalendarProps {
//   eventsForCalendar: EventTypeForCalendar[];
//   onEventClick?: (event: EventTypeForCalendar) => void;
// }

// export const MyCalendar: React.FC<MyCalendarProps> = ({
//   eventsForCalendar,
//   onEventClick,
// }) => {
//   debugger
//   const handleSelectEvent = (event: EventTypeForCalendar) => {
//     if (onEventClick) {
//       onEventClick(event);
//     }
//   };

//   return (
//     <div>
//       <Calendar
//         localizer={localizer}
//         events={eventsForCalendar}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 800 }}
//         onSelectEvent={handleSelectEvent}
//       />
//     </div>
//   );
// };
import React from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
} from "date-fns";
import { useNavigate } from "react-router-dom";

// Импортируй EventTypeDB из нужного файла
// import './Calendar.css'; // CSS файл для стилизации
import { EventTypeDB } from "../../redux/types/types";

interface CalendarProps {
  events: EventTypeDB[];
  onEventClick?: (event: EventTypeDB) => void;
}

const MyCalendar: React.FC<CalendarProps> = ({ events, onEventClick }) => {
  const navigate = useNavigate();

  const currentDate = new Date();
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const daysOfMonth = eachDayOfInterval({ start: startDate, end: endDate });

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), day));
  };

  const handleSelectEvent = (event: EventTypeDB) => {
    if (onEventClick) {
      onEventClick(event);
    }
    localStorage.setItem("selectedEvent", JSON.stringify(event));
    navigate(`/admin/events/${event._id}`, { state: { event } });
  };
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button>Предыдущий месяц</button>
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
        <button>Следующий месяц</button>
      </div>
      <div className="calendar-grid">
        {daysOfMonth.map((day) => (
          <div key={day.toString()} className="calendar-day">
            <div className="date">{format(day, "d")}</div>
            <div className="events">
              {getEventsForDay(day).map((event) => (
                <div
                  key={event._id}
                  className="event"
                  onClick={() => handleSelectEvent(event)}
                >
                  <strong>{event.groupTitle}</strong>
                  <p>Участников: {event.participants.length}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCalendar;
