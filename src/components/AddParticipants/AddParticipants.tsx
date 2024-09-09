import React, { FormEventHandler, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  fetchAllEvents,
  fetchAllUsers,
  fetchUsersByName,
  updateEventParticipants,
} from "../../redux/thunks/thunks";
import { useLocation, useNavigate } from "react-router-dom";
import { ParticipantType, User } from "../../redux/types/types";
import { clearUsers } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { getAllEvents } from "../../redux/api/eventsApi";

interface FindUsersProps {
  eventId: string;
  participants: ParticipantType[];
  addParticipants: (_id: string, name: string) => void;
  updateParticicpantsInterface: (participants: ParticipantType[])=> void;
}

export const FindUsers: React.FC<FindUsersProps> = ({ addParticipants, eventId, participants, updateParticicpantsInterface }) => {
 
 const { users, isLoading, error } = useAppSelector((state) => state.users);
  const [username, setUsername] = useState<string>("");
  const [userss, setUsers] = useState<User[]>(users);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const queryName = params.get("name");
    if (queryName) {
      setUsername(queryName);
      dispatch(fetchUsersByName(queryName));
    }
  }, [location.search, dispatch]);
  useEffect(()=> {
    dispatch(fetchAllUsers())

  }, [])

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);

  //   if (username) {
  //     params.set("name", username);
  //   } else {
  //     params.delete("name");
  //   }

  //   // Обновляем строку запроса, но остаемся на той же странице
  //   navigate({ search: params.toString() }, { replace: true });
  // }, [username, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSearch = () => {
    if (username.trim()) {
      
      dispatch(fetchUsersByName(username));
  
  };}
  
 const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
  
    e.preventDefault(); 
    dispatch(updateEventParticipants({ eventId, participants }));
    dispatch(fetchAllEvents())
    toast.success("Участники обновлены!");
    updateParticicpantsInterface(participants)
    
  };
  
  const sortedUsers = [...userss].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <form onSubmit={submitHandler}>
      <label>
        Type name:
        <input type="text" value={username} onChange={handleChange} />
      </label>
      <button type='button' onClick={handleSearch}>Искать</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users && (
        <ul>
          {sortedUsers.map((user) => (
            <li
              key={user._id}
              onClick={() => addParticipants(user._id, user.name)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
      <button type="submit">обновить участников</button>
    </form>
  );
};
