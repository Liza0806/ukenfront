import React, { ChangeEvent, useState } from "react";
import { ParticipantType } from "../../redux/types/types";

interface FindUsersProps {
  handleAddUser?: (participant: ParticipantType) => void;
  handleDeleteUser?: (participant: ParticipantType) => void;
  handleFindUsers?: (params: string) => void;
}

export const FindUsers: React.FC<FindUsersProps> = ({ handleFindUsers }) => {
  const [username, setUsername] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername(e.target.value);
    const newValue = e.target.value.toLowerCase();
    if (handleFindUsers) {
      handleFindUsers(newValue);
    }
  };

  return (
    <label>
      Type name:
      <input type="text" value={username} onChange={handleChange} />
    </label>
  );
};
