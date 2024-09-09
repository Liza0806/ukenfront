import React, { useEffect, useState } from "react";
import moment from "moment";
import cls from "./OneTrainingPage.module.scss";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { FindUsers } from "../../components/AddParticipants/AddParticipants";
import { updateEventParticipants } from "../../redux/thunks/thunks";
import { toast } from "react-toastify";
import { clearUsers } from "../../redux/slices/userSlice";
import { EventTypeDB, ParticipantType } from "../../redux/types/types";
import { useLocation } from "react-router-dom";

const OneTrainingPage: React.FC = () => {
  const [event, setEvent] = useState<EventTypeDB | null>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  let participants: ParticipantType[] = event?.participants? [...event?.participants] : [];
  useEffect(() => {
    const fetchedEvent = location.state?.event as EventTypeDB;

    if (fetchedEvent) {
      setEvent(fetchedEvent);
    } else {
      const selectedEvent = localStorage.getItem("selectedEvent");
      if (selectedEvent) {
        setEvent(JSON.parse(selectedEvent));
      }
    }
  }, [location.state]);

  if (!event) {
    return <div>Event not found</div>;
  }
  const { date, groupTitle, groupId } = event;

  const deleteParticipantHandler = (_id: string, eventId: string) => {
    const newParticipants = participants.filter(
      (participant) => participant._id !== _id
    );
    participants = newParticipants
    dispatch(
      updateEventParticipants({ eventId, participants: participants })
    );
    toast.success("Боец удален!");
  };

  const isParticipantExistInEvent = (
    id: string
  ) => {
    return participants.find((p) => p._id === id);
  };

  const addParticipantHandler = (_id: string, name: string) => {
    if (isParticipantExistInEvent(_id)) {
      toast.error("Этот боец уже идет на тренировку");
      return;
    } else{
    participants.push({_id: _id, name: name})
    toast.success("Боец добавлен!");

  }
    // const newParticipants: ParticipantType[] = [...participants, { _id, name }];
    // const eventId = event._id;

   // dispatch(updateEventParticipants({ eventId, participants: newParticipants }));
    
  //   setEvent((prevEvent) => {
  //     if (!prevEvent) return prevEvent;

  //     const updatedParticipants = [...prevEvent.participants, { _id, name }];
  //     return { ...prevEvent, participants: updatedParticipants };
  //  }
  // );

  //   dispatch(clearUsers());
  };
  const updateParticicpantsInterface = (participants: ParticipantType[]) => {
    setEvent((prevEvent) => {
          if (!prevEvent) return prevEvent;
          return { ...prevEvent, participants: participants };
       })
  }
  return (
    <div className={cls.trainingPage}>
      <h1>Training Details</h1>
      <div className={cls.trainingDetails}>
        <p>
          <strong>Group Id:</strong> {groupId}
        </p>
        <p>
          <strong>Date:</strong> {moment(date).format("YYYY-MM-DD HH:mm:ss")}
        </p>
        <p>
          <strong>Group Title:</strong> {groupTitle}
        </p>
        {participants.length ? (
          <ul>
            {participants.map((p) => {
              return (
                <li key={p._id}>
                  <p>{p.name}</p>
                  <button
                    onClick={() => deleteParticipantHandler(p._id, event._id)}
                  >
                    x
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>no participants</p>
        )}
        <FindUsers
          eventId={event._id}
          participants={participants}
          addParticipants={addParticipantHandler}
          updateParticicpantsInterface={updateParticicpantsInterface}
        />
      
      </div>
    </div>
  );
};

export default OneTrainingPage;
