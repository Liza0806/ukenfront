import { getAllUsers } from '../redux/api/usersApi'; // Функция для запроса
import { fetchAllUsers } from '../redux/thunks/thunks'; // Танк для получения пользователей
import { UserList } from '../components/UserList/UserList';
import { render, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "../redux/slices/userSlice";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
// Мокаем getAllUsers
jest.mock('../redux/api/usersApi', () => ({
  getAllUsers: jest.fn(),
}));

// Пример данных, которые будут возвращены мок-функцией
const mockUsers = [
  {
    _id: '1',
    name: 'userName',
    password: '111',
    phone: '11111',
    isAdmin: false,
    groups: [],
    balance: 11,
    telegramId: '111',
    discount: 11,
    visits: [],
  },
  {
    _id: '2',
    name: 'userName2',
    password: '222',
    phone: '222222',
    isAdmin: true,
    groups: [],
    balance: 22,
    telegramId: '222',
    discount: 22,
    visits: [],
  },
];
const mockUsersForUserList = [
  {
    _id: '1',
    name: 'userName',
    telegramId: '111',
  },
  {
    _id: '2',
    name: 'userName2', 
    telegramId: '222',
  },
];
// Конфигурируем мок-функцию getAllUsers
const mockedgetAllUsers = getAllUsers as jest.MockedFunction<typeof getAllUsers>;

describe('useManageUsers hook', () => {
  const mockStore = configureStore({
    reducer: {
      users: usersReducer,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and set users when getUsers is called', async () => {
    // Мокаем возвращаемое значение getAllUsers
    mockedgetAllUsers.mockResolvedValueOnce(mockUsers);

    // Вызываем dispatch для получения пользователей
    const dispatch = mockStore.dispatch;
    const result = await dispatch(fetchAllUsers());

    // Проверяем, что состояние fulfilled
    expect(result.type).toBe('users/fetchAllUsers/fulfilled');
    expect(result.payload).toEqual(mockUsers);
    // Мокаем параметры для компонента
    const smthMock = {}; 
    const setSmthMock = jest.fn(); 


    render(
      <Provider store={mockStore}>
        <Router>
          <UserList smth={smthMock} setSmth={setSmthMock} existingUsers={mockUsersForUserList}/>
        </Router>
      </Provider>
    );

    // Проверяем, что пользователи отобразились на странице
    await waitFor(() => {
      expect(screen.getByText('userName')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('userName2')).toBeInTheDocument();
    });
  });
});
