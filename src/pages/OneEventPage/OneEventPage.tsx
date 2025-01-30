import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-datepicker/dist/react-datepicker.css";
import "./Styles.css";
import cls from "./OneEventPage.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchEventById, updateEvent } from "../../redux/thunks/thunks";
import { EventTypeDB, ParticipantType } from "../../redux/types/types";
import UserList from "../../components/UserList/UserList";
import { uk } from "date-fns/locale";
import { Container } from "../../components/Container/Container";
import containerImage from "../../assets/PhoneForPagIvent.jpg";
import UpdateIcon from "@mui/icons-material/Update";
import { useRef } from "react";
//import { useManageUsers } from "../../hooks/hooks";
import {
  selectCurrentEvent,
  selectUsers,
} from "../../redux/selectors/selectors";
import { clearCurrentEvent } from "../../redux/slices/eventsSlice";

const OneEventPage: React.FC = () => {
  const { id } = useParams<string>();

  const isLoading = useAppSelector((state) => state.events.isLoading);

  const currentEvent = useAppSelector(selectCurrentEvent);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const [editedEvent, setEditedEvent] = useState<EventTypeDB | null>(null);
  const [showUpdateEvent, setShowUpdateEvent] = useState(true);
  const [showAdditionalUsers, setShowAdditionalUsers] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const [date, setDate] = useState(currentEvent?.date || "");
  const [groupTitle, setGroupTitle] = useState(currentEvent?.groupTitle || "");
  const [groupId, setGroupId] = useState(currentEvent?.groupId || "");
  const [isCancelled, setIsCanselled] = useState(
    currentEvent?.isCancelled || false
  );

  const [participants, setParticipants] = useState<Set<ParticipantType>>(
    new Set(currentEvent?.participants || [])
  );
  const usersInBase = useAppSelector(selectUsers);
  const availableParticipants = usersInBase.filter(
    (user) => ![...participants].some((p) => p._id === user._id)
  );
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
        participants: [...event.participants],
      })
    );
    setShowUpdateEvent(false);
    setShowAdditionalUsers(false);
    dispatch(fetchEventById(event._id));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDate(date.toISOString());
    }
  };

  console.log(editedEvent, "editedEvent");
  console.log(currentEvent, "currentEvent");
  console.log(
    date,
    groupId,
    groupTitle,
    participants,
    isCancelled,
    "date, groupId, groupTitle, participants, isCancelled,"
  );
  return (
    <Container
      ref={containerRef}
      isCentre={true}
      containerImage={containerImage}
    >
     {isLoading ? (
      <p>Loading...</p> // пока данные загружаются
    ) : (
      <div className={cls.trainingContainer}>
        <div className={cls.header}>
          <h3 className={cls.title}>Група: {groupTitle}</h3>
          {showUpdateEvent && (
            <button
              data-testid="updateIcon"
              onClick={() =>
                submitEvent({
                  _id: id!.toString(),
                  date,
                  groupTitle,
                  groupId,
                  isCancelled,
                  participants,
                })
              }
            >
              <UpdateIcon
                style={{ color: "blue", fontSize: "36px", cursor: "pointer" }}
                className={cls.upIcon}
              ></UpdateIcon>
            </button>
          )}
        </div>

        <div className={cls.date}>
          <span className={cls.text}>Тренування відбудеться</span>
          <p onClick={() => setShowCalendar(!showCalendar)}>
            {new Date(date).toLocaleString("uk-UA", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p onClick={() => setShowTimer(!showTimer)}>
            {new Date(date).toLocaleString("uk-UA", {
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
                selected={date ? new Date(date) : null}
                onChange={handleDateChange}
                dateFormat="Pp"
                inline
                locale={uk}
              />
            </div>
          </div>
        )}

        {showTimer && (
          <div className={cls.modalOverlay} onClick={() => setShowTimer(false)}>
            <div
              className={cls.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <DatePicker
                selected={date ? new Date(date) : null}
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

        {/* участники: */}
        <div className={cls.participants}>
          <h3 className={cls.h3}>Учасники:</h3>
          {participants.size > 0 ? (
            <ul>
              {[...participants].map((participant, index) => (
                <li key={index}>
                  {participant.name || "Не вказано"}

                  <DeleteIcon
                    data-testid="userInListDeleteBtn"
                    onClick={() => {
                      setParticipants(
                        new Set(
                          [...participants].filter(
                            (u) => u._id !== participant._id
                          )
                        )
                      );
                    }}
                    className={cls.deleteIcon}
                  />
                </li>
              ))}
            </ul>
          ) : (
         <p>Поки що ніхто не записався</p>

          )}
        </div>
        {/* возможные участники: */}

        <div className={cls.participants}>
          {showAdditionalUsers && (
            <UserList
              usersInComponent={participants}
              usersInBase={availableParticipants}
              setUsersInComponent={setParticipants}
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
      </div>)}
    </Container>
  );
};

export default OneEventPage;
