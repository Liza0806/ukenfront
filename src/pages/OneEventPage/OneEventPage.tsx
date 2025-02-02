import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-datepicker/dist/react-datepicker.css";
import "./Styles.css";
import cls from "./OneEventPage.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchEventById, updateEvent } from "../../redux/thunks/thunks";
import { EventTypeDB } from "../../redux/types/types";
import UserList from "../../components/UserList/UserList";
import { uk } from "date-fns/locale";
import { Container } from "../../components/Container/Container";
import containerImage from "../../assets/PhoneForPagIvent.jpg";
import UpdateIcon from "@mui/icons-material/Update";
import { useRef } from "react";
import {
  selectCurrentEvent,
  selectUsers,
} from "../../redux/selectors/selectors";
import {
  clearCurrentEvent,
  updateCurrentEvent,
} from "../../redux/slices/eventsSlice";

const OneEventPage: React.FC = () => {
  const { id } = useParams<string>();

  const isLoading = useAppSelector((state) => state.events.isLoading);

  const currentEvent = useAppSelector(selectCurrentEvent);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const [editedEvent, setEditedEvent] = useState<EventTypeDB | null>(null);
  const [showAdditionalUsers, setShowAdditionalUsers] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const usersInBase = useAppSelector(selectUsers) || [];
  const availableParticipants = useMemo(() => {
    return usersInBase.filter(user => 
      !currentEvent?.participants?.some(p => p._id === user._id)
    );
  }, [usersInBase, currentEvent?.participants]);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id)); // Загружаем ивент
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentEvent && currentEvent !== editedEvent) {
      setEditedEvent(currentEvent); // Только если данные отличаются
    }
  }, [currentEvent, editedEvent]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentEvent()); // Очищаем состояние при размонтировании
      setEditedEvent(null);
    };
  }, [dispatch]);

  const submitEvent = (event: EventTypeDB) => {
    dispatch(
      updateEvent({
        _id: event._id,
        date: event.date,
        groupId: event.groupId,
        groupTitle: event.groupTitle,
        isCancelled: event.isCancelled,
        participants: event.participants,
      })
    ).then(()=>dispatch(fetchEventById(event._id)));
    setShowAdditionalUsers(false);
   
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      dispatch(updateCurrentEvent({ date: date.toISOString() }));
    }
  };

  const handleRemoveParticipant = (participantId: string) => {
    if (!currentEvent) return;
    const updatedParticipants = currentEvent.participants.filter(
      (u) => u._id !== participantId
    );

    dispatch(updateCurrentEvent({ participants: updatedParticipants }));
  };

  return (
    <Container
      ref={containerRef}
      isCentre={true}
      containerImage={containerImage}
    >
      {!currentEvent || isLoading? (
        <p>Loading...</p> // 
      ) : (
        <div className={cls.trainingContainer}>
          <div className={cls.header}>
            <h3 className={cls.title}>Група: {currentEvent.groupTitle}</h3>

            <button
              data-testid="updateIcon"
              onClick={() =>
                submitEvent({
                  _id: currentEvent._id.toString(),
                  date: currentEvent.date,
                  groupTitle: currentEvent.groupTitle,
                  groupId: currentEvent.groupId,
                  isCancelled: currentEvent.isCancelled,
                  participants: currentEvent.participants,
                })
              }
            >
              <UpdateIcon
                style={{ color: "blue", fontSize: "36px", cursor: "pointer" }}
                className={cls.upIcon}
              ></UpdateIcon>
            </button>
          </div>

          <div className={cls.date}>
            <span className={cls.text}>Тренування відбудеться</span>
            <p onClick={() => setShowCalendar(!showCalendar)}>
              {new Date(currentEvent.date).toLocaleString("uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <p onClick={() => setShowTimer(!showTimer)}>
              {new Date(currentEvent.date).toLocaleString("uk-UA", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {showCalendar && (
            <div
              className={cls.modalOverlay}
              onClick={() => setShowCalendar(false)}
            >
              <div
                className={cls.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <DatePicker
                  selected={
                    currentEvent.date ? new Date(currentEvent.date) : null
                  }
                  onChange={handleDateChange}
                  dateFormat="Pp"
                  inline
                  locale={uk}
                />
              </div>
            </div>
          )}

          {showTimer && (
            <div
              className={cls.modalOverlay}
              onClick={() => setShowTimer(false)}
            >
              <div
                className={cls.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <DatePicker
                  selected={
                    currentEvent.date ? new Date(currentEvent.date) : null
                  }
                  onChange={handleDateChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={1}
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                  inline
                  locale={uk}
                />
              </div>
            </div>
          )}

          {/* участники: */}
          <div className={cls.participants}>
            <h3 className={cls.h3}>Учасники:</h3>
            {[...currentEvent.participants].length > 0 ? (
              <ul>
                {[...currentEvent.participants].map((participant, index) => (
                  <li key={index}>
                    {participant.name || "Не вказано"}

                    <DeleteIcon
                      data-testid="userInListDeleteBtn"
                      onClick={() => handleRemoveParticipant(participant._id)}
                      className={cls.deleteIcon}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>На тренировку пока никто не записался</p>
            )}
          </div>
          {/* возможные участники: */}

          <div className={cls.participants}>
            {showAdditionalUsers &&
              availableParticipants &&
              availableParticipants.length > 0 && (
                <UserList
                  usersInComponent={currentEvent.participants}
                  usersInBase={availableParticipants}
                  setUsersInComponent={updateCurrentEvent}
                />
              )}
          </div>

          {!showAdditionalUsers && (
            <button
              data-testid="ShowAdditionalUsers"
              type="button"
              className={cls.buttonOpen}
              onClick={() => setShowAdditionalUsers(true)}
            >
              показать дополнительных юзеров
            </button>
          )}
        </div>
      )}
    </Container>
  );
};

export default OneEventPage;
