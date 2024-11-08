import { getAllUsers } from "../redux/api/usersApi"; // Функция для запроса
import { fetchAllUsers } from "../redux/thunks/thunks"; // Танк для получения пользователей
import { UserList } from "../components/UserList/UserList";
import { act, render, screen, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../redux/slices/userSlice";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { useManageUsers } from "./hooks";
import React, { useEffect, useRef, useState } from "react";
import {
  EventTypeDB,
  GroupType,
  PartialUserWithRequiredFields,
  User,
} from "../redux/types/types";

// Мокаем getAllUsers
jest.mock("../redux/api/usersApi", () => ({
  getAllUsers: jest.fn(),
}));

// Пример данных, которые будут возвращены мок-функцией
const mockUsers = [
  {
    _id: "1",
    name: "userName",
    password: "111",
    phone: "11111",
    isAdmin: false,
    groups: [],
    balance: 11,
    telegramId: "111",
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
    telegramId: "222",
    discount: 22,
    visits: [],
  },
];
const mockUsersForUserList: PartialUserWithRequiredFields[] = [
  {
    _id: "1",
    name: "userName",
    telegramId: "111",
  },
  {
    _id: "2",
    name: "userName2",
    telegramId: "222",
  },
];
// Конфигурируем мок-функцию getAllUsers
const mockedgetAllUsers = getAllUsers as jest.MockedFunction<
  typeof getAllUsers
>;

describe("getUsers useManageUsers hook", () => {
  const mockStore = configureStore({
    reducer: {
      users: usersReducer,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and set users when getUsers is called", async () => {
    // Мокаем возвращаемое значение getAllUsers
    mockedgetAllUsers.mockResolvedValueOnce(mockUsers);

    // Вызываем dispatch для получения пользователей
    const dispatch = mockStore.dispatch;
    const result = await dispatch(fetchAllUsers());

    // Проверяем, что состояние fulfilled
    expect(result.type).toBe("users/fetchAllUsers/fulfilled");
    expect(result.payload).toEqual(mockUsers);
    // Мокаем параметры для компонента
    const smthMock = {};
    const setSmthMock = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router>
          <UserList
            smth={smthMock}
            setSmth={setSmthMock}
            existingUsers={mockUsersForUserList}
          />
        </Router>
      </Provider>
    );

    // Проверяем, что пользователи отобразились на странице
    await waitFor(() => {
      expect(screen.getByText("userName")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("userName2")).toBeInTheDocument();
    });
  });
});

describe("findUsers in useManageUsers hook", () => {
  const mockStore = configureStore({
    reducer: {
      users: usersReducer,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should filter users by name when findUsers is called", async () => {
    // Создаем тестовый компонент для вызова хука
    let hookResult: ReturnType<typeof useManageUsers> | undefined;

    interface TestComponentProps {
      users: PartialUserWithRequiredFields[]; // Пропс 'users' будет массивом с частичными объектами типа User
    }

    const TestComponent: React.FC<TestComponentProps> = ({ users }) => {
      // Теперь передаем пропс 'users' в хук
      hookResult = useManageUsers({ users });

      return null; // Или верните какой-то JSX, если нужно
    };

    render(
      <Provider store={mockStore}>
        <TestComponent users={mockUsers} />
      </Provider>
    );

    // Проверка, что hookResult инициализирован
    expect(hookResult).toBeDefined();
    console.log(hookResult, "hookResult");
    // Вызов методов хука и проверка результата
    await act(async () => {
      hookResult!.findUsers("userName");
    });

    expect(hookResult!.usersN).toEqual([
      {
        _id: "1",
        name: "userName",
        password: "111",
        phone: "11111",
        isAdmin: false,
        groups: [],
        balance: 11,
        telegramId: "111",
        discount: 11,
        visits: [],
      },
    ]);
    expect(hookResult!.usersN).not.toEqual([
      {
        _id: "9",
        name: "userName",
        password: "111",
        phone: "11111",
        isAdmin: false,
        groups: [],
        balance: 11,
        telegramId: "111",
        discount: 11,
        visits: [],
      },
    ]);
  });
});

describe("handleAddUser useManageUsers hook", () => {
  const mockStore = configureStore({
    reducer: {
      users: usersReducer,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const initialEvent: EventTypeDB = {
    _id: "1",
    groupTitle: "groupTitle 1",
    groupId: "1",
    isCancelled: false,
    date: new Date().toISOString(),
    participants: [
      { _id: "2", name: "user2", telegramId: "222" },
      { _id: "3", name: "user3", telegramId: "333" },
    ],
  };
  it("should add users by name when addUsers is called", async () => {
    let hookResult: ReturnType<typeof useManageUsers> | undefined;
    const setEvent = jest.fn(); // Мокаем функцию для setEvent

    interface TestComponentProps {
      users: PartialUserWithRequiredFields[];
      setSmth: React.Dispatch<React.SetStateAction<any>>;
      smth: EventTypeDB | GroupType;
    }

    const TestComponent: React.FC<TestComponentProps> = ({ users, smth }) => {
      hookResult = useManageUsers({ users });
      return null;
    };

    render(
      <Provider store={mockStore}>
        <TestComponent
          users={mockUsers}
          setSmth={setEvent}
          smth={initialEvent}
        />
      </Provider>
    );

    expect(hookResult).toBeDefined();

    // Добавляем пользователя
    await act(async () => {
      hookResult!.handleAddUser(mockUsers[0], initialEvent, setEvent);
    });

    const lastCallArgs = setEvent.mock.calls[setEvent.mock.calls.length - 1][0]; // Получаем аргумент последнего вызова

    // Проверяем, что setEvent был вызван с правильными аргументами
    expect(setEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        participants: expect.arrayContaining([
          expect.objectContaining({ name: mockUsers[0].name }),
        ]),
      })
    );
    // Проверяем, что в lastCallArgs был добавлен пользователь
    expect(lastCallArgs.participants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: mockUsers[0].name }),
      ])
    );

    const userForMock = {
      _id: "1",
      name: "user1111",
      password: "111",
      phone: "11111",
      isAdmin: false,
      groups: [],
      balance: 11,
      telegramId: "111",
      discount: 11,
      visits: [],
    };

    // Пытаемся добавить нового пользователя с тем же _id
    await act(async () => {
      hookResult!.handleAddUser(userForMock, initialEvent, setEvent);
    });

    // Проверяем, что initialEvent не содержит участника с именем userForMock.name

    expect(lastCallArgs.participants).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: userForMock.name }),
      ])
    );
    // Пытаемся добавить нового НЕПОЛНОГО пользователя

    const userForMockPartial = {
      _id: "9",
      name: "user1111",
    };
    await act(async () => {
      hookResult!.handleAddUser(userForMockPartial, initialEvent, setEvent);
    });

    // Проверяем, что initialEvent не содержит участника с именем userForMock.name

    expect(lastCallArgs.participants).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: userForMockPartial.name }),
      ])
    );
  });
});

