import { useEffect, useState } from "react";
import { EventTypeDB, GroupType, PartialUserWithRequiredFields, ParticipantType, User } from "../redux/types/types";
import { useAppDispatch } from "../redux/hooks/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchAllUsers } from "../redux/thunks/thunks";

type useManageUsersProps = {
  users?: PartialUserWithRequiredFields[] | User[]
}

export const useManageUsers = (props?: useManageUsersProps) => {

    const [users, setUsers] = useState<PartialUserWithRequiredFields[] | User[]>([]);
    const [usersN, setUsersN] = useState<PartialUserWithRequiredFields[] | User[]>([]);
    const dispatch = useAppDispatch();

    const getUsers = async () => {
      await  dispatch(fetchAllUsers())
          .then(unwrapResult)
          .then((result) => setUsers(result))
          .catch(console.error);
      };
      useEffect(() => {
        if (props?.users) {
          setUsers(props?.users); // Если users переданы в пропсах, обновляем состояние
        } else {
          getUsers(); // Если нет, загружаем их
        }
      }, [props?.users]);

  
  // console.log(users, 'users')
    const findUsers = (name: string) => {
      if (users.length === 0) {
        console.log("Users are still loading.");
        return; // Не выполняем фильтрацию, пока данные не загружены
      }
    
      const filteredUsers = users.filter((user) =>
        user!.name!.toLowerCase().includes(name.toLowerCase())
      );
      setUsersN(filteredUsers.length > 0 ? filteredUsers : []);
    };

    const handleAddUser = (user: Partial<User> , smth: EventTypeDB | GroupType, setSmth: Function) => {
    //  console.log('handleAddUser1', user, smth.participants)

        if (!smth.participants.find(p => p._id === user._id)) {
     
          //  console.log('handleAddUser2', user, smth.participants)
        setSmth({
          ...smth,
          participants: [...smth.participants, {_id: user._id, name: user.name, telegramId: user.telegramId}],
        });
     
      //  console.log('handleAddUser3', user, smth.participants)
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
  