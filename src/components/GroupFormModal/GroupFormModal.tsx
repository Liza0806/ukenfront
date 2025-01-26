import cls from "./GroupFormModal.module.scss";
import {
  AddGroupType,
  daysOfWeekUk,
  ParticipantType,
  ScheduleType,
} from "../../redux/types/types";
import UserList from "../UserList/UserList";
import { selectUsers } from "../../redux/selectors/selectors";
import { useAppSelector } from "../../redux/hooks/hooks";

import React, { useState } from "react";
import { GroupType } from "../../redux/types/types";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { toast } from "react-toastify";
import {
  fetchAllGroups,
  addGroupTh,
  updateGroupTh,
} from "../../redux/thunks/thunks";
import { AppDispatch } from "../../redux/store/store";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";


interface GroupFormProps {
  initialGroupData?: GroupType;
  isEditMode: boolean;
  closeModal: () => void;
}
interface groupFormStateType {
  title: string;
  dailyPayment: number | undefined;
  monthlyPayment: number | undefined;
  schedule: ScheduleType[];
  participants: ParticipantType[];
}

export const handleSubmit = async (
  isEditMode: boolean,
  groupFormState: groupFormStateType, // Типизируй аргументы
  appDispatch: AppDispatch,
  closeModal: () => void,
  _id?: string
) => {
  if (!groupFormState.title) {
    toast.error("Title");
    return;
  }
  if (!groupFormState.dailyPayment && !groupFormState.monthlyPayment) {
    toast.error("один из платежей должен быть заполнен");
    return;
  }

  if (
    !groupFormState.schedule.map((el) => {
      if (el.day && el.time) {
        return true;
      }
      return false;
    }) ||
    groupFormState.schedule.length === 0
  ) {
    toast.error("не верный формат расписания");
    return;
  }
  const groupForTh: AddGroupType = {
    title: groupFormState.title,
    coachId: "Kostya",
    payment: [
      {
        dailyPayment: groupFormState.dailyPayment
          ? groupFormState.dailyPayment
          : 0,
        monthlyPayment: groupFormState.monthlyPayment
          ? groupFormState.monthlyPayment
          : 0,
      },
    ],
    schedule: [...groupFormState.schedule],
    participants: [...groupFormState.participants],
  };
  // console.log(initialGroupData, 'initialGroupData')
  try {
    let result;
    if (isEditMode && _id) {
      //   ;
      result = await appDispatch(
        updateGroupTh({ group: groupForTh, _id: _id })
      ).unwrap(); // Разворачиваем результат, чтобы проверить ошибки
      //   ;
      toast.success("Группа успешно обновлена");
      closeModal();
    } else {
      //    ;
      console.log(groupForTh, "groupForTh");
      result = await appDispatch(addGroupTh(groupForTh)).unwrap(); // Разворачиваем результат
      toast.success("Группа успешно добавлена");
      closeModal();
    }
    //    ;
    appDispatch(fetchAllGroups());
  } catch (error) {
    //   ;
    toast.error("Ошибка при сохранении группы");
  }
};

export const GroupFormModal: React.FC<GroupFormProps> = ({
  initialGroupData,
  isEditMode,
  closeModal,
}) => {
  const appDispatch = useAppDispatch();
  const usersInBase = useAppSelector(selectUsers);
  console.log(initialGroupData, "initialGroupData");
  const [groupId, setGroupId] = useState(initialGroupData?._id);

  const [groupFormState, setGroupFormState] = useState<groupFormStateType>(
    isEditMode && initialGroupData
      ? {
          title: initialGroupData.title,
          dailyPayment: initialGroupData.payment[0].dailyPayment,
          monthlyPayment: initialGroupData.payment[0].monthlyPayment,
          schedule: initialGroupData.schedule,
          participants: initialGroupData.participants,
        }
      : {
          title: "",
          dailyPayment: 0,
          monthlyPayment: 0,
          schedule: [],
          participants: [],
        }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target as HTMLInputElement;
    let value: string | number = e.target.value;

    if (type === "number") {
      value = Number(value);
    }
    setGroupFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleScheduleChange = (
    index: number,
    field: "day" | "time",
    value: string
  ) => {
    const updatedSchedule = [...groupFormState.schedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      [field]: value,
    };
    setGroupFormState((prevState) => ({
      ...prevState,
      schedule: updatedSchedule,
    }));
  };

  const handleAddSchedule = () => {
    setGroupFormState((prevState) => ({
      ...prevState,
      schedule: [...prevState.schedule, { day: "", time: "00:00" }],
    }));
  };

  const handleDeleteSchedule = (index: number) => {
    setGroupFormState((prevState) => ({
      ...prevState,
      schedule: prevState.schedule.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className={cls.modalContent}>
      <div>
        <label className={cls.name} htmlFor="title">
          <p className={cls.title}>Назва</p>
          <input
            id="title"
            className={cls.input}
            type="text"
            value={groupFormState.title}
            name="title"
            onChange={handleInputChange}
            // onBlur={onUnfocus}
            data-testid="group-title-input"
            required
          />
        </label>
      </div>

      <div className={cls.pay}>
        <label className={cls.name} htmlFor="dailyPayment">
          <p className={cls.title}>Разова плата</p>
          <input
            id="dailyPayment"
            className={cls.inputNum1}
            type="number"
            name="dailyPayment"
            placeholder="Ежедневный платеж"
            value={
              groupFormState.dailyPayment
                ? groupFormState.dailyPayment
                : undefined
            }
            onChange={handleInputChange}
            data-testid="group-dailyPayment-input"
            required
          />
        </label>
      </div>
      <div className={cls.pay}>
        <label className={cls.name}  htmlFor="monthlyPayment">
          <p className={cls.title}>Місячна плата</p>
          <input
            id="monthlyPayment"
            className={cls.inputNum2}
            type="number"
            name="monthlyPayment"
            placeholder="Ежемесячный платеж"
            value={
              groupFormState.monthlyPayment
                ? groupFormState.monthlyPayment
                : undefined
            }
            onChange={handleInputChange}
            data-testid="group-monthlyPayment-input"
            required
          />
        </label>
      </div>

      <div>
        <label className={cls.event}>
          <p className={cls.title}> Додати час та дату тренувань</p>
          <AddIcon sx={{ color: "#ff9900" }} onClick={handleAddSchedule}>
      
      </AddIcon>
        </label>
       

        {groupFormState.schedule.length > 0 &&
          groupFormState.schedule.map((sched, index) => (
            <div key={index} className={cls.timeAndDate}>
              <select
              className={cls.select}
                value={sched.day}
                data-testid="group-scheduleDay-select"
                onChange={(e) =>
                  handleScheduleChange(index, "day", e.target.value)
                }
              >
                {daysOfWeekUk.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              

              <input 
                className={cls.inputTime}
                type="time"
                value={sched.time}
                data-testid="group-scheduleTime-select"
                onChange={(e) =>
                  handleScheduleChange(index, "time", e.target.value)
                }
              />

              <DeleteIcon className={cls.deleteIcon} onClick={() => handleDeleteSchedule(index)}>
                Удалить
              </DeleteIcon>
            </div>
          ))}

        <div>
          {usersInBase?.length > 0 ? (
            <UserList smth={groupFormState} setSmth={setGroupFormState} />
          ) : (
            <p>Пользователи не найдены</p>
          )}
        </div>
      </div>
      <button
        className={cls.buttonOperation}
        onClick={() => {
          handleSubmit(
            isEditMode,
            groupFormState,
            appDispatch,
            closeModal,
            groupId
          );
        }}
      >
        {isEditMode ? "Обновити" : "додати"}
      </button>
    </div>
  );
};
