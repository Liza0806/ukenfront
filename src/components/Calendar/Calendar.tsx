import cls from "./Calendar.module.scss";
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
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const MyCalendar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [dif, setDif] = useState(0);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [daysOfMonth, setDaysOfMonth] = useState<Date[]>([]);
  const [month, setMonth] = useState<string>("");
  const [startDayOfWeek, setStartDayOfWeek] = useState(1);

  const events = useAppSelector((state) => state.events.events);
  const isLoading = useAppSelector((state) => state.events.isLoading);
  const error = useAppSelector((state) => state.events.error);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showEmptyCells = windowWidth > 760;

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

    // Приводим к началу недели (понедельник)
    const firstDay = newStartDate.getDay();
    setStartDayOfWeek(firstDay === 0 ? 6 : firstDay - 1);
  }, [dif]);

  const getEventsForDay = (day: Date) => {
    return events
      .filter((event) => isSameDay(new Date(event.date), day))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const handleSelectEvent = (event: EventTypeDB) => {
    navigate(`${event._id}`, { state: { event } });
  };

  const lastMonth = () => setDif((prev) => prev + 1);
  const nextMonth = () => setDif((prev) => prev - 1);

  // Заполняем пустые ячейки перед началом месяца
  const emptyCells = Array.from({ length: startDayOfWeek });

  return (
    <div className={cls.calendar}>
      {isLoading && <div>Завантаження тренувань... </div>}
      {error && <div>Помилка при завантаженні подій</div>}
      {events.length === 0 && <div>Немає тренувань...</div>}

      {events.length > 0 && (
        <div className={cls.joincalendar}>
          <div className={cls.calendarHeader}>
            <ArrowCircleLeftIcon
              onClick={lastMonth}
              style={{ color: "black", fontSize: "36px", cursor: "pointer" }}
            />
            <h2>{month}</h2>
            <ArrowCircleRightIcon
              onClick={nextMonth}
              style={{ color: "black", fontSize: "36px", cursor: "pointer" }}
            />
          </div>

          <div className={cls.calendarGrid}>
            {/* Пустые ячейки перед 1-м числом */}
            {showEmptyCells &&
              emptyCells.map((_, index) => (
                <div key={`empty-${index}`} className={cls.emptyCell}></div>
              ))}

            {/* Дни месяца */}
            {daysOfMonth.map((day) => {
              const eventsForDay = getEventsForDay(day);
              return (
                <div key={day.toString()} className={cls.calendarDay}>
                  <div className={cls.date}>
                    {format(day, "d MMMM", { locale: uk })}
                  </div>
                  <div className={cls.events}>
                    {eventsForDay.length > 0 ? (
                      eventsForDay.map((event) => (
                        <div
                          key={event._id}
                          className={cls.event}
                          onClick={() => handleSelectEvent(event)}
                        >
                          <strong>
                            {new Date(event.date).toLocaleString("uk-UA", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            , {event.groupTitle}
                          </strong>
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
