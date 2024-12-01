import userReducer, { getUsers } from './userSlice';
import { fetchAllUsers } from '../thunks/thunks'; 
import { User } from '../types/types';
import { getAllUsers } from "../api/usersApi";


jest.mock('../api/usersApi');

describe('eventsSlice', () => {
  const initialState = {
    isLoading: false,
    error: undefined,
    users: [],
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle getGroups', () => {
    const groups: User[] = [
      { _id: '1', name: 'userName 1', password: '111', phone: '11111', isAdmin: false, groups: [], balance: 11, telegramId: 111, discount: 11, visits: [] }, 
      { _id: '2', name: 'userName 2',  password: '222', phone: '22222', isAdmin: true, groups: [],  balance: 22, telegramId: 222, discount: 22, visits: []  }
    ];
   
    const nextState = userReducer(initialState, getUsers(groups));
    expect(nextState.users).toEqual(groups);
  });

  // Тестирование асинхронных операций
  describe('extraReducers', () => {
    it('should handle getchGroups.pending', () => {
      const nextState = userReducer(initialState, { type: fetchAllUsers.pending.type });
      expect(nextState.isLoading).toBe(true);
    });

    it('should handle fetchAllEvents.fulfilled', () => {
      const groups: User[] = [
        { _id: '1', name: 'userName 1', password: '111', phone: '11111', isAdmin: false, groups: [], balance: 11, telegramId: 111, discount: 11, visits: [] }, 
        { _id: '2', name: 'userName 2',  password: '222', phone: '22222', isAdmin: true, groups: [],  balance: 22, telegramId: 222, discount: 22, visits: []  }
      ];

      (getAllUsers as jest.Mock).mockResolvedValue(groups);
      
      const nextState = userReducer(initialState, { type: fetchAllUsers.fulfilled.type, payload: groups });
      expect(nextState.isLoading).toBe(false);
      expect(nextState.users).toEqual(groups);
    });

    it('should handle fetchAllEvents.rejected', () => {
      (getAllUsers as jest.Mock).mockResolvedValue(null);
      const nextState = userReducer(initialState, { type: fetchAllUsers.rejected.type, payload: 'Error message' });
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toEqual('Error message');
    });
  });
});
