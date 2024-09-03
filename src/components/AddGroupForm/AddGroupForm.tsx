import React, { useEffect, useReducer } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { addGroupTh, fetchAllGroups } from "../../redux/thunks/thunks";
import { Button, ButtonColor, ButtonSize } from "../Button/Button";
import { initialState, reducer } from "./formReducer";
import { toast } from "react-toastify";
import { GroupType, ScheduleType } from "../../redux/types/types";
import { group } from "console";
import GroupFormFields from "../GroupFormFields/GroupFormFields";

interface AddGroupFormProps {
  groups: GroupType[]; // Замените any на конкретный тип
}

const validDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const AddGroupForm: React.FC<AddGroupFormProps> = ({ groups }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (
      state.title.trim() &&
      (state.dailyPayment || state.monthlyPayment) &&
      state.schedule.length !== 0
    ) {
      dispatch({ type: "SET_DISABLE", payload: false });
    } else {
      dispatch({ type: "SET_DISABLE", payload: true });
    }
  }, [state.title, state.dailyPayment, state.monthlyPayment, state.schedule]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  const validateForm = () => {
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
      if (isTimeOccupied(sched.day, sched.time)) {
        dispatch({
          type: "SET_ERROR",
          payload: "Время занято другим занятием",
        });
        return false;
      }
    }
    if (isGroupExists(state.title)) {
      dispatch({
        type: "SET_ERROR",
        payload: "Группа с таким названием уже существует",
      });
      return false;
    }
    dispatch({ type: "SET_ERROR", payload: null });
    return true;
  };

  const isGroupExists = (groupTitle: string) => {
    return groups.some((group) => group.title === groupTitle);
  };

  const isTimeOccupied = (day: string, time: string) => {
    return groups.some((group) =>
      group.schedule.some(
        (sched: ScheduleType) => sched.day === day && sched.time === time
      )
    );
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const group = {
          title: state.title,
          coachId: "Костя",
          payment: [
            {
              dailyPayment: state.dailyPayment,
              monthlyPayment: state.monthlyPayment,
            },
          ],
          schedule: state.schedule,
          participants: [],
        };
        console.log(group, "группа в handleSubmit");
        await appDispatch(addGroupTh({ group }));
        dispatch({ type: "RESET_FORM" });
        toast.success("Группа успешно добавлена");
        appDispatch(fetchAllGroups());
      } catch (error) {
        toast.error("Ошибка при добавлении группы");
      }
    }
  };

  const handleScheduleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    dispatch({ type: "UPDATE_SCHEDULE", payload: { index, field, value } });
  };

  const addSchedule = () => {
    dispatch({ type: "ADD_SCHEDULE" });
  };

  const removeScheduleItem = (index: number) => {
    dispatch({ type: "REMOVE_SCHEDULE_ITEM", payload: index });
  };

  return (
    <div>
      <h2>Добавить группу</h2>
      <GroupFormFields
        state={state}
        handleScheduleChange={handleScheduleChange}
        addSchedule={addSchedule}
        removeScheduleItem={removeScheduleItem}
        validDays={validDays}
        dispatch={dispatch}
      />
      <Button
        size={ButtonSize.BASE}
        color={ButtonColor.PRIMARY}
        onClick={handleSubmit}
        disabled={state.disable}
      >
        Добавить группу
      </Button>
    </div>
  );
};

export default AddGroupForm;
