import React, { ChangeEvent, useRef, useEffect } from "react";
import { ParticipantType } from "../../redux/types/types";
import style from './Find.User.module.scss';

interface FindUsersProps {
  handleFindUsers?: (params: string) => void;
  inputRef: React.RefObject<HTMLInputElement>; // Пробрасываем ref как пропс
}

export const FindUsers: React.FC<FindUsersProps> = ({ handleFindUsers, inputRef }) => {
  const [username, setUsername] = React.useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername(e.target.value);
    const newValue = e.target.value.toLowerCase();
    if (handleFindUsers) {
      handleFindUsers(newValue);
    }
  };

  return (
    <label className={style.label}>
      <p className={style.title}>Можливі Учасники:</p>
      <input
        ref={inputRef} // Привязываем переданный ref к инпуту
        className={style.imput}
        type="text"
        value={username}
        onChange={handleChange}
      />
    </label>
  );
};