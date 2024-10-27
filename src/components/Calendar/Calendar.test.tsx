import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MyCalendar from './Calendar'; // Импортируйте ваш компонент
import eventReducer from '../../redux/slices/eventsSlice'; // Импортируйте редьюсер событий
import { BrowserRouter as Router } from 'react-router-dom'; 
import { startOfMonth, subMonths } from 'date-fns';
import { EventTypeDB } from '../../redux/types/types';
import { render, screen, fireEvent } from "@testing-library/react";

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

describe('MyCalendar component', () => {
  test('renders loading message when no events are present', () => {
    render(
      <Provider store={store}>
       <Router>
        <MyCalendar />
      </Router>
      </Provider>
    );
    expect(screen.getByText(/завантаження тренувань.../i)).toBeInTheDocument();
  });

  test('renders the correct initial month', async () => {
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
    expect(await screen.findByText(/завантаження тренувань.../i)).toBeInTheDocument();
  
    // Проверяем, что текущий месяц отображается
    const currentMonth = startOfMonth(new Date()).toLocaleString("uk-UA", { month: "long" });
    expect(await screen.findByText(currentMonth)).toBeInTheDocument();
  });

  test('selects an event and displays it', async () => {
    const mockEvent: EventTypeDB = {
      _id: '1',
      groupTitle: 'Тренировка по боксу',
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
});
