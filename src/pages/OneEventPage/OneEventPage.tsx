import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./Styles.css";
import cls from "./OneEventPage.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchEventById, updateEvent } from "../../redux/thunks/thunks";
import { EventTypeDB, GroupType } from "../../redux/types/types";
import  UserList from "../../components/UserList/UserList";
import { uk } from "date-fns/locale";
import { Container } from "../../components/Container/Container";
import containerImage from "../../assets/PhoneForPagIvent.jpg";
import UpdateIcon from "@mui/icons-material/Update";
import { useRef } from "react";
import { useManageUsers } from "../../hooks/hooks";
import { selectCurrentEvent } from "../../redux/selectors/selectors";
import { clearCurrentEvent } from "../../redux/slices/eventsSlice";

const OneEventPage: React.FC = () => {
  const { id } = useParams<string>();
  const currentEvent = useAppSelector(selectCurrentEvent);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const [editedEvent, setEditedEvent] = useState<EventTypeDB | null>(null);
  const [showUpdateEvent, setShowUpdateEvent] = useState(true);
  const [showAdditionalUsers, setShowAdditionalUsers] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  // реф для контейнера
  // const { users, getUsers } = useManageUsers();
  const { getUsers } = useManageUsers();
   ;
  console.log(currentEvent, "currentEvent");
  let scrollTop = 0;
  const handleScroll = () => {
    if (containerRef.current) {
      scrollTop = containerRef.current.scrollTop; // Получите значение скролла
    }
  };

  const inputRef = useRef<HTMLInputElement>(null); // Используем useRef для инпута

  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center", // Прокрутка к началу элемента
        inline: "nearest",
      });
    }
  };

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

   ;

  const submitEvent = (event: EventTypeDB) => {
    dispatch(updateEvent({ event })).then(() => {
      getUsers(); // Фетч участников после успешного обновления
    });
    setShowUpdateEvent(false);
  };

  const updateEventDate = (newDate: Date) => {
    if (editedEvent) {
      // Создаем новый объект с обновленным значением даты
      const updatedEvent = { ...editedEvent, date: newDate.toISOString() };
      setEditedEvent(updatedEvent);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      updateEventDate(date);
    }
  };
  console.log("render one event page");

  return (
    <Container
      ref={containerRef}
      isCentre={true}
      containerImage={containerImage}
    >
      {editedEvent && (
        <div className={cls.trainingContainer}>
          <div className={cls.header}>
            <h3 className={cls.title}>Група: {editedEvent.groupTitle}</h3>
            {showUpdateEvent && (
              <button
                data-testid="updateIcon"
                onClick={() => submitEvent(editedEvent!)}
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
              {new Date(editedEvent?.date).toLocaleString("uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <p onClick={() => setShowTimer(!showTimer)}>
              {new Date(editedEvent?.date).toLocaleString("uk-UA", {
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
                    editedEvent?.date ? new Date(editedEvent.date) : null
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
                    editedEvent?.date ? new Date(editedEvent.date) : null
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
            {editedEvent.participants.length !== 0 && (
              <UserList
                existingUsers={editedEvent.participants}
                smth={editedEvent}
                setSmth={
                  setEditedEvent as React.Dispatch<
                    React.SetStateAction<EventTypeDB | GroupType | undefined>
                  >
                }
              />
            )}
          </div>
          {editedEvent.participants.length === 0 && (
            <p>Поки, що ніхто не записався</p>
          )}

          {/* возможные участники: */}

          <div className={cls.participants}>
            {showAdditionalUsers && (
              <UserList
                smth={editedEvent}
                setSmth={
                  setEditedEvent as React.Dispatch<
                    React.SetStateAction<EventTypeDB | GroupType | undefined>
                  >
                }
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
