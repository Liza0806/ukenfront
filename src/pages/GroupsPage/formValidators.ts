import { group } from 'console';
import { GroupType, ScheduleType } from "../../redux/types/types";
import { ActionType, InitialStateAddGroupFormType } from "./formReducer";


export const isGroupExists = (groupTitle: string, _id: string, groups: GroupType[]) => {

    return groups.some((group) => {
      return group._id !== _id && group.title === groupTitle});
  };

  export const isTimeOccupied = (day: string, time: string,  _id: string, groups: GroupType[]) => {
    return groups.some((group) =>
      group.schedule.some(
        (sched: ScheduleType) => {
          return group._id !== _id && sched.day === day && sched.time === time}
      )
    );
  };

  // валидация формы
 export const validateForm = (state: InitialStateAddGroupFormType, dispatch: React.Dispatch<ActionType>,  groups: GroupType[]) => {
    if (!state.title.trim()) {
      dispatch({
        type: "SET_ERROR",
        payload: "Название группы не может быть пустым",
      });
      return false;
    }
    if (!state.dailyPayment && !state.monthlyPayment) {
      dispatch({
        type: "SET_ERROR",
        payload: "Укажите хотя бы один тип платежа",
      });
      return false;
    }
    if (state.schedule.length === 0) {
      dispatch({
        type: "SET_ERROR",
        payload: "Добавьте хотя бы одно занятие в расписание",
      });
      return false;
    }
    for (let sched of state.schedule) {
      if (!sched.day || !sched.time) {
        dispatch({
          type: "SET_ERROR",
          payload: "Заполните все поля расписания",
        });
        return false;
      }
      if (isTimeOccupied(sched.day, sched.time, state._id, groups)) {
        dispatch({
          type: "SET_ERROR",
          payload: "Время занято другим занятием",
        });
        return false;
      }
    }
    if (isGroupExists(state.title, state._id, groups)) {
      dispatch({
        type: "SET_ERROR",
        payload: "Группа с таким названием уже существует",
      });
      return false;
    }
    dispatch({ type: "SET_ERROR", payload: null });
    return true;
  };
