import cls from "./GroupFormModal.module.scss";
import {
  AddGroupType,
  daysOfWeekUk,
  ParticipantType,
  ScheduleType,
} from "../../redux/types/types";
import { UserList } from "../UserList/UserList";
import { selectUsers } from "../../redux/selectors/selectors";
import { useAppSelector } from "../../redux/hooks/hooks";

import React, { useState, useCallback } from "react";
import { GroupType } from "../../redux/types/types";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { toast } from "react-toastify";
import {
  fetchAllGroups,
  addGroupTh,
  updateGroupTh,
} from "../../redux/thunks/thunks";
import { AppDispatch } from "../../redux/store/store";

interface GroupFormProps {
  initialGroupData?: GroupType;
  isEditMode: boolean;
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
  initialGroupData?: GroupType
) => {
  
  debugger;
  const groupForTh: AddGroupType = {
    title: groupFormState!.title!,
    coachId: "Kostya",
    payment: [
      {
        dailyPayment: groupFormState.dailyPayment,
        monthlyPayment: groupFormState.monthlyPayment,
      },
    ],
    schedule: [...groupFormState!.schedule!],
    participants: [...groupFormState!.participants!],
  };

  try {
    let result;
    if (isEditMode) {
      debugger;
      if (initialGroupData?._id) {
        debugger
        result = await appDispatch(
          updateGroupTh({ group: groupForTh, _id: initialGroupData!._id })
        ).unwrap(); // Разворачиваем результат, чтобы проверить ошибки
       debugger
        toast.success("Группа успешно обновлена");
      }
    } else {
      debugger;
      console.log(groupForTh, "groupForTh");
      result = await appDispatch(addGroupTh(groupForTh)).unwrap(); // Разворачиваем результат
      toast.success("Группа успешно добавлена");
    }
    appDispatch(fetchAllGroups());
  } catch (error) {
    debugger;
    toast.error("Ошибка при обновлении группы");
  }
};

export const GroupFormModal: React.FC<GroupFormProps> = ({
  initialGroupData,
  isEditMode,
}) => {
  const appDispatch = useAppDispatch();

  const [groupFormState, setGroupFormState] = useState<groupFormStateType>({
    title: initialGroupData ? initialGroupData.title : "",
    dailyPayment: initialGroupData
      ? initialGroupData.payment[0].dailyPayment
      : undefined,
    monthlyPayment: initialGroupData
      ? initialGroupData.payment[0].monthlyPayment
      : undefined,
    schedule: initialGroupData ? initialGroupData.schedule : [],
    participants: initialGroupData?.participants
      ? initialGroupData?.participants
      : [],
  });

  const usersInBase = useAppSelector(selectUsers);

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
      schedule: [
        ...prevState.schedule,
        { day: daysOfWeekUk[0], time: "08:00" },
      ],
    }));
  };

  const handleDeleteSchedule = (index: number) => {
    setGroupFormState((prevState) => ({
      ...prevState,
      schedule: prevState.schedule.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <label htmlFor="title">Название</label>
      <p>{groupFormState.title}</p>
      <input
        id="title"
        className={cls.input}
        type="text"
        value={groupFormState.title}
        name="title"
        onChange={handleInputChange}
        data-testid="group-title-input"
        required
      />

      <label htmlFor="dailyPayment">Ежедневный платеж</label>
      <input
        id="dailyPayment"
        className={cls.input}
        type="number"
        name="dailyPayment"
        placeholder="Ежедневный платеж"
        value={groupFormState.dailyPayment}
        onChange={handleInputChange}
        data-testid="group-dailyPayment-input"
        required
      />

      <label htmlFor="monthlyPayment">Ежемесячный платеж</label>
      <input
        id="monthlyPayment"
        className={cls.input}
        type="number"
        name="monthlyPayment"
        placeholder="Ежемесячный платеж"
        value={groupFormState.monthlyPayment}
        onChange={handleInputChange}
        data-testid="group-monthlyPayment-input"
        required
      />

      <div>
        <label>Schedule</label>
        {groupFormState.schedule.map((sched, index) => (
          <div key={index}>
            <select
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
              type="time"
              value={sched.time}
              data-testid="group-scheduleTime-select"
              onChange={(e) =>
                handleScheduleChange(index, "time", e.target.value)
              }
            />
            <button onClick={() => handleDeleteSchedule(index)}>Удалить</button>
          </div>
        ))}
        <button onClick={handleAddSchedule}>Добавить расписание</button>
        <div>
          {usersInBase?.length > 0 ? (
            <UserList smth={groupFormState} setSmth={setGroupFormState} />
          ) : (
            <p>Пользователи не найдены</p>
          )}
        </div>
      </div>
      <button
        onClick={() => handleSubmit(isEditMode, groupFormState, appDispatch)}
      >
        {isEditMode ? "Обновить группу" : "Добавить группу"}
      </button>
    </div>
  );
};
