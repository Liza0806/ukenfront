import { error, group } from 'console';
/// GROUP

export interface AddGroupArgs {
  group: GroupType;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data: string; 
  status: number
}

export type PaymentType = {
  dailyPayment: number;
  monthlyPayment: number;
}
  
export type ScheduleType = {
  day: string;
  time: string;
};

export type ParticipantType = {
  _id: string;
  name: string;
  telegramId: string;
};

export type GroupType = {
  _id?: string;
  title: string;
  coachId?: string;
  payment: PaymentType[];
  schedule: ScheduleType[];
  participants: ParticipantType[];
};

export type AddGroupType = {
  title: string;
  coachId?: string;
  payment: PaymentType[];
  schedule: ScheduleType[];
  participants: ParticipantType[];
};

export type GroupStateType = {
  isLoading: boolean;
  error: string | undefined;
  groups: GroupType[];
  newGroup?: GroupType;
};

export type validDays =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

 export const daysOfWeekUk = [
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П'ятниця",
    "Субота",
    "Неділя",
  ];

/// EVENT

export type EventTypeDB = {
  date: Date;
  isCancelled: boolean;
  participants: ParticipantType[];
  _id: string;
  groupTitle: string;
  groupId: string;
};

//// USER
export type UserStateType = {
  isLoading: boolean;
  error: string | undefined;
  users: User[];
}


export interface Visit {
  date: Date;
  groupId: string;
  eventId: string;
}

export interface User {
  _id: string;
  name: string;
  password: string;
  phone?: string;
  isAdmin?: boolean; 
  groups: string[]; 
  balance: number;
  telegramId: string;
}
