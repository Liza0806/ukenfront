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
  dailyPayment: number | undefined;
  monthlyPayment: number | undefined;
};
export type ScheduleType = {
  day: string;
  time: string;
};

export type ParticipantType = {
  id: string;
  name: string;
};

export type GroupType = {
  _id: string;
  title: string;
  coachId?: string;
  payment: PaymentType[];
  schedule: ScheduleType[];
};
export type AddGroupType = {
  title: string;
  coachId?: string;
  payment: PaymentType[];
  schedule: ScheduleType[];
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

/// EVENT

export interface Participant {
  id: string;
  name: string;
}

export type EventTypeDB = {
  date: Date;
  isCancelled: boolean;
  participants: ParticipantType[];
  _id: string;
  group: string;
};

//// USER

export interface Visit {
  date: Date;
  groupId: string;
  eventId: string;
}

export interface User {
  name: string;
  password: string;
  phone?: string; // Опциональное поле, так как оно не является обязательным в Mongoose модели
  isAdmin?: boolean; // Опциональное поле с значением по умолчанию false
  groups: string[]; // Массив строк
  balance: number;
  discount?: number; // Оп
}
