import cls from "./UserList.module.scss";
import React, { useState } from "react";
import {
  EventTypeDB,
  ParticipantType,
} from "../../redux/types/types";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";

export interface UserListProps {
  usersInBase: ParticipantType[],
  usersInComponent: ParticipantType[],
  setUsersInComponent:
    | React.Dispatch<React.SetStateAction<EventTypeDB | ParticipantType[] | undefined>>
    | any;
}

const UserList: React.FC<UserListProps> = ({
  usersInBase,
  usersInComponent,
  setUsersInComponent,
}) => {
  const [username, setUsername] = useState(""); /// 1
const dispatch = useDispatch();

  const usersForList: ParticipantType[] = usersInBase
    && usersInBase.filter((user) =>
        user!.name.toLowerCase().includes(username.toLowerCase())
      );

  return (
    <div>
      <label className={cls.label}>
        {usersInComponent ? (
          <p className={cls.title}>Учасники:</p>
        ) : (
          <p className={cls.title}>Можливі Учасники:</p>
        )}
        <input
          className={cls.input}
          type="text"
          data-testid="userListInput"
          value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <ul>
  {usersForList.map((user) => (
    <li className={cls.nameOfUser} key={user!._id} data-testid="userInList">
      <div className={cls.buttonAddAndDelete}>
        <button 
        data-testid="userInListAddBtn"
          onClick={() => {
            if (!usersInComponent.some(u => u._id === user._id)) {
              dispatch(setUsersInComponent({participants: 
               [...usersInComponent, { _id: user._id, name: user.name, telegramId: user.telegramId }]
            }));
            }
          }}>
              <AddIcon
          sx={{
            color: "#ff9900",
            cursor: "pointer",
            transition: "transform 0.3s ease",
            ":hover": {
              transform: "scale(1.2)",
            },
          }}
        />
        </button>
    

        {user!.name}
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};
export default React.memo(UserList); 