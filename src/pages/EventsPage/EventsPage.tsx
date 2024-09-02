import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchAllEvents } from "../../redux/thunks/thunks";
import { EventTypeDB } from "../../redux/types/types";
import {
  EventTypeForCalendar,
  MyCalendar,
} from "../../components/Calendar/Calendar";

const EventsPage = () => {
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(fetchAllEvents());
    }
  }, [dispatch, isFirstRender]);

  const events: EventTypeDB[] = useAppSelector((state) => state.events.events);

  const eventsForCalendar = useMemo(
    () =>
      events.map((e) => {
        const startDate = new Date(e.date);
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 1);

        return {
          title: e.groupTitle,
          start: startDate,
          end: endDate,
          allDay: false,
          id: e._id,
        };
      }),
    [events]
  );

  const handleEventClick = (event: EventTypeForCalendar) => {
    console.log("Event clicked:", event);
    navigate(`${event.id}`);
  };

  return (
    <MyCalendar events={eventsForCalendar} onEventClick={handleEventClick} />
  );
};

export default EventsPage;
