import React, { useEffect, useState } from "react";
import moment from "moment";
import cls from "./OneTrainingPage.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { FindUsers } from "../../components/AddParticipants/AddParticipants";
import { updateEventParticipants } from "../../redux/thunks/thunks";
import { toast } from "react-toastify";
import { clearUsers } from "../../redux/slices/userSlice";
import { ParticipantType } from "../../redux/types/types";

const OneTrainingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const events = useAppSelector((state) => state.events.events);
  const dispatch = useAppDispatch();
  const event = events.find((e) => e._id === id);

  if (!event) {
    return <div>Event not found</div>;
  }

  const { date, groupTitle, groupId, participants } = event;

  const deleteParticipantHandler = (_id: string, eventId: string) => {
    const newParticipants = participants.filter(
      (participant) => participant._id !== _id
    );
    dispatch(
      updateEventParticipants({ eventId, participants: newParticipants })
    );
  };

  const isParticipantExistInEvent = (
    participants: ParticipantType[],
    id: string
  ) => {
    return participants.find((p) => p._id === id);
  };

  const addParticipantHandler = (_id: string, name: string) => {
    if (isParticipantExistInEvent(participants, _id)) {
      toast.error("Этот бoец уже идет на трениpовку");
      return;
    }
    const newParticipants = [...participants, { _id, name }];
    const eventId = event._id;
    dispatch(
      updateEventParticipants({ eventId, participants: newParticipants })
    );
    dispatch(clearUsers());
    toast.success("Боец добавлен!");
  };

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
          participants={event.participants}
          addParticipants={addParticipantHandler}
        />
      </div>
    </div>
  );
};

export default OneTrainingPage;
