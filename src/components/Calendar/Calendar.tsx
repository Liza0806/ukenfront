import './calendar.css'
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
import { uk } from "date-fns/locale";
import { Container } from "../../components/Container/Container";
import containerImage from '../../assets/Dyzayn-bez-nazvanyia-4.jpg';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


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
    setMonth(newStartDate.toLocaleString("uk-UA", { month: "long" }));
  }, [dif]);

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), day));
  };

  const handleSelectEvent = (event: EventTypeDB) => {
    localStorage.setItem("selectedEvent", JSON.stringify(event));
    navigate(`/events/${event._id}`, { state: { event } });
  };

  const lastMonth = () => {
    setDif((prev) => prev + 1);
  };

  const nextMonth = () => {
    setDif((prev) => prev - 1);
  };

  return (
   
      <div className="calendar">
      {events.length === 0 && <div>Завантаження тренувань... </div>}
      {events.length > 0 && (
        <div className='joincalendar'>
          <div className="calendar-header">
            
            
             <ArrowCircleLeftIcon  onClick={lastMonth} style={{ color: 'black',   fontSize: '36px', cursor: 'pointer'}} fontSize="inherit" />
             <h2>{month}</h2>
             <ArrowCircleRightIcon onClick={nextMonth} style={{ color: 'black',   fontSize: '36px', cursor: 'pointer'}} fontSize="inherit" />
          </div>
          <div className="calendar-grid">
            {daysOfMonth.map((day) => {
              const eventsForDay = getEventsForDay(day);
              return (
                <div key={day.toString()} className="calendar-day">
                  <div className="date">
                    {format(day, "d MMMM", { locale: uk })}
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
                          <p> {event.participants.length}</p>
                        </div>
                      ))
                    ) : (
                      <p>Тренувань немає</p>
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
