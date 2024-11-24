import groupReducer, { setGroups } from './groupsSlice';
import { fetchAllGroups } from '../thunks/thunks'; 
import { GroupType } from '../types/types';
import { getAllGroups } from "../api/groupsApi";

jest.mock('../api/groupsApi');

describe('eventsSlice', () => {
  const initialState = {
    isLoading: false,
    error: undefined,
    groups: [],
    newGroup: undefined
  };

  it('should return the initial state', () => {
    expect(groupReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setGroups', () => {
    const groups: GroupType[] = [
      { _id: '1', title: 'groupTitle 1', coachId: 'Костя', payment: [], schedule: [], participants: [] }, 
      { _id: '2', title: 'groupTitle 2',  coachId: 'Костя', payment: [], schedule: [], participants: [] }
    ];
    const nextState = groupReducer(initialState, setGroups(groups));
    expect(nextState.groups).toEqual(groups);
  });

  // Тестирование асинхронных операций
  describe('extraReducers', () => {
    it('should handle getGroups.pending', () => {
      const nextState = groupReducer(initialState, { type: fetchAllGroups.pending.type });
      expect(nextState.isLoading).toBe(true);
    });

    it('should handle fetchAllEvents.fulfilled', () => {
      const groups: GroupType[] = [
        { _id: '1', title: 'groupTitle 1', coachId: 'Костя', payment: [], schedule: [], participants: [] }, 
        { _id: '2', title: 'groupTitle 2',  coachId: 'Костя', payment: [], schedule: [], participants: [] }
      ];

      (getAllGroups as jest.Mock).mockResolvedValue(groups);
      
      const nextState = groupReducer(initialState, { type: fetchAllGroups.fulfilled.type, payload: groups });
      expect(nextState.isLoading).toBe(false);
      expect(nextState.groups).toEqual(groups);
    });

    it('should handle fetchAllEvents.rejected', () => {
      (getAllGroups as jest.Mock).mockResolvedValue(null);
      const nextState = groupReducer(initialState, { type: fetchAllGroups.rejected.type, payload: 'Error message' });
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toEqual('Error message');
    });
  });
});
