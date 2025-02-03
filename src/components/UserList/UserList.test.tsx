import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "./UserList";
import { User } from "../../redux/types/types";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../../redux/slices/eventsSlice";
import userReducer from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/hooks/hooks";
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

    visits: [],
  },
];
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));
jest.mock("@mui/material/IconButton", () => (props: any) => (
  <button {...props}>{props.children}</button>
));
jest.mock("@mui/icons-material/AddCircleOutline", () => () => (
  <span>Add Icon</span>
));
jest.mock("@mui/icons-material/Delete", () => () => <span>Delete Icon</span>);
const store = configureStore({
  reducer: {
    //@ts-ignore
    events: eventReducer,
    //@ts-ignore
    users: userReducer,
  },
});

describe("UserList Component", () => {
  const setUsersInComponent = jest.fn();

  it("renders input and list of users", () => {
    render(
      <Provider store={store}>
        <UserList
          usersInComponent={[]}
          setUsersInComponent={setUsersInComponent}
          usersInBase={mockUsers}
        />
      </Provider>
    );

    expect(screen.getByText("Учасники:")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getAllByTestId("userInList")).toHaveLength(mockUsers.length);
  });

  it("filters users based on input", async () => {
    render(
      <Provider store={store}>
        <UserList
          usersInComponent={[]}
          setUsersInComponent={setUsersInComponent}
          usersInBase={mockUsers}
        />
      </Provider>
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
    const mockDispatch = jest.fn();
    // Мокаем useDispatch
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  
    const setUsersInComponent = jest.fn(); // Мокаем setUsersInComponent
    render(
      <Provider store={store}>
        <UserList
          usersInComponent={[]} 
          setUsersInComponent={setUsersInComponent} 
          usersInBase={mockUsers}
        />
      </Provider>
    );
  
    const addButton = screen.getAllByTestId("userInListAddBtn")[0];
    expect(addButton).toBeInTheDocument();
  
    fireEvent.click(addButton);
  
    // Проверяем, что dispatch был вызван
    expect(mockDispatch).toHaveBeenCalled();
  
    // Получаем первый вызов dispatch
    const dispatchedAction = mockDispatch.mock.calls[0][0];
  
    // Логируем dispatchedAction для отладки
    console.log(dispatchedAction);
  
    // Проверяем, что dispatchedAction существует и имеет нужные свойства
    expect(dispatchedAction).not.toBeNull();
    expect(dispatchedAction).toHaveProperty("type");
    expect(dispatchedAction.payload).toHaveProperty("participants");
  
    // Дополнительная проверка, что participants — это массив
    expect(Array.isArray(dispatchedAction.payload.participants)).toBe(true);
  });
  
});
