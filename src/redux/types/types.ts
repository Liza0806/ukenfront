export type PaymentType = {
    dailyPayment: number;
    monthlyPayment: number;
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
    _id: string, 
    title: string,
    coachId: string,
    payment: PaymentType;
    schedule: ScheduleType;
  };
  
  export type GroupStateType = {
      isLoading: boolean,
      error: string | undefined,
      groups: GroupType[];
  }

  export type EventTypeDB = {
    date: Date;
    isCancelled: boolean;
    participants: ParticipantType[];
    _id: string;
    group: string,
  };