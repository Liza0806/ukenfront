import { ParticipantType } from './../../redux/types/types';
import { ScheduleType } from "../../redux/types/types";

export type InitialStateAddGroupFormType = {
  showModal: boolean;
  title: string;
  dailyPayment: number;
  monthlyPayment: number;
  schedule: ScheduleType[];
  error: string | null;
  disable: boolean;
  _id: string;
  participants?: ParticipantType[];
  isUpdate?: boolean;
};

export type ActionType =
  | { type: "TOGGLE_MODAL" }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DAILY_PAYMENT"; payload: number }
  | { type: "SET_MONTHLY_PAYMENT"; payload: number }
  | { type: "ADD_SCHEDULE" }
  | { type: "UPDATE_SCHEDULE"; payload: { index: number; field: string; value: string } }
  | { type: "REMOVE_SCHEDULE_ITEM"; payload: number }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_DISABLE"; payload: boolean }
  | { type: "RESET_FORM" };

export const initialState: InitialStateAddGroupFormType = {
  showModal: false,
  title: "",
  dailyPayment: 0,
  monthlyPayment: 0,
  schedule: [],
  error: null,
  disable: true,
  _id: '0'
};

export function reducer(
  state: InitialStateAddGroupFormType,
  action: ActionType
): InitialStateAddGroupFormType {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return { ...state, showModal: !state.showModal };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DAILY_PAYMENT":
      return { ...state, dailyPayment: action.payload };
    case "SET_MONTHLY_PAYMENT":
      return { ...state, monthlyPayment: action.payload };
    case "ADD_SCHEDULE":
      return { ...state, schedule: [...state.schedule, { day: "", time: "" }] };
    case "UPDATE_SCHEDULE":
      const updatedSchedule = state.schedule.map((item, index) =>
        index === action.payload.index
          ? { ...item, [action.payload.field]: action.payload.value }
          : item
      );
      return { ...state, schedule: updatedSchedule };
    case "REMOVE_SCHEDULE_ITEM":
      return {
        ...state,
        schedule: state.schedule.filter((_, index) => index !== action.payload),
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_DISABLE":
      return { ...state, disable: action.payload };
    case "RESET_FORM":
      return { ...initialState };
    default:
      return state;
  }
}