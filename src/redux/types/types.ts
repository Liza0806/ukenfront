import { error, group } from "console";
/// GROUP

export interface AddGroupArgs {
  group: GroupType;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data: string;
  status: number;
}

export type PaymentType = {
  dailyPayment: number;
  monthlyPayment: number;
};

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
  _id: string;
  title: string;
  coachId?: string;
  payment: PaymentType[];
  schedule: ScheduleType[];
  participants: ParticipantType[];
};

export type AddGroupType = {
  title: string;
  coachId?: string | "Костя";
  payment: PaymentType[];
  schedule: ScheduleType[];
  participants: ParticipantType[];
};

export type GroupStateType = {
  isLoading: boolean;
  error: string | undefined;
  groups: GroupType[];
  newGroup?: GroupType | undefined;
};

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
  _id: string;
  date: string;
  groupTitle: string;
  groupId: string;
  isCancelled: boolean;
  participants: ParticipantType[];
};

export type EventStateType = {
  isLoading: boolean;
  error: string | undefined;
  events: EventTypeDB[];
  currentEvent?: EventTypeDB | undefined;
};

//// USER
export type UserStateType = {
  isLoading: boolean;
  error: string | undefined;
  users: User[];
};

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
  discount?: number;
  visits: Visit[];
}

//// PAYMENT

export interface PaymentState {
  paymentStatus: string;
  error: string | null;
}

//// ALL
export type PartialUserWithRequiredFields = Partial<User> & Pick<User, '_id' | 'name' | 'telegramId'>;
