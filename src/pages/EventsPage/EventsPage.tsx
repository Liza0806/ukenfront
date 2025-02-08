import { EventTypeDB } from "../../redux/types/types";

import MyCalendar from "../../components/Calendar/Calendar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useEffect } from "react";
import { fetchAllEvents, fetchAllUsers } from "../../redux/thunks/thunks";
import { selectUsers } from "../../redux/selectors/selectors";

const EventsPage = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);
    useEffect(() => {
      dispatch(fetchAllEvents());
       if(users.length === 0 || !users){
            dispatch(fetchAllUsers()); 
          }
    }, [dispatch]);
  
  return (
    <>
      <MyCalendar />
    </>
  );
};

export default EventsPage;