describe("handleDeleteUser useManageUsers hook", () => {
  const mockStore = configureStore({
    reducer: {
      users: usersReducer,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const initialEvent: EventTypeDB = {
    _id: "1",
    groupTitle: "groupTitle 1",
    groupId: "1",
    isCancelled: false,
    date: new Date().toISOString(),
    participants: [
      { _id: "1", name: "user1", telegramId: "111" },
      { _id: "2", name: "user2", telegramId: "222" },
      { _id: "3", name: "user3", telegramId: "333" },
    ],
  };
  const initialParticipantsLength = initialEvent.participants.length;

  it("should delete users when handleDeleteUser is called", async () => {
    let hookResult: ReturnType<typeof useManageUsers> | undefined;
    const setEvent = jest.fn(); // Мокаем функцию для setEvent

    const TestComponent: React.FC = () => {
      hookResult = useManageUsers();
      return null;
    };

    render(
      <Provider store={mockStore}>
        <TestComponent />
      </Provider>
    );

    expect(hookResult).toBeDefined();

    // Удаляем пользователя
    await act(async () => {
      hookResult!.handleDeleteUser(mockUsers[0]._id, initialEvent, setEvent);
    });

    const lastCallArgs = setEvent.mock.calls[setEvent.mock.calls.length - 1][0]; // Получаем аргумент последнего вызова

    expect(lastCallArgs.participants).not.toContainEqual(
      expect.objectContaining({ _id: "1" })
    );

    // Проверяем, что количество участников уменьшилось
    expect(lastCallArgs.participants.length).toBeLessThan(
      initialParticipantsLength
    );

    // Проверяем, что участник с `_id: "1"` был удален
    expect(lastCallArgs.participants).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ _id: "1" })])
    );

    // Проверка, что участник не был удален повторно (если это нужно)
    await act(async () => {
      hookResult!.handleDeleteUser(mockUsers[0]._id, initialEvent, setEvent);
    });

    // Проверка, что повторное удаление не изменяет количество участников
    const afterSecondCallArgs =
      setEvent.mock.calls[setEvent.mock.calls.length - 1][0];
    expect(afterSecondCallArgs.participants.length).toEqual(
      lastCallArgs.participants.length
    );
  });
});
