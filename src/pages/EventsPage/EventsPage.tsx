import { EventTypeDB } from "../../redux/types/types";

import MyCalendar from "../../components/Calendar/Calendar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useEffect, useState } from "react";
import { fetchAllEvents, fetchAllUsers } from "../../redux/thunks/thunks";
import { selectUsers } from "../../redux/selectors/selectors";
import { Modal } from "../../components/Modal/Modal"
import { EventFormModal } from "../../components/EventFormModal/EventFormModal";

const EventsPage = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);
const [showModal, setShowModal] = useState(false)

    useEffect(() => {
      dispatch(fetchAllEvents());
       if(users.length === 0 || !users){
            dispatch(fetchAllUsers()); 
          }
    }, [dispatch]);
  
  return (
    <>
      <MyCalendar />
      {showModal && <Modal children={<EventFormModal/>} onClose={()=>setShowModal(false)} open={showModal}/>}
        <button onClick={()=>setShowModal(!showModal)}>добавить тренировку</button>
    </>
  );
};

export default EventsPage;
