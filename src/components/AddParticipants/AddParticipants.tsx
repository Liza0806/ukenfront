import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  fetchUsersByName,
  updateEventParticipants,
} from "../../redux/thunks/thunks";
import { useLocation, useNavigate } from "react-router-dom";
import { ParticipantType } from "../../redux/types/types";
import { clearUsers } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

interface FindUsersProps {
  eventId: string;
  participants: ParticipantType[];
  addParticipants: (_id: string, name: string) => void;
}

export const FindUsers: React.FC<FindUsersProps> = ({ addParticipants }) => {
  const [username, setUsername] = useState<string>("");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { users, isLoading, error } = useAppSelector((state) => state.users);
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const queryName = params.get("name");
    if (queryName) {
      setUsername(queryName);
      dispatch(fetchUsersByName(queryName));
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (username) {
      params.set("name", username);
    } else {
      params.delete("name");
    }

    // Обновляем строку запроса, но остаемся на той же странице
    navigate({ search: params.toString() }, { replace: true });
  }, [username, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSearch = () => {
    if (username.trim()) {
      dispatch(fetchUsersByName(username));
    }
  };

  return (
    <div>
      <label>
        Type name:
        <input type="text" value={username} onChange={handleChange} />
      </label>
      <button onClick={handleSearch}>Search</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => addParticipants(user._id, user.name)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
