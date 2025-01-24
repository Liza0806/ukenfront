import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import cls from "./UserList.module.scss";
import { ChangeEventHandler, useState } from "react";
import {
  EventTypeDB,
  GroupType,
  PartialUserWithRequiredFields,
} from "../../redux/types/types";
import { useManageUsers } from "../../hooks/hooks";

export interface UserListProps {
  smth: EventTypeDB | GroupType | any;
  setSmth:
    | React.Dispatch<React.SetStateAction<EventTypeDB | GroupType | undefined>>
    | any;
  existingUsers?: PartialUserWithRequiredFields[];
}

export const UserList: React.FC<UserListProps> = ({
  smth,
  setSmth,
  existingUsers,
}) => {
  const [username, setUsername] = useState(""); /// 1

  const { users, findUsers, handleAddUser, handleDeleteUser } =
    useManageUsers();

  const usersForList = existingUsers
    ? existingUsers.filter((user) =>
        user!.name.toLowerCase().includes(username.toLowerCase())
      )
    : users.filter((user) =>
        user.name.toLowerCase().includes(username.toLowerCase())
      );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.value;
    setUsername(name);
    findUsers ? findUsers(name) : console.log("передай findUsers, а потом ищи");
  };

  return (
    <div>
      <label className={cls.label}>
        {existingUsers ? (
          <p className={cls.title}>Учасники:</p>
        ) : (
          <p className={cls.title}>Можливі Учасники:</p>
        )}
        <input
          className={cls.input}
          type="text"
          data-testid="userListInput"
          value={username}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <ul>
        {usersForList.map((user) => (
          <li key={user!._id} data-testid="userInList">
            {user!.name}
            <IconButton
              data-testid="userInListAddBtn"
              onClick={() => {
              
                handleAddUser(user!, smth, setSmth);
              }}
            >
              <AddCircleOutlineIcon color="primary" fontSize="inherit" />
            </IconButton>

            <button data-testid="userInListDeleteBtn"
            className={cls.deleteIcon}
            onClick={() => {
            
              handleDeleteUser(user!._id, smth, setSmth)}}><DeleteIcon
             
            ></DeleteIcon></button>
          </li>
        ))}
      </ul>
    </div>
  );
};
