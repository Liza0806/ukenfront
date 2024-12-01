import eventsReducer, { setEvents, setCurrentEvent } from './eventsSlice';
import { fetchAllEvents } from '../thunks/thunks'; 
import { EventTypeDB } from '../types/types';
import { getAllEvents } from "../api/eventsApi";

jest.mock('../api/eventsApi');

describe('eventsSlice', () => {
  const initialState = {
    isLoading: false,
    error: undefined,
    events: [],
    currentEvent: undefined 
  };

  it('should return the initial state', () => {
    expect(eventsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setEvents', () => {
    const events: EventTypeDB[] = [
      { _id: '1', groupTitle: 'groupTitle 1', groupId: '1', isCancelled: false, date: new Date().toISOString(), participants: [] }, 
      { _id: '2', groupTitle: 'groupTitle 2',  groupId: '2', isCancelled: false, date: new Date().toISOString(), participants: [] }
    ];
    const nextState = eventsReducer(initialState, setEvents(events));
    expect(nextState.events).toEqual(events);
  });

  it('should handle setCurrentEvent', () => {
    const event = { _id: '1', groupTitle: 'groupTitle 1', groupId: '1', isCancelled: false, date: new Date().toISOString(), participants: [] }; 
    const nextState = eventsReducer(initialState, setCurrentEvent(event));
    expect(nextState.currentEvent).toEqual(event);
  });

  // Тестирование асинхронных операций
  describe('extraReducers', () => {
    it('should handle fetchAllEvents.pending', () => {
      const nextState = eventsReducer(initialState, { type: fetchAllEvents.pending.type });
      expect(nextState.isLoading).toBe(true);
    });

    it('should handle fetchAllEvents.fulfilled', () => {
      const events: EventTypeDB[] = [
        { _id: '1', groupTitle: 'groupTitle 1', groupId: '1', isCancelled: false, date: new Date().toISOString(), participants: [] },
        { _id: '2', groupTitle: 'groupTitle 2',  groupId: '2', isCancelled: false, date: new Date().toISOString(), participants: [] }
      ];

      (getAllEvents as jest.Mock).mockResolvedValue(events);
      
      const nextState = eventsReducer(initialState, { type: fetchAllEvents.fulfilled.type, payload: events });
      expect(nextState.isLoading).toBe(false);
      expect(nextState.events).toEqual(events);
    });

    it('should handle fetchAllEvents.rejected', () => {
      (getAllEvents as jest.Mock).mockResolvedValue(null);
      const nextState = eventsReducer(initialState, { type: fetchAllEvents.rejected.type, payload: 'Error message' });
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toEqual('Error message');
    });
  });
});
