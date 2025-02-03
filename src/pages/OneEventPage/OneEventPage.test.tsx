import React from "react";
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";
import { getEventById, updateEventAPi } from "../../redux/api/eventsApi";
import OneEventPage from "./OneEventPage";
import { mocked } from "jest-mock";
import { Provider } from "react-redux";
import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import eventReducer, {
  clearCurrentEvent,
} from "../../redux/slices/eventsSlice";
import userReducer from "../../redux/slices/userSlice";
import {
  AddEventTypeDB,
  EventTypeDB,
  PartialUserWithRequiredFields,
  User,
} from "../../redux/types/types";
import {
  fetchAllEvents,
  fetchAllUsers,
  updateEvent,
} from "../../redux/thunks/thunks";

import "@testing-library/jest-dom";
import { selectCurrentEvent } from "../../redux/selectors/selectors";

jest.mock("../../redux/api/eventsApi");
jest.mock("../../redux/api/usersApi");

jest.mock("../../redux/hooks/hooks", () => ({
  ...jest.requireActual("../../redux/hooks/hooks"),
  useAppSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const mockedGetEventById = getEventById as jest.MockedFunction<
  typeof getEventById
>;
const mockedUpdateEventById = updateEventAPi as jest.MockedFunction<
  typeof updateEventAPi
>;

const mockGetEventById = mocked(getEventById);
const mockUseParams = mocked(useParams);

const users: User[] | PartialUserWithRequiredFields[] = [
  {
    _id: "1",
    name: "userName 1",
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
    name: "userName 2",
    password: "222",
    phone: "22222",
    isAdmin: true,
    groups: [],
    balance: 22,
    telegramId: 222,

    visits: [],
  },
];
const event: AddEventTypeDB = {
  _id: "123",
  groupTitle: "groupTitle 2",
  groupId: "2",
  isCancelled: false,
  date: new Date().toISOString(),
  participants: [
    { _id: "1", name: "Participant 1", telegramId: 111 },
    { _id: "2", name: "Participant 2", telegramId: 222 },
  ],
};

const store = configureStore({
  reducer: {
    events: eventReducer,
    //@ts-ignore
    users: userReducer,
  },
  preloadedState: {
    events: {
      events: [],
      isLoading: false,
      error: undefined,
      currentEvent: event,
    },
    users: {
      users: users,
      isLoading: false,
      error: undefined,
    },
  },
});

type AppDispatch = ThunkDispatch<
  ReturnType<typeof store.getState>,
  void,
  Action
>;

const dispatch: AppDispatch = store.dispatch;
describe("OneEventPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseParams.mockReturnValue({ id: "123" });

    // mockedGetUsers.mockReturnValue({
    //   users: users,
    //   getUsers: jest.fn(),
    //   usersN: [],
    //   findUsers: jest.fn(),
    //   handleAddUser: jest.fn(),
    //   handleDeleteUser: jest.fn(),
    // });

    mockedGetEventById.mockResolvedValueOnce(event);
  });

  it("должен загрузить событие и отобразить его", async () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector === selectCurrentEvent) {
        return event;
      }
      return null;
    });
    const availableParticipants = [];
    await dispatch(fetchAllEvents());
    await dispatch(fetchAllUsers());
    render(
      <Provider store={store}>
        <OneEventPage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/groupTitle 2/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(
          new Date(event.date).toLocaleString("uk-UA", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        )
      ).toBeInTheDocument();
    });
    expect(mockGetEventById).toHaveBeenCalledWith("123");
  });

  it("должен обновить событие при нажатии на иконку обновления", async () => {
    //@ts-ignore
    mockedUpdateEventById.mockReturnValueOnce(event);
    await dispatch(updateEvent(event) as any);

    render(
      <Provider store={store}>
        <OneEventPage />
      </Provider>
    );

    const updateIconBtn = screen.getByTestId("updateIcon") as HTMLButtonElement;
    expect(updateIconBtn).toBeInTheDocument();

    fireEvent.click(updateIconBtn);

    await waitFor(() => {
      expect(mockedUpdateEventById).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(mockedUpdateEventById).toHaveBeenCalledWith(
        expect.objectContaining({
          ...event,
        })
      );
    });
  });

  it("должен отобразить календарь при нажатии на дату", async () => {
    render(
      <Provider store={store}>
        <OneEventPage />
      </Provider>
    );

    const dateElement = screen.getByText(
      new Date(event.date).toLocaleString("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );

    act(() => {
      dateElement.click();
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("должен отображать список участников", async () => {
    render(
      <Provider store={store}>
        <OneEventPage />
      </Provider>
    );

    expect(screen.getByText(/participant 1/i)).toBeInTheDocument();
    expect(screen.getByText(/participant 2/i)).toBeInTheDocument();
  });

  it("должен отображать сообщение, если участников нет", async () => {
    const mockedEvent = {
      _id: "123",
      groupTitle: "groupTitle 2",
      groupId: "2",
      isCancelled: false,
      date: new Date().toISOString(),
      participants: [],
    };

    (useAppSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector === selectCurrentEvent) {
        return mockedEvent;
      }
      return null;
    });
    // });
    const event2: EventTypeDB = {
      _id: "123",
      groupTitle: "groupTitle 2",
      groupId: "2",
      isCancelled: false,
      date: new Date().toISOString(),
      participants: [],
    };

    const store2 = configureStore({
      reducer: {
        events: eventReducer,
        //@ts-ignore
        users: userReducer,
      },
      preloadedState: {
        events: {
          events: [],
          isLoading: false,
          error: undefined,
          currentEvent: event2,
        },
        users: {
          isLoading: false,
          users: [
            {
              _id: "66d9b418cde50",
              name: "Лиза",
              password: "$2b$10$H26gwlhfIUr/eXXU.",
              isAdmin: true,
              balance: 0,
              telegramId: 10182,
            },
            {
              _id: "66bd730f",
              name: "Индросий",
              password: "$2b$",
              isAdmin: false,
              balance: 0,
              telegramId: 41281,
            },
          ],
        },
      },
    });
    render(
      <Provider store={store2}>
        <OneEventPage />
      </Provider>
    );
    expect(
      screen.getByText(/На тренування ніхто не записався/i)
    ).toBeInTheDocument();
  });

  it("должен отобразить дополнительных пользователей при нажатии на кнопку", async () => {
    const event3: EventTypeDB = {
      _id: "123",
      groupTitle: "groupTitle 2",
      groupId: "2",
      isCancelled: false,
      date: new Date().toISOString(),
      participants: [
        {_id:"66d9c628c0839ff5f3bd730f", name:"Индросий", telegramId:412631781},
        {_id:"66d9b4e7e5e1b9e2718cde50", name:"Лиза", telegramId:1018007612}
      ],
    };
  
    const store3 = configureStore({
      reducer: {
        events: eventReducer,
        //@ts-ignore
        users: userReducer,
      },
      preloadedState: {
        events: {
          events: [],
          isLoading: false,
          error: undefined,
          currentEvent: event3,
        },
        users: {
          isLoading: false,
          users: [
            {_id:"66d9b418cde50", name:"Лиза", password:"$2b$10$H26gwlhfIUr/eXXU.", isAdmin:true, balance:0, telegramId:10182},
            {_id:"66bd730f", name:"Индросий", password:"$2b$", isAdmin:false, balance:0, telegramId:41281}
          ]
        }
      },
    });
  
    render(
      <Provider store={store3}>
        <OneEventPage />
      </Provider>
    );
  
    // Дожидаемся появления кнопки
    const button = await screen.findByTestId("updateIcon");
  
    // Кликаем по кнопке
    act(() => {
      button.click();
    });
  
    // Дожидаемся, когда пользователи отобразятся
    await waitFor(() => {
      const users = screen.queryAllByTestId("userInList");
      // Убедимся, что хотя бы один пользователь появился
      expect(users.length).toBeGreaterThan(0);
    });
  });
  
  

  it("должен вызвать clearCurrentEvent при размонтировании", async () => {
    jest.spyOn(store, "dispatch");

    const { unmount } = render(
      <Provider store={store}>
        <OneEventPage />
      </Provider>
    );

    unmount();

    expect(store.dispatch).toHaveBeenCalledWith(clearCurrentEvent());
  });
});
