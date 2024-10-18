import cls from "./GroupFormModal.module.scss";
import { daysOfWeekUk } from "../../redux/types/types";
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
interface GroupFormProps {
  initialGroupData?: GroupType;
  isEditMode: boolean;
}

export const GroupFormModal: React.FC<GroupFormProps> = ({
  initialGroupData,
  isEditMode,
}) => {
  const appDispatch = useAppDispatch();

  const [groupFormState, setGroupFormState] = useState({
    title: initialGroupData ? initialGroupData.title : "",
    dailyPayment: initialGroupData
      ? initialGroupData.payment[0].dailyPayment
      : 0,
    monthlyPayment: initialGroupData
      ? initialGroupData.payment[0].monthlyPayment
      : 0,
    schedule: initialGroupData ? initialGroupData.schedule : [],
    participants: initialGroupData?.participants
      ? initialGroupData?.participants
      : [],
  });

  const usersInBase = useAppSelector(selectUsers);

  const handleSubmit = useCallback(async () => {
    const groupForTh: GroupType = {
      title: groupFormState.title,
      coachId: "Kostya",
      payment: [
        {
          dailyPayment: groupFormState.dailyPayment,
          monthlyPayment: groupFormState.monthlyPayment,
        },
      ],
      schedule: [...groupFormState.schedule],
      participants: [...groupFormState.participants],
    };

    try {
      if (isEditMode) {
        if (initialGroupData?._id) {
          await appDispatch(
            updateGroupTh({ group: groupForTh, _id: initialGroupData!._id })
          );
          toast.success("Группа успешно обновлена");
        }
      } else {
        await appDispatch(addGroupTh({ group: groupForTh }));
        toast.success("Группа успешно добавлена");
      }
      appDispatch(fetchAllGroups());
    } catch (error) {
      toast.error("Ошибка при обновлении группы");
    }
  }, [groupFormState, appDispatch, initialGroupData, isEditMode]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
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
      {!isEditMode && <p>"Название":</p>}
      <input
        className={cls.input}
        type="text"
        value={groupFormState.title}
        name="title"
        onChange={handleInputChange}
        required
      />

      <label>Ежедневный платеж</label>
      <input
        className={cls.input}
        type="text"
        name="dailyPayment"
        placeholder="Ежедневный платеж"
        value={groupFormState.dailyPayment}
        onChange={handleInputChange}
        required
      />

      <label>Ежемесячный платеж</label>
      <input
        className={cls.input}
        type="text"
        name="monthlyPayment"
        placeholder="Ежемесячный платеж"
        value={groupFormState.monthlyPayment}
        onChange={handleInputChange}
        required
      />

      <div>
        <label>Schedule</label>
        {groupFormState.schedule.map((sched, index) => (
          <div key={index}>
            <select
              value={sched.day}
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
              onChange={(e) =>
                handleScheduleChange(index, "time", e.target.value)
              }
            />
            <button onClick={() => handleDeleteSchedule(index)}>Удалить</button>
          </div>
        ))}
        <button onClick={handleAddSchedule}>Добавить расписание</button>
        <div>
          {usersInBase.length > 0 ? (
            <UserList
              smth={groupFormState}
              setSmth={setGroupFormState}
        
            />
          ) : (
            <p>Пользователи не найдены</p>
          )}
        </div>
      </div>
      <button onClick={handleSubmit}>
        {isEditMode ? "Обновить группу" : "Добавить группу"}
      </button>
    </div>
  );
};
