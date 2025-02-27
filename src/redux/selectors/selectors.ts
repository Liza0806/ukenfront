import { RootState } from "../store/store";
import { EventTypeDB, GroupType, Payment, User } from "../types/types";
import { createSelector } from "reselect";

export const selectGroups = (state: RootState): GroupType[] => state.groups.groups;
export const selectCurrentGroup = (state: RootState): GroupType | undefined => state.groups.currentGroup;
export const selectGroupsIsLoading = (state: RootState): boolean => state.groups.isLoading;
export const selectGroupsError = (state: RootState): string | undefined => state.groups.error;

export const selectUsersIsLoading = (state: RootState): boolean => state.users.isLoading;
export const selectUsers = (state: RootState): User[] => state.users.users;

export const selectEvents = (state: RootState): EventTypeDB[] => state.events.events;
export const selectEventsIsLoading = (state: RootState): boolean => state.events.isLoading;
export const selectCurrentEvent = (state: RootState): EventTypeDB | undefined => state.events.currentEvent;

export const selectPayments = (state: RootState): Payment[] => state.payments.payments;
// Селектор для событий в этом году
export const selectEventsThisYear = createSelector(
  [selectEvents],
  (events: EventTypeDB[]) => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1); // начало текущего года
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999); // конец текущего года

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfYear && eventDate <= endOfYear;
    });
  }
);

// Селектор для событий в этом месяце
export const selectEventsThisMonth = createSelector(
  [selectEvents],
  (events: EventTypeDB[]) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // первое число текущего месяца
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999); // последнее число текущего месяца

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfMonth && eventDate <= endOfMonth;
    });
  }
);

  export const selectEventsThisWeek = createSelector(
    [selectEvents],
    (events: EventTypeDB[]) => {
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
  
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
  
      return events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= startOfWeek && eventDate <= endOfWeek;
      });
    }
  );

  export const selectSortedUsers = createSelector(
    [selectUsers],
    (users: User[]) => {
      return users.slice().sort((a, b) => a.name.localeCompare(b.name)); 
    }
  );
  export const selectActiveUsers = createSelector(
    [selectUsers],
    (users: User[]) => {
      return  users?.filter(user => user.isActive === true) || []
    }
  );
  

//"proxy": "https://ukenback.vercel.app",
// "proxy": "http://localhost:3001",
// Использовать reselect для всех селекторов – избыточно. Но вот когда его стоит применять:
// 🔹 Если селектор делает вычисления (фильтрация, агрегация, сортировка).
// 🔹 Если селектор возвращает массив/объект, который ломает memo.
// 🔹 Если селектор используется в нескольких местах, и мы хотим избежать дублирования вычислений.