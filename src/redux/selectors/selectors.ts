import { RootState } from "../store/store";
import { EventTypeDB, GroupType, User } from "../types/types";

export const selectGroups = (state: RootState): GroupType[] => state.groups.groups;
export const selectCurrentGroup = (state: RootState): GroupType | undefined => state.groups.currentGroup;
export const selectGroupsIsLoading = (state: RootState): boolean => state.groups.isLoading;
export const selectGroupsError = (state: RootState): string | undefined => state.groups.error;

export const selectUsersIsLoading = (state: RootState): boolean => state.users.isLoading;
export const selectUsers = (state: RootState): User[] => state.users.users;

export const selectEvents = (state: RootState): EventTypeDB[] => state.events.events;
export const selectEventsIsLoading = (state: RootState): boolean => state.events.isLoading;
export const selectCurrentEvent = (state: RootState): EventTypeDB | undefined => state.events.currentEvent;

//"proxy": "https://ukenback.vercel.app",