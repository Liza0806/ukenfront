// import React, { act } from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { UserList, UserListProps } from './UserList';
// import { useManageUsers } from '../../hooks/hooks';
// import { EventTypeDB, GroupType, PartialUserWithRequiredFields, User } from '../../redux/types/types';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import usersReducer from "../../redux/slices/userSlice";

// jest.mock('@mui/material/IconButton', () => (props: any) => <button {...props}>{props.children}</button>);
// jest.mock('@mui/icons-material/AddCircleOutline', () => () => <span>Add Icon</span>);
// jest.mock('@mui/icons-material/Delete', () => () => <span>Delete Icon</span>);
// jest.mock('../../hooks/hooks', () => ({
//   useManageUsers: jest.fn(() => ({
//     users: [],
//     findUsers: jest.fn(),
//     handleAddUser: jest.fn(),
//     handleDeleteUser: jest.fn(),
//   })),
// }));
// const initialEvent: EventTypeDB = {
//     _id: "1",
//     groupTitle: "groupTitle 1",
//     groupId: "1",
//     isCancelled: false,
//     date: new Date().toISOString(),
//     participants: [
//       { _id: "2", name: "user2", telegramId: 222 },
//       { _id: "3", name: "user3", telegramId: 333 },
//     ],
//   };
// describe('UserList Component', () => {
//   const mockSetSmth = jest.fn();
//   const mockStore = configureStore({
//     reducer: {
//       users: usersReducer,
//     },
//   });

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   const mockUsers: User[] = [
//     {
//       _id: "1",
//       name: "userName",
//       password: "111",
//       phone: "11111",
//       isAdmin: false,
//       groups: [],
//       balance: 11,
//       telegramId: 111,
//       discount: 11,
//       visits: [],
//     },
//     {
//       _id: "2",
//       name: "user2",
//       password: "222",
//       phone: "222222",
//       isAdmin: true,
//       groups: [],
//       balance: 22,
//       telegramId: 222,
//       discount: 22,
//       visits: [],
//     },
//   ];

//   it('renders input and list of users', () => {
//     render(<UserList smth={{}} setSmth={mockSetSmth} existingUsers={mockUsers} />);

//     expect(screen.getByText('Учасники:')).toBeInTheDocument();
//     expect(screen.getByRole('textbox')).toBeInTheDocument();
//     expect(screen.getAllByTestId('userInList')).toHaveLength(mockUsers.length);
//   });

//   it('filters users based on input', () => {
//     render(<UserList smth={{}} setSmth={mockSetSmth} existingUsers={mockUsers} />);

//     const input = screen.getByRole('textbox');
//     fireEvent.change(input, { target: { value: 'userName1' } });

//     expect(screen.getByText('userName1')).toBeInTheDocument();
//     expect(screen.queryByText('user')).not.toBeInTheDocument();
//   });

//   it('calls handleAddUser when add icon is clicked', async () => {

//       });

// //   it('calls handleDeleteUser when delete icon is clicked', () => {
// //     const { handleDeleteUser } = require('../../hooks/hooks').useManageUsers();
// //     render(<UserList smth={{}} setSmth={mockSetSmth} existingUsers={mockUsers} />);

// //     const deleteButton = screen.getAllByText('Delete Icon')[0];
// //     fireEvent.click(deleteButton);

// //     expect(handleDeleteUser).toHaveBeenCalledWith(mockUsers[0]._id, {}, mockSetSmth);
// //   });
// });
// });

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import  UserList from "./UserList";
import { User } from "../../redux/types/types";
import * as hooks from "../../hooks/hooks";
const mockUsers: User[] = [
  {
    _id: "1",
    name: "userName",
    password: "111",
    phone: "11111",
    isAdmin: false,
    groups: [],
    balance: 11,
    telegramId: 111,
    discount: 11,
    visits: [],
  },
  {
    _id: "2",
    name: "user2",
    password: "222",
    phone: "222222",
    isAdmin: true,
    groups: [],
    balance: 22,
    telegramId: 222,
    discount: 22,
    visits: [],
  },
];

jest.mock("@mui/material/IconButton", () => (props: any) => (
  <button {...props}>{props.children}</button>
));
jest.mock("@mui/icons-material/AddCircleOutline", () => () => (
  <span>Add Icon</span>
));
jest.mock("@mui/icons-material/Delete", () => () => <span>Delete Icon</span>);
jest.mock("../../hooks/hooks", () => ({
  useManageUsers: jest.fn(() => ({
    users: mockUsers,
    findUsers: jest.fn(),
    handleAddUser: jest.fn(),
    handleDeleteUser: jest.fn(),
  })),
}));

describe("UserList Component", () => {
  const mockSetSmth = jest.fn();

  it("renders input and list of users", () => {
    render(
      <UserList smth={{}} setSmth={mockSetSmth} existingUsers={mockUsers} />
    );

    expect(screen.getByText("Учасники:")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getAllByTestId("userInList")).toHaveLength(mockUsers.length);
  });

  it("filters users based on input", async () => {
    render(
      <UserList smth={{}} setSmth={mockSetSmth} existingUsers={mockUsers} />
    );

    const input = screen.getByTestId("userListInput") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "userName1" } });
    expect(input).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByDisplayValue("userName1")).toBeInTheDocument();
    });

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("calls handleAddUser when add icon is clicked", () => {
    const handleAddUser = jest.fn();
    jest.spyOn(hooks, "useManageUsers").mockReturnValue({
      users: mockUsers,
      usersN: [],
      getUsers: jest.fn(),
      findUsers: jest.fn(),
      handleAddUser,
      handleDeleteUser: jest.fn(),
    });

    render(
      <UserList smth={{}} setSmth={mockSetSmth} existingUsers={mockUsers} />
    );

    const addButton = screen.getAllByTestId(
      "userInListAddBtn"
    )[0] as HTMLButtonElement; 
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(handleAddUser).toHaveBeenCalled();
    expect(handleAddUser).toHaveBeenCalledWith(mockUsers[0], {}, mockSetSmth);
  });

  it("calls handleDeleteUser when delete icon is clicked", () => {
    const handleDeleteUser = jest.fn();
   // jest.spyOn(hooks, "useManageUsers") //.mockReturnValue({});
    jest.spyOn(hooks, "useManageUsers").mockReturnValue({
      users: mockUsers,
      findUsers: jest.fn(),
      handleAddUser: jest.fn(),
      handleDeleteUser,
      getUsers: jest.fn(),
      usersN: [],
    });
  
    render(
      <UserList smth={{}} setSmth={mockSetSmth} existingUsers={mockUsers} />
    );

    const deleteButton = screen.getAllByTestId("userInListDeleteBtn")[0] as HTMLButtonElement; ;
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);

    expect(handleDeleteUser).toHaveBeenCalled();
    expect(handleDeleteUser).toHaveBeenCalledWith(
      mockUsers[0]._id,
      {},
      mockSetSmth
    );
  });
});
