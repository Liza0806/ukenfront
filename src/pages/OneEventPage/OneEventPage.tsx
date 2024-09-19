import React, { useEffect, useState } from "react";
import cls from "./OneEventPage.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { fetchAllUsers, updateEvent } from "../../redux/thunks/thunks";
import { EventTypeDB, ParticipantType, User } from "../../redux/types/types";
import { getEventById } from "../../redux/api/eventsApi";
import { UserList } from "../../components/UserList/UserList";
import { FindUsers } from "../../components/FindUsers/FindUsers";
import { unwrapResult } from "@reduxjs/toolkit";

const OneEventPage: React.FC = () => {
  const { id } = useParams<string>();
  const [event, setEvent] = useState<EventTypeDB | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [usersN, setUsersN] = useState<User[]>([]);
  const [noUsersFound, setNoUsersFound] = useState(false);
  const [showUpdateEvent, setShowUpdateEvent] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      getEventById(id)
        .then((event) => setEvent(event))
        .catch((error) => console.error(error));
    }
  }, [id]);
  if (!event) {
    return <div> loading ...</div>;
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
      user.name.toLowerCase().includes(params)
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
    dispatch(updateEvent({ event }));
    setShowUpdateEvent(false);
    getUsers();
  };

  return (
    <div className={cls.trainingContainer}>
      <div className={cls.header}>
        <h3 className={cls.title}>{event.groupTitle}</h3>
        <p className={cls.date}>
          {new Date(event.date).toLocaleString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <div className={cls.participants}>
        <h4>Участники:</h4>
        <UserList
          users={event.participants} //
          deleteUser={handleDeleteUser}
        />{" "}
      </div>
      {users.length !== 0 && <FindUsers handleFindUsers={findUsers} />}
      {noUsersFound && <div>noUsersFound</div>}
      {users.length !== 0 && !noUsersFound && (
        <UserList
          users={usersN.length > 0 ? usersN : users}
          addUsers={handleAddUser}
        />
      )}
      {!users.length && (
        <button onClick={getUsers}>Показать возможных бойцов</button>
      )}
      <hr />
      {showUpdateEvent && (
        <button onClick={() => submitEvent(event)}>обновить встречу</button>
      )}
    </div>
  );
};

export default OneEventPage;
