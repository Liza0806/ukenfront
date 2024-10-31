import { getEventById } from './../api/eventsApi';
import { fetchAllEvents, fetchAllGroups, fetchEventById, fetchAllUsers, fetchUsersByName } from './thunks';
import { EventTypeDB, GroupType, User } from '../types/types';
import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from '../slices/eventsSlice';
import groupsReducer from '../slices/groupsSlice'; 
import usersReducer from '../slices/userSlice'
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getAllGroups } from '../api/groupsApi';
import { getAllEvents } from '../api/eventsApi';
import { getAllUsers, getUsersByName } from '../api/usersApi';

// Мокаем функцию API
jest.mock('../api/groupsApi');
jest.mock('../api/eventsApi');
jest.mock('../api/usersApi');

const mockedGetAllGroups = getAllGroups as jest.MockedFunction<typeof getAllGroups>;
const mockedGetAllEvents = getAllEvents as jest.MockedFunction<typeof getAllEvents>;
const mockedgetEventById = getEventById as jest.MockedFunction<typeof getEventById>;
const mockedgetAllUsers = getAllUsers as jest.MockedFunction<typeof getAllUsers>;
const mockedgetUserByName = getUsersByName as jest.MockedFunction<typeof getUsersByName>;

describe('fetchAllGroups thunk', () => {

  // Создаем временный Redux store для тестов
  const store = configureStore({
    reducer: {
      groups: groupsReducer, // заменить на соответствующий редюсер для группы
    },
  });

  type AppDispatch = ThunkDispatch<ReturnType<typeof store.getState>, void, Action>;
  const dispatch: AppDispatch = store.dispatch;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches fulfilled action when fetchAllGroups succeeds', async () => {
    const groups: GroupType[] = [
      { _id: '1', title: 'Group 1', coachId: 'coach1', payment: [], schedule: [], participants: [] },
      { _id: '2', title: 'Group 2', coachId: 'coach2', payment: [], schedule: [], participants: [] },
    ];
    mockedGetAllGroups.mockResolvedValueOnce(groups);

    // Выполняем санк и ждем результата
    const result = await dispatch(fetchAllGroups());

    // Проверяем тип и данные результата
    expect(result.type).toBe('groups/fetchAllGroups/fulfilled');
    expect(result.payload).toEqual(groups);
  });

  it('dispatches rejected action when fetchAllGroups fails', async () => {
    mockedGetAllGroups.mockResolvedValueOnce(null); // имитируем ошибку API

    const result = await dispatch(fetchAllGroups());

    // Проверяем тип и данные результата
    expect(result.type).toBe('groups/fetchAllGroups/rejected');
    expect(result.payload).toBe('error');
  });
});


describe('fetchAllEvents thunk', () => {

    // Создаем временный Redux store для тестов
    const store = configureStore({
      reducer: {
        events: eventsReducer, // заменить на соответствующий редюсер для группы
      },
    });
  
    type AppDispatch = ThunkDispatch<ReturnType<typeof store.getState>, void, Action>;
    const dispatch: AppDispatch = store.dispatch;
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('dispatches fulfilled action when fetchAllGroups succeeds', async () => {
      const events: EventTypeDB[] = [
        { _id: '1', groupTitle: 'groupTitle 1', groupId: '1', isCancelled: false, date: new Date().toISOString(), participants: [] }, 
        { _id: '2', groupTitle: 'groupTitle 2',  groupId: '2', isCancelled: false, date: new Date().toISOString(), participants: [] }
      ];
      mockedGetAllEvents.mockResolvedValueOnce(events);
  
      // Выполняем санк и ждем результата
      const result = await dispatch(fetchAllEvents());
  
      // Проверяем тип и данные результата
      expect(result.type).toBe('events/fetchAllEvents/fulfilled');
      expect(result.payload).toEqual(events);
    });
  
    it('dispatches rejected action when fetchAllEvents fails', async () => {
        mockedGetAllEvents.mockResolvedValueOnce(null); // имитируем ошибку API
  
      const result = await dispatch(fetchAllEvents());
  
      // Проверяем тип и данные результата
      expect(result.type).toBe('events/fetchAllEvents/rejected');
      expect(result.payload).toBe('error');
    });
  });


  describe('fetchEventById thunk', () => {

    // Создаем временный Redux store для тестов
    const store = configureStore({
      reducer: {
        events: eventsReducer, // заменить на соответствующий редюсер для группы
      },
    });
  
    type AppDispatch = ThunkDispatch<ReturnType<typeof store.getState>, void, Action>;
    const dispatch: AppDispatch = store.dispatch;
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('dispatches fulfilled action when fetchEventById succeeds', async () => {
      const event: EventTypeDB = 
        { _id: '2', groupTitle: 'groupTitle 2',  groupId: '2', isCancelled: false, date: new Date().toISOString(), participants: [] }
    
      mockedgetEventById.mockResolvedValueOnce(event);
  
      // Выполняем санк и ждем результата
      const result = await dispatch(fetchEventById('2'));
  
      // Проверяем тип и данные результата
      expect(result.type).toBe('events/fetchEventById/fulfilled');
      expect(result.payload).toEqual(event);
    });
  
    it('dispatches rejected action when fetchEventById fails', async () => {
        mockedgetEventById.mockResolvedValueOnce(null); // имитируем ошибку API
  
      const result = await dispatch(fetchEventById('2'));
  
      // Проверяем тип и данные результата
      expect(result.type).toBe('events/fetchEventById/rejected');
      expect(result.payload).toBe('error');
    });
  });
  
