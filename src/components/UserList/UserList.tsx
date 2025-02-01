import DeleteIcon from "@mui/icons-material/Delete";
import cls from "./UserList.module.scss";
import React, { ChangeEventHandler, useState } from "react";
import {
  EventTypeDB,

  PartialUserWithRequiredFields,
  ParticipantType,
} from "../../redux/types/types";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";

export interface UserListProps {
  usersInBase: ParticipantType[],
  usersInComponent: ParticipantType[] | Set<ParticipantType>,
  setUsersInComponent:
    | React.Dispatch<React.SetStateAction<EventTypeDB | ParticipantType[] | undefined>>
    | any;
  existingUsers?: PartialUserWithRequiredFields[];
}

const UserList: React.FC<UserListProps> = ({
  usersInBase,
  usersInComponent,
  setUsersInComponent,
}) => {
  const [username, setUsername] = useState(""); /// 1
const dispatch = useDispatch();
  // const { users, findUsers, handleAddUser, handleDeleteUser } =
  //   useManageUsers();

  const usersForList: ParticipantType[] = usersInBase
    && usersInBase.filter((user) =>
        user!.name.toLowerCase().includes(username.toLowerCase())
      );
    // : users.filter((user) =>
    //     user.name.toLowerCase().includes(username.toLowerCase())
    //   );

  // const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   const name = event.target.value;
  //   setUsername(name);
  //   findUsers ? findUsers(name) : console.log("передай findUsers, а потом ищи");
  // };

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
      //    onChange={(e) => handleChange(e)}
        />
      </label>
      <ul>
  {usersForList.map((user) => (
    <li className={cls.nameOfUser} key={user!._id} data-testid="userInList">
      <div className={cls.buttonAddAndDelete}>
        <AddIcon
          sx={{
            color: "#ff9900",
            cursor: "pointer",
            transition: "transform 0.3s ease",
            ":hover": {
              transform: "scale(1.2)",
            },
          }}
          data-testid="userInListAddBtn"
          onClick={() => {
            if (![...usersInComponent].some(u => u._id === user._id)) {
              dispatch(setUsersInComponent({participants: 
                new Set([...usersInComponent, { _id: user._id, name: user.name, telegramId: user.telegramId }])
            }));
            }
          }}
        />

        {/* <DeleteIcon
          data-testid="userInListDeleteBtn"
          onClick={() => {
            setUsersInComponent(usersInBase.filter((u) => u._id !== user._id));
          }}
          className={cls.deleteIcon}
        /> */}
        {user!.name}
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};
export default React.memo(UserList); 