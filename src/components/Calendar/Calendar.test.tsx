import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import  MyCalendar from './Calendar'
import eventReducer from "../../redux/slices/eventsSlice";
import { BrowserRouter as Router } from "react-router-dom";
import { addMonths, startOfMonth } from "date-fns";
import { EventStateType, EventTypeDB } from "../../redux/types/types";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from 'react';
import { getAllEvents } from "../../redux/api/eventsApi";
import { fetchAllEvents } from "../../redux/thunks/thunks";

jest.mock("../../redux/api/eventsApi");
//jest.mock("../../redux/thunks/thunks");

const mockedGetAllEvents = getAllEvents as jest.MockedFunction<
  typeof getAllEvents
>;
 
const mockEvents: EventTypeDB[] =  [{
  _id: "1",
  groupTitle: "groupTitle 1",
  groupId: "1",
  isCancelled: false,
  date: new Date().toISOString(),
  participants: [],
},
{
  _id: "2",
  groupTitle: "groupTitle 2",
  groupId: "2",
  isCancelled: false,
  date: new Date().toISOString(),
  participants: [],
},
];

// Создание поддельного состояния событий
const mockEventsState: EventStateType = { 
   events: mockEvents,
    error: undefined,
    currentEvent: undefined,
    isLoading: false
  };

const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

const mockEvent: EventTypeDB = {
  _id: "1",
  groupTitle: "Тренировка по боксу",
  groupId: "1",
  isCancelled: false,
  date: new Date().toISOString(),
  participants: [
    { _id: "101", name: "Ivan", telegramId: 11 },
    { _id: "102", name: "Anna", telegramId: 22 },
  ],
};


describe("MyCalendar component", () => {

  type AppDispatch = ThunkDispatch<
  ReturnType<typeof store.getState>,
  void,
  Action
>;
const dispatch: AppDispatch = store.dispatch;
beforeEach(() => {
  jest.clearAllMocks();
});


  it("renders loading message when no events are present", async () => {
    
     mockedGetAllEvents.mockResolvedValueOnce(mockEvents);
     const result = await dispatch(fetchAllEvents());

    expect(result.type).toBe("events/fetchAllEvents/fulfilled");
    expect(result.payload).toEqual(mockEvents);
    render(
      <Provider store={store}>
        <Router>
          <MyCalendar />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/завантаження тренувань.../i)).toBeInTheDocument();
  });

  it("renders the correct initial month", async () => {
  
    mockedGetAllEvents.mockResolvedValue(mockEvents);
    
    const result = await dispatch(fetchAllEvents());

   expect(result.type).toBe("events/fetchAllEvents/fulfilled");
   expect(result.payload).toEqual(mockEvents);

    render(
      <Provider store={store}>
        <Router>
          <MyCalendar />
        </Router>
      </Provider>
    );

    // Проверяем, что текущий месяц отображается
    const currentMonth = startOfMonth(new Date()).toLocaleString("uk-UA", {
      month: "long",
    });

    expect(screen.getByText(currentMonth)).toBeInTheDocument();

  });

  it("renders the correct next month on click on next month button", async () => {
    const initialState = {
      events: {
        isLoading: false,
        events: [
          {
            _id: "1",
            groupTitle: "groupTitle 1",
            groupId: "1",
            isCancelled: false,
            date: new Date().toISOString(),
            participants: [],
          },
          {
            _id: "2",
            groupTitle: "groupTitle 2",
            groupId: "2",
            isCancelled: false,
            date: new Date().toISOString(),
            participants: [],
          },
        ],
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

    const arrowBtnNext = await screen.findByTestId("next-month-button");
    expect(screen.getByTestId("next-month-button")).toBeInTheDocument();

    // Имитируем клик по событию
    fireEvent.click(arrowBtnNext);
    // Проверяем, что следующий месяц отображается
    const nextMonth = startOfMonth(addMonths(new Date(), 1)).toLocaleString(
      "uk-UA",
      { month: "long" }
    );
      expect(screen.getByText(nextMonth)).toBeInTheDocument()
 

    const arrowBtnLast = await screen.findByTestId("last-month-button");
    expect(screen.getByTestId("last-month-button")).toBeInTheDocument();

    // Имитируем клик по событию
    fireEvent.click(arrowBtnLast);
    const lastMonth = startOfMonth(addMonths(new Date(), 0)).toLocaleString(
      "uk-UA",
      { month: "long" }
    );
  
      expect(screen.getByText(lastMonth)).toBeInTheDocument()
    
  });

  it("selects an event and displays it", async () => {
    
    mockedGetAllEvents.mockResolvedValue(mockEvents);
    
    const result = await dispatch(fetchAllEvents());

 
    render(
      <Provider store={store}>
        <Router>
          <MyCalendar />
        </Router>
      </Provider>
    );

    const eventElement =  screen.getByText(mockEvents[0].groupTitle);
    expect(eventElement).toBeInTheDocument();

    // Имитируем клик по событию
    fireEvent.click(eventElement);

    // Проверяем, что выбранное событие теперь отображается
    expect(screen.getByText(mockEvents[0].groupTitle)).toBeInTheDocument(); // Если оно должно отображаться где-то
  });

});
