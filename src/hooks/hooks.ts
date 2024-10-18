import { useState } from "react";
import { EventTypeDB, GroupType, ParticipantType, User } from "../redux/types/types";
import { useAppDispatch } from "../redux/hooks/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchAllUsers } from "../redux/thunks/thunks";

export const useManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [usersN, setUsersN] = useState<User[]>([]);
    const dispatch = useAppDispatch();
  
    const getUsers = () => {
      dispatch(fetchAllUsers())
        .then(unwrapResult)
        .then((result) => setUsers(Array.isArray(result)? result.sort((a, b) => a.name.localeCompare(b.name)): []))
        .catch(console.error);
    };
  
    const findUsers = (name: string) => {
      const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase())
      );
      setUsersN(filteredUsers.length > 0 ? filteredUsers : []);
    };
  
    const handleAddUser = (user: ParticipantType, smth: EventTypeDB | GroupType, setSmth: Function) => {
      console.log('handleAddUser1', user, smth.participants)
      debugger
        if (!smth.participants.find(p => p._id === user._id)) {
            debugger
            console.log('handleAddUser2', user, smth.participants)
        setSmth({
          ...smth,
          participants: [...smth.participants, {_id: user._id, name: user.name, telegramId: user.telegramId}],
        });
        debugger
        console.log('handleAddUser3', user, smth.participants)
      }

    };
  
    const handleDeleteUser = (userId: string, smth: EventTypeDB | GroupType, setSmth: Function) => {
      setSmth({
        ...smth,
        participants: smth.participants.filter(p => p._id !== userId),
      });
    };
  
    return { users, usersN, getUsers, findUsers, handleAddUser, handleDeleteUser };
  };
  