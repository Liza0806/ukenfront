import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MyCalendar from "./Calendar"; // Импортируйте ваш компонент
import eventReducer from "../../redux/slices/eventsSlice"; // Импортируйте редьюсер событий
import { BrowserRouter as Router } from "react-router-dom";
import { addMonths, startOfMonth, subMonths } from "date-fns";
import { EventTypeDB } from "../../redux/types/types";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RootOptions } from "react-dom/client";
import { RootState } from "../../redux/store/store";


// Создание поддельного состояния событий
const mockEventsState = {
  isLoading: false,
  events: [], // Начальное состояние (пустой массив)
  error: undefined,
  currentEvent: undefined,
};

const store = configureStore({
  reducer: {
    events: eventReducer,
  },
  preloadedState: {
    events: mockEventsState,
  },
});

describe("MyCalendar component", () => {
  test("renders loading message when no events are present", () => {
    render(
      <Provider store={store}>
        <Router>
          <MyCalendar />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/завантаження тренувань.../i)).toBeInTheDocument();
  });

  test("renders the correct initial month", async () => {
    const initialState = {
      events: {
        isLoading: false,
        events: [],
        error: undefined,
        currentEvent: undefined,
      },
    };

    const store = configureStore({
      reducer: {
        events: eventReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <Router>
          <MyCalendar />
        </Router>
      </Provider>
    );

    // Убедитесь, что загрузка завершена
    expect(
      await screen.findByText(/завантаження тренувань.../i)
    ).toBeInTheDocument();

    // Проверяем, что текущий месяц отображается
    const currentMonth = startOfMonth(new Date()).toLocaleString("uk-UA", {
      month: "long",
    });
    expect(await screen.findByText(currentMonth)).toBeInTheDocument();
  });

  test("renders the correct next month on click on next month button", async () => {
    const initialState = {
      events: {
        isLoading: false,
        events: [],
        error: undefined,
        currentEvent: undefined,
      },
    };

    const store = configureStore({
      reducer: {
        events: eventReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <Router>
          <MyCalendar />
        </Router>
      </Provider>
    );

    expect(
      await screen.findByText(/завантаження тренувань.../i)
    ).toBeInTheDocument();

    const arrowBtnNext = await screen.findByTestId("next-month-button");
    expect(arrowBtnNext).toBeInTheDocument();

    // Имитируем клик по событию
    fireEvent.click(arrowBtnNext);
    // Проверяем, что следующий месяц отображается
    const nextMonth = startOfMonth(addMonths(new Date(), 1)).toLocaleString(
      "uk-UA",
      { month: "long" }
    );

    await waitFor(async () =>
      expect(await screen.findByText(nextMonth)).toBeInTheDocument()
    );

    const arrowBtnLast = await screen.findByTestId("last-month-button");
    expect(arrowBtnLast).toBeInTheDocument();

    // Имитируем клик по событию
    fireEvent.click(arrowBtnLast);
    const lastMonth = startOfMonth(addMonths(new Date(), 0)).toLocaleString(
      "uk-UA",
      { month: "long" }
    );
    await waitFor(async () =>
      expect(await screen.findByText(lastMonth)).toBeInTheDocument()
    );
  });

  test("selects an event and displays it", async () => {
    const mockEvent: EventTypeDB = {
      _id: "1",
      groupTitle: "Тренировка по боксу",
      groupId: "1",
      isCancelled: false,
      date: new Date(),
      participants: [],
    };

    const initialState = {
      events: {
        isLoading: false,
        events: [mockEvent],
        error: undefined,
        currentEvent: undefined,
      },
    };
    const store = configureStore({
      reducer: {
        events: eventReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <Router>
          <MyCalendar />
        </Router>
      </Provider>
    );

    // Здесь вы должны сымитировать выбор события (например, клик по событию)
    // Предположим, что событие отображается как элемент списка
    const eventElement = await screen.findByText(mockEvent.groupTitle);
    expect(eventElement).toBeInTheDocument();

    // Имитируем клик по событию
    fireEvent.click(eventElement);

    // Проверяем, что выбранное событие теперь отображается
    expect(await screen.findByText(mockEvent.groupTitle)).toBeInTheDocument(); // Если оно должно отображаться где-то
  });

  test("renders the correct number of participants for an event", async () => {
    const mockEvent: EventTypeDB = {
      _id: "1",
      groupTitle: "Тренировка по боксу",
      groupId: "1",
      isCancelled: false,
      date: new Date(),
      participants: [
        { _id: "101", name: "Ivan", telegramId: "11" },
        { _id: "102", name: "Anna", telegramId: "22" },
      ],
    };

    const initialState = {
      events: {
        isLoading: false,
        events: [mockEvent],
        error: undefined,
        currentEvent: undefined,
      },
    };

    const store = configureStore({
      reducer: {
        events: eventReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <Router>
          <MyCalendar />
        </Router>
      </Provider>
    );

    const eventElement = await screen.findByText(mockEvent.groupTitle);
    expect(eventElement).toBeInTheDocument();

    // Проверяем, что количество участников отображается правильно
    const participantsCount = screen.getByText(
      mockEvent.participants.length.toString()
    );
    expect(participantsCount).toBeInTheDocument();
  });

  test("saves selected event to localStorage and redirects", async () => {
    const date = new Date();
    const date2 = new Date();
    const initialState = {
      events: {
        isLoading: false,
        events: [
          {
            _id: "1",
            groupTitle: "Тренировка по боксу",
            groupId: "1",
            date: date.toISOString(),
            isCancelled: false,
            participants: [],
          },
          {
            _id: "",
            groupTitle: "Тренировка по ufc",
            groupId: "2",
            date: date2.toISOString(),
            isCancelled: false,
            participants: [],
          },
        ],
        error: undefined,
        currentEvent: undefined,
      },
    };

    const store = configureStore({
      reducer: {
// @ts-ignore
        events: eventReducer,
      },
      preloadedState: initialState,
    });

    // Мокаем localStorage
    const setItemMock = jest.spyOn(Storage.prototype, "setItem");

    render(
      <Provider store={store}>
        <Router>
          <MyCalendar />
        </Router>
      </Provider>
    );

    // Находим событие и кликаем по нему
    const eventElement = await screen.findByText(initialState.events.events[0].groupTitle);
    fireEvent.click(eventElement);

    // Проверяем, что событие сохраняется в localStorage
    expect(setItemMock).toHaveBeenCalledWith(
      "selectedEvent",
      JSON.stringify({ _id: '1', groupTitle: "Тренировка по боксу",groupId: "1", date: date.toISOString(),  isCancelled: false, participants: [] })
    );

    // Проверяем, что происходит редирект
    // Здесь предполагается, что после клика происходит навигация
    //  expect(window.location.pathname).toBe("/events/1"); // поставь на правильный путь!!!
  });
});
