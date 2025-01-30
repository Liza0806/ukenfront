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
import { group } from "console";

interface GroupFormProps {
  initialGroupData?: GroupType | undefined;
  isEditMode: boolean;
  closeModal: () => void;
  setGroupData?: (data:any) => void
}

export const handleSubmit = async (
  isEditMode: boolean,
  groupFormState: AddGroupType, 
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
    dailyPayment: groupFormState.dailyPayment,
    monthlyPayment: groupFormState.monthlyPayment,
    schedule: [...groupFormState.schedule],
    participants: [...groupFormState.participants],
  };
  // console.log(initialGroupData, 'initialGroupData')
  try {
  
    if (isEditMode && _id) {
      //   ;
  await appDispatch(
        updateGroupTh({ group: groupForTh, _id: _id })
      ).unwrap(); // Разворачиваем результат, чтобы проверить ошибки
      //   ;
      toast.success("Группа успешно обновлена");
      closeModal();
    } else {
      //    ;
      console.log(groupForTh, "groupForTh");
    await appDispatch(addGroupTh(groupForTh)).unwrap(); // Разворачиваем результат
      toast.success("Группа успешно добавлена");
      closeModal();
    }
    //    ;
   // appDispatch(fetchAllGroups());
    
  } catch (error) {
    //   ;
    toast.error("Ошибка при сохранении группы");
  }
};

export const GroupFormModal: React.FC<GroupFormProps> = ({
  initialGroupData,
  isEditMode,
  closeModal,
  setGroupData,
}) => {
  const appDispatch = useAppDispatch();
  const usersInBase = useAppSelector(selectUsers);
  console.log(initialGroupData, "initialGroupData");
  const [groupId, setGroupId] = useState(initialGroupData?._id);

const [title, setTitle] = useState<string>(initialGroupData?.title || '')
const [dailyPayment, setDailyPayment] = useState<number>(initialGroupData?.dailyPayment || 0)
const [monthlyPayment, setMonthlyPayment] = useState<number>(initialGroupData?.monthlyPayment || 0)
const [schedule, setSchedule] = useState<ScheduleType[]>(initialGroupData?.schedule || [])
const [participants, setParticipants] = useState<ParticipantType[]>(initialGroupData?.participants || [])


const handleAddSchedule = () => {
  setSchedule((prevSchedule) => [
    ...prevSchedule,
    { day: "", time: "00:00" },
  ]);
};

const handleDeleteSchedule = (index: number) => {
  setSchedule((prevSchedule) =>
    prevSchedule.filter((_, i) => i !== index)
  );
};

const handleScheduleChange = (index: number, field: keyof ScheduleType, value: string) => {
  setSchedule((prevSchedule) =>
    prevSchedule.map((sched, i) =>
      i === index ? { ...sched, [field]: value } : sched
    )
  );
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
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
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
            value={dailyPayment}
            onChange={(e) => setDailyPayment(Number(e.target.value))}
            data-testid="group-dailyPayment-input"
            required
          />
        </label>
      </div>
      <div className={cls.pay}>
        <label className={cls.name} htmlFor="monthlyPayment">
          <p className={cls.title}>Місячна плата</p>
          <input
            id="monthlyPayment"
            className={cls.inputNum2}
            type="number"
            name="monthlyPayment"
            placeholder="Ежемесячный платеж"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(Number(e.target.value))}
            data-testid="group-monthlyPayment-input"
            required
          />
        </label>
      </div>

      <div>
        <label className={cls.event}>
          <p className={cls.title}> Додати час та дату тренувань</p>
          <AddIcon
            sx={{ color: "#ff9900" }}
            onClick={handleAddSchedule}
          ></AddIcon>
        </label>

        {schedule.length > 0 &&
       schedule.map((sched, index) => (
            <div key={index} className={cls.timeAndDate}>
           <select
  className={cls.select}
  value={sched.day || ""}
  data-testid="group-scheduleDay-select"
  onChange={(e) => handleScheduleChange(index, "day", e.target.value)}
>
  <option value="" disabled>
    обери день
  </option>
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
  onChange={(e) => handleScheduleChange(index, "time", e.target.value)}
/>

              <DeleteIcon
                className={cls.deleteIcon}
                onClick={() => handleDeleteSchedule(index)}
              >
                Удалить
              </DeleteIcon>
            </div>
          ))}

          {/* ///////////////НОВОЕ - 27.01 вечер///////////////// */}
{participants.length > 0 ? (
            <ul>
              {participants.map((participant, index) => (
                <li key={index}>{participant.name || "Не вказано"}
                
                <DeleteIcon
                          data-testid="userInListDeleteBtn"
                          onClick={() => {
                            setParticipants(participants.filter((u) => u._id !== participant._id));
                          }}
                          className={cls.deleteIcon}
                        />
                
                </li>
              ))}
            </ul>
          ) : (
            <p>пока нет участников</p>
          )}
           {/* ///////////////НОВОЕ///////////////// */}
        <div>
          {usersInBase?.length > 0 ? (
            <UserList usersInComponent={participants} usersInBase={usersInBase} setUsersInComponent={setParticipants}/>
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
            {title,
              dailyPayment,
              monthlyPayment,
              schedule, 
              participants,
            },
            appDispatch,
            closeModal,
            groupId
          )
          setGroupData &&  setGroupData({title,
            dailyPayment,
            monthlyPayment,
            schedule, 
            participants,
          })
        }}
      >
        {isEditMode ? "Обновити" : "додати"}
      </button>
    </div>
  );
};