describe('fetchAllUsers thunk', () => {

    // Создаем временный Redux store для тестов
    const store = configureStore({
      reducer: {
        users: usersReducer, // заменить на соответствующий редюсер для группы
      },
    });
  
    type AppDispatch = ThunkDispatch<ReturnType<typeof store.getState>, void, Action>;
    const dispatch: AppDispatch = store.dispatch;
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('dispatches fulfilled action when fetchAllUsers succeeds', async () => {
      const users: User[] = [
        { _id: '1', name: 'userName 1', password: '111', phone: '11111', isAdmin: false, groups: [], balance: 11, telegramId: '111', discount: 11, visits: [] }, 
        { _id: '2', name: 'userName 2',  password: '222', phone: '22222', isAdmin: true, groups: [],  balance: 22, telegramId: '222', discount: 22, visits: []  }
      ];
      mockedgetAllUsers.mockResolvedValueOnce(users);
  
      // Выполняем санк и ждем результата
      const result = await dispatch(fetchAllUsers());
  
      // Проверяем тип и данные результата
      expect(result.type).toBe('users/fetchAllUsers/fulfilled');
      expect(result.payload).toEqual(users);
    });
  
    it('dispatches rejected action when fetchAllUsers fails', async () => {
        mockedgetAllUsers.mockResolvedValueOnce(null); // имитируем ошибку API
  
      const result = await dispatch(fetchAllUsers());
  
      // Проверяем тип и данные результата
      expect(result.type).toBe('users/fetchAllUsers/rejected');
      expect(result.payload).toBe('error');
    });
  });

  describe('fetchUsersByName thunk', () => {

    // Создаем временный Redux store для тестов
    const store = configureStore({
      reducer: {
        users: usersReducer, // заменить на соответствующий редюсер для группы
      },
    });
  
    type AppDispatch = ThunkDispatch<ReturnType<typeof store.getState>, void, Action>;
    const dispatch: AppDispatch = store.dispatch;
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('dispatches fulfilled action when fetchUsersByName succeeds', async () => {
      const user: User =  { _id: '1', name: 'userName', password: '111', phone: '11111', isAdmin: false, groups: [], balance: 11, telegramId: '111', discount: 11, visits: [] }
     
      mockedgetUserByName.mockResolvedValueOnce(user);
  
      // Выполняем санк и ждем результата
      const result = await dispatch(fetchUsersByName('userName'));
  
      // Проверяем тип и данные результата
      expect(result.type).toBe('users/fetchUsersByName/fulfilled');
      expect(result.payload).toEqual(user);
    });
  
    it('dispatches rejected action when fetchUsersByName fails', async () => {
        mockedgetUserByName.mockResolvedValueOnce(null); // имитируем ошибку API
  
      const result = await dispatch(fetchUsersByName('userName'));
  
      // Проверяем тип и данные результата
      expect(result.type).toBe('users/fetchUsersByName/rejected');
      expect(result.payload).toBe('error');
    });
  });
  