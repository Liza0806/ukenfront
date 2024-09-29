import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import cls from './UserList.module.scss'

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
          {addUsers && <IconButton onClick={() => addUsers(user)}><AddCircleOutlineIcon color="primary" fontSize="inherit" /></IconButton>}
          {deleteUser && <button onClick={() => deleteUser(user._id)}>X</button>}
    
        </li>
      ))}
    </ul>
  );
};