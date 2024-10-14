import React, { useEffect, useReducer, useState } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { addGroupTh, fetchAllGroups } from "../../redux/thunks/thunks";
import { Button, ButtonColor, ButtonSize } from "../Button/Button";
import { initialState, InitialStateAddGroupFormType, reducer } from "../../pages/GroupsPage/formReducer";
import { toast } from "react-toastify";
import { GroupType, ScheduleType } from "../../redux/types/types";
import GroupFormFields from "../GroupFormFields/GroupFormFields";

import cls from "./AddGroupForm.module.scss";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";


interface AddGroupFormProps {
  groups: GroupType[]; 
}

const validDays = [
  "неділя",
  "понеділок",
  "вівторок",
  "середа",
  "четвер",
  "п'ятниця",
  "субота",
];

const AddGroupForm: React.FC<AddGroupFormProps> = ({ groups }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const appDispatch = useAppDispatch();

// показываем-убираем кнопку добавить группу
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

  // обработка ошибок нотификашками
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);



// сабмит формы
  const handleSubmit = async () => {
  //  if (validateForm(state, dispatch, groups)) {
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
     //   console.log(group, "группа в handleSubmit");
        await appDispatch(addGroupTh({ group }));
        dispatch({ type: "RESET_FORM" });
        toast.success("Группа успешно добавлена");
        appDispatch(fetchAllGroups());
      } catch (error) {
        toast.error("Ошибка при добавлении группы");
      }
  //  }
  };

  // штуки про расписание
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

    <div className={cls.addFormConteiner}>
      <div className={cls.conteinerHeader}>
        {" "}
        <h2 className={cls.title}>Додати групу</h2>
        <Button
          size={ButtonSize.BASE}
          color={ButtonColor.PRIMARY}
          onClick={handleSubmit}
          disabled={state.disable}
        >
          <LibraryAddIcon color="primary"></LibraryAddIcon>
        </Button>
      </div>

      <GroupFormFields
        state={state}
        handleScheduleChange={handleScheduleChange}
        addSchedule={addSchedule}
        removeScheduleItem={removeScheduleItem}
        validDays={validDays}
        dispatch={dispatch}
    
      />

      <Button
        className={cls.button}
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
