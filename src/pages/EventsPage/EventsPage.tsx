import { memo, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchAllEvents } from "../../redux/thunks/thunks";
import { EventTypeDB } from "../../redux/types/types";

import { setCurrentEvent, setEvents } from "../../redux/slices/eventsSlice";
import MyCalendar from "../../components/Calendar/Calendar";

const EventsPage = memo(() => {
  const navigate = useNavigate();
  const eventsFromState: EventTypeDB[] = useAppSelector(
    (state) => state.events.events
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cachedEvents = localStorage.getItem("events");
    if (!cachedEvents) {
      dispatch(fetchAllEvents()).then(() => {
        if (eventsFromState.length > 0) {
          localStorage.setItem("events", JSON.stringify(eventsFromState));
        }
      });
    } else {
      if (!eventsFromState.length) {
        dispatch(setEvents(JSON.parse(cachedEvents)));
      }
    }
  }, [dispatch, eventsFromState]);

  const handleEventClick = (event: EventTypeDB) => {
    console.log("Event clicked:", event);
    dispatch(setCurrentEvent(event));
    localStorage.setItem("currentEvent", JSON.stringify(event));
    navigate(`${event._id}`);
  };

  return (
    <>
      {" "}
      <MyCalendar events={eventsFromState} onEventClick={handleEventClick} />
    </>
  );
});

export default EventsPage;
