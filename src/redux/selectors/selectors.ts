
import { EventType } from "@testing-library/react";
import { RootState } from "../store/store";
import { EventTypeDB, GroupType, User } from "../types/types";

export const selectGroups = (state: RootState): GroupType[] => state.groups.groups;
export const selectUsers = (state: RootState): User[] => state.users.users;
export const selectEvents = (state: RootState): EventTypeDB[] => state.events.events;