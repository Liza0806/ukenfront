import {
  selectGroups,
  selectGroupsIsLoading,
  selectUsers,
  selectCurrentEvent,
} from "./selectors"; // путь к файлу с селекторами
import { RootState } from "../store/store"; // путь к store

describe("Selectors", () => {
  const mockState: RootState = {
    groups: {
      groups: [
        {_id: "1",
          title: "Boxing",
          coachId: "123",
         
              dailyPayment: 5,
          monthlyPayment: 10,
         
          schedule: [
            {
              day: "Понеділок",
              time: "16:11",
            },
            {
              day: "Середа",
              time: "16:11",
            },
            {
              day: "Неділя",
              time: "16:11",
            },
          ],
          participants: [
            {
              _id: "66d9c628c0839ff5f3bd730f",
              name: "Индросий",
              telegramId: 412631781,
            },
          ],
        },
      ],
      isLoading: false,
      error: undefined,
    },
    users: {
      users: [
        {
          _id: "1",
          name: "John Doe",
          password: "hashedPassword",
          isAdmin: false,
          groups: [],
          balance: 100,
          telegramId: 123,
          visits: [],
        },
      ],
      isLoading: true,
      error: undefined,
    },
    events: {
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
      isLoading: false,
      error: undefined,
      currentEvent: {
        _id: "1",
        groupTitle: "groupTitle 1",
        groupId: "1",
        isCancelled: false,
        date: new Date().toISOString(),
        participants: [],
      },
    },
    payment:{
        paymentStatus: '',
        error: undefined
    }
  };

  it("selectGroups returns the correct groups array", () => {
    const result = selectGroups(mockState);
    expect(result).toEqual(mockState.groups.groups);
  });

  it("selectGroupsIsLoading returns false", () => {
    const result = selectGroupsIsLoading(mockState);
    expect(result).toBe(false);
  });

  it("selectUsers returns the correct users array", () => {
    const result = selectUsers(mockState);
    expect(result).toEqual(mockState.users.users);
  });

  it("selectCurrentEvent returns the current event", () => {
    const result = selectCurrentEvent(mockState);
    expect(result).toEqual(mockState.events.currentEvent);
  });
});
