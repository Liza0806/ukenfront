import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./Styles.css"
import cls from './OneEventPage.module.scss'
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { fetchAllUsers, updateEvent } from "../../redux/thunks/thunks";
import { EventTypeDB, ParticipantType, User } from "../../redux/types/types";
import { getEventById } from "../../redux/api/eventsApi";
import { UserList } from "../../components/UserList/UserList";
import { FindUsers } from "../../components/FindUsers/FindUsers";
import { unwrapResult } from "@reduxjs/toolkit";
import { uk } from 'date-fns/locale';
import { Container } from "../../components/Container/Container";
import containerImage from '../../assets/PhoneForPagIvent.jpg';




const OneEventPage: React.FC = () => {
  const { id } = useParams<string>();
  const [event, setEvent] = useState<EventTypeDB | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [usersN, setUsersN] = useState<User[]>([]);
  const [noUsersFound, setNoUsersFound] = useState(false);
  const [showUpdateEvent, setShowUpdateEvent] = useState(false);
  
  const dispatch = useAppDispatch();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  


  useEffect(() => {
    if (id) {
      getEventById(id)
        .then((event) => setEvent(event))
        .catch((error) => console.error(error));
    }
  }, [id]);

  useEffect(() => {
    // Обновление даты происходит напрямую через event.date
  }, [event]);

  if (!event) {
    return <div>Загрузка...</div>;
  }

  const handleDeleteUser = (id: string) => {
    const newParticipants = event.participants.filter(
      (participant) => participant._id !== id
    );
    setEvent({ ...event, participants: newParticipants });
    setShowUpdateEvent(true);
  };

  const handleAddUser = (participant: ParticipantType) => {
    const isAlreadyExist = event.participants.find(
      (p) => p._id === participant._id
    );
    if (isAlreadyExist) {
      return;
    }
    setEvent({ ...event, participants: [...event.participants, participant] });
    setShowUpdateEvent(true);
  };

  const getUsers = () => {
    dispatch(fetchAllUsers())
      .then((response) => {
        try {
          const result = unwrapResult(response);
          if (result !== "error") {
            const sortedUsers = result.sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
            setUsers(sortedUsers as User[]);
          } else {
            setUsers([]);
          }
        } catch (error) {
          console.error("Ошибка при получении пользователей:", error);
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error("Ошибка при запросе:", error);
        setUsers([]);
      });
  };

  const findUsers = (params: string) => {
    const newUsersN = users.filter((user) =>
      user.name.toLowerCase().includes(params.toLowerCase())
    );
    if (newUsersN.length === 0) {
      setNoUsersFound(true);
    } else {
      const sortedUsers = newUsersN.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setNoUsersFound(false);
      setUsersN(sortedUsers);
    }
  };

  const submitEvent = (event: EventTypeDB) => {
    dispatch(updateEvent({ event })); // тут шлем на бекенд обновленный ивент
    setShowUpdateEvent(false); // тут я скрывала кнопку "обновить"
    getUsers(); // фетчим заново всех участников, чтобы пришли обновленные данные
  };

  const updateEventDate = (newDate: Date) => {
    if (event) {
      // Создаем новый объект с обновленным значением даты
      const updatedEvent = { ...event, date: newDate };
      setEvent(updatedEvent);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      updateEventDate(date);
    }
  }; 

  return (
    <Container isCentre={true} containerImage = {containerImage}>  
      <div className={cls.trainingContainer}>
        <div className={cls.header}>
          <h3 className={cls.title}>Група: {event.groupTitle}</h3>
        </div>
        <div className={cls.date}>
          <span className={cls.text}>Тренування відбудеться</span>
          <p onClick={() => setShowCalendar(!showCalendar)}>
            {new Date(event.date).toLocaleString("uk-UA", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p onClick={() => setShowTimer(!showTimer)}>
            {new Date(event.date).toLocaleString("uk-UA", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {showCalendar && (
          <div className={cls.modalOverlay} onClick={() => setShowCalendar(false)}>
            <div className={cls.modalContent} onClick={(e) => e.stopPropagation()}>
              <DatePicker
                selected={event.date ? new Date(event.date) : null}
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
            <div className={cls.modalContent} onClick={(e) => e.stopPropagation()}>
              <DatePicker
                selected={event.date ? new Date(event.date) : null}
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
         
        <div className={cls.participants}>
        <h4 className={cls.participantsTitle}>Учасники:</h4>
          <ul>
            {event.participants.map((participant) => (
              <li key={participant._id}>
                {participant.name}
                <button onClick={() => handleDeleteUser(participant._id)}>X</button>
              </li>
            ))}
          </ul>
        </div>

        {users.length !== 0 && <FindUsers handleFindUsers={findUsers} />}
        {noUsersFound && <div>Пользователи не найдены</div>}
        
        {users.length !== 0 && !noUsersFound && (
          <UserList
            users={usersN.length > 0 ? usersN : users}
            addUsers={handleAddUser}
          />
        )}
        
        {!users.length && (
          <button type="button" className={cls.buttonOpen} onClick={getUsers}>Додати</button>
        )}

        <hr />

        {showUpdateEvent && (
          <button className={cls.buttonOpen} onClick={() => submitEvent(event)}>Обновити подію</button>
        )}
      </div>
    </Container>
  );
};


export default OneEventPage;