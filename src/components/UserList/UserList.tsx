import { User } from "../../redux/types/types";

interface UserListProps {
  users: User[];
  addUsers?: (user: User) => void;
  deleteUser?: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, addUsers }) => {
  return (
    <ul>
      {users &&
        users.map((user) => (
          <li key={user._id}>
            {user.name}
            {addUsers && <button onClick={() => addUsers(user)}>+</button>}
          </li>
        ))}
    </ul>
  );
};
