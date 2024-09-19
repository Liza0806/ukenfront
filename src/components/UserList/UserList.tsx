interface UserListProps {
  users: { _id: string; name: string }[];
  addUsers?: (user: { _id: string; name: string }) => void;
  deleteUser?: (userId: string) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, addUsers, deleteUser }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          {user.name}
          {addUsers && <button onClick={() => addUsers(user)}>+</button>}
          {deleteUser && <button onClick={() => deleteUser(user._id)}>X</button>}
        </li>
      ))}
    </ul>
  );
};