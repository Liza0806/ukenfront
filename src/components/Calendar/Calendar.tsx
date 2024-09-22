import React, { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  subMonths,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import { EventTypeDB } from "../../redux/types/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchAllEvents } from "../../redux/thunks/thunks";
import { ru as ruLocale } from "date-fns/locale";

const MyCalendar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [dif, setDif] = useState(0);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [daysOfMonth, setDaysOfMonth] = useState<Date[]>([]);
  const [month, setMonth] = useState<string>("");

  const events = useAppSelector((state) => state.events.events);

  // Фетчим ивенты при первом рендере
  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  useEffect(() => {
    const newStartDate = startOfMonth(subMonths(new Date(), dif));
    const newEndDate = endOfMonth(newStartDate);
    const newDaysOfMonth = eachDayOfInterval({
      start: newStartDate,
      end: newEndDate,
    });
    setStartDate(newStartDate);
    setDaysOfMonth(newDaysOfMonth);
    setMonth(newStartDate.toLocaleString("ru-RU", { month: "long" }));
  }, [dif]);

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), day));
  };

  const handleSelectEvent = (event: EventTypeDB) => {
    localStorage.setItem("selectedEvent", JSON.stringify(event));
    navigate(`/admin/events/${event._id}`, { state: { event } });
  };

  const lastMonth = () => {
    setDif((prev) => prev + 1);
  };

  const nextMonth = () => {
    setDif((prev) => prev - 1);
  };

  return (
    <div className="calendar">
      {events.length === 0 && <div>Загрузка тренировок... </div>}
      {events.length > 0 && (
        <div>
          <div className="calendar-header">
            <button onClick={lastMonth}>Предыдущий месяц</button>
            <h2>{month}</h2>
            <button onClick={nextMonth}>Следующий месяц</button>
          </div>
          <div className="calendar-grid">
            {daysOfMonth.map((day) => {
              const eventsForDay = getEventsForDay(day);
              return (
                <div key={day.toString()} className="calendar-day">
                  <div className="date">
                    {format(day, "d MMMM", { locale: ruLocale })}
                  </div>
                  <div className="events">
                    {eventsForDay.length > 0 ? (
                      eventsForDay.map((event) => (
                        <div
                          key={event._id}
                          className="event"
                          onClick={() => handleSelectEvent(event)}
                        >
                          <strong>{event.groupTitle}</strong>
                          <p>Участников: {event.participants.length}</p>
                        </div>
                      ))
                    ) : (
                      <p>Тренировок нет</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
