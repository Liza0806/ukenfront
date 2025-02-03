import cls from "./GroupFormModal.module.scss";
import {
  AddGroupType,
  daysOfWeekUk,
  ParticipantType,
  ScheduleType,
} from "../../redux/types/types";
import UserList from "../UserList/UserList";
import {
  selectCurrentGroup,
  selectUsers,
} from "../../redux/selectors/selectors";
import { useAppSelector } from "../../redux/hooks/hooks";

import React, { useMemo, useState } from "react";
import { GroupType } from "../../redux/types/types";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { toast } from "react-toastify";
import { addGroupTh, updateGroupTh } from "../../redux/thunks/thunks";
import { AppDispatch } from "../../redux/store/store";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  setCurrentGroup,
  updateCurrentGroup,
} from "../../redux/slices/groupsSlice";

interface GroupFormProps {
  initialGroupData?: GroupType | undefined;
  isEditMode: boolean;
  closeModal: () => void;
  setGroupData?: (data: any) => void;
}

export const testGroupForHandleSubmit = (
  //isEditMode: boolean,
  groupFormState: AddGroupType
  //appDispatch: AppDispatch,
  // closeModal: () => void,
  // _id?: string
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
  return groupFormState;
};

export const GroupFormModal: React.FC<GroupFormProps> = ({
  initialGroupData,
  isEditMode,
  closeModal,
}) => {
  const dispatch = useAppDispatch();
  const usersInBase = useAppSelector(selectUsers);
  const currentGroup = useAppSelector(selectCurrentGroup);

  if (!currentGroup) {
    //@ts-ignore
    dispatch(setCurrentGroup([]));
  }

  const [schedule, setSchedule] = useState<ScheduleType[]>(
    currentGroup?.schedule || []
  );

  const availableParticipants = useMemo(() => {
    return usersInBase.filter(
      (user) => !currentGroup?.participants?.some((p) => p._id === user._id)
    );
  }, [usersInBase, currentGroup?.participants]);

  const handleAddSchedule = () => {
    setSchedule((prevSchedule) => [
      ...prevSchedule,
      { day: "", time: "00:00" },
    ]);
    dispatch(updateCurrentGroup({ schedule: schedule }));
  };

  const handleDeleteSchedule = (index: number) => {
    setSchedule((prevSchedule) => prevSchedule.filter((_, i) => i !== index));
    dispatch(updateCurrentGroup({ schedule: schedule }));
  };

  const handleScheduleChange = (
    index: number,
    field: keyof ScheduleType,
    value: string
  ) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((sched, i) =>
        i === index ? { ...sched, [field]: value } : sched
      )
    );
    dispatch(updateCurrentGroup({ schedule: schedule }));
  };

  const handleRemoveParticipant = (participantId: string) => {
    if (!currentGroup?.participants) return;
    const updatedParticipants = currentGroup.participants.filter(
      (u) => u._id !== participantId
    );

    dispatch(updateCurrentGroup({ participants: updatedParticipants }));
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
            value={currentGroup?.title}
            name="title"
            onChange={(e) =>
              dispatch(updateCurrentGroup({ title: e.target.value }))
            }
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
            value={currentGroup?.dailyPayment}
            onChange={(e) =>
              dispatch(
                updateCurrentGroup({ dailyPayment: Number(e.target.value) })
              )
            }
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
            value={currentGroup?.monthlyPayment}
            onChange={(e) =>
              dispatch(
                updateCurrentGroup({ monthlyPayment: Number(e.target.value) })
              )
            }
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
                onChange={(e) =>
                  handleScheduleChange(index, "day", e.target.value)
                }
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
                onChange={(e) =>
                  handleScheduleChange(index, "time", e.target.value)
                }
              />

              <DeleteIcon
                className={cls.deleteIcon}
                onClick={() => handleDeleteSchedule(index)}
              >
                Удалить
              </DeleteIcon>
            </div>
          ))}

        {currentGroup?.participants && currentGroup?.participants.length > 0 ? (
          <ul>
            {currentGroup?.participants.map((participant, index) => (
              <li key={index}>
                {participant.name || "Не вказано"}

                <DeleteIcon
                  data-testid="userInListDeleteBtn"
                  onClick={() => {
                    handleRemoveParticipant(participant._id);
                  }}
                  className={cls.deleteIcon}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>пока нет участников</p>
        )}

        <div>
          {usersInBase?.length > 0 ? (
            <UserList
              usersInComponent={currentGroup?.participants || []}
              usersInBase={availableParticipants}
              setUsersInComponent={updateCurrentGroup}
            />
          ) : (
            <p>Пользователи не найдены</p>
          )}
        </div>
      </div>
      <button
        className={cls.buttonOperation}
        onClick={() => {
          const isGroupSuitable = testGroupForHandleSubmit({
            title: currentGroup?.title ||"",
            dailyPayment:
              currentGroup?.dailyPayment|| 0,
            monthlyPayment:
              currentGroup?.monthlyPayment ||
              0,
            schedule,
            participants:
              currentGroup?.participants ||
              [],
          });
          if (isEditMode && isGroupSuitable && currentGroup?._id) {
            dispatch(updateGroupTh({ group: isGroupSuitable, _id: currentGroup?._id }));
            closeModal();
          }
          if (!isEditMode && isGroupSuitable && currentGroup) {
            dispatch(addGroupTh(currentGroup));
            closeModal();
          }
        }}
      >
        {isEditMode ? "Обновити" : "додати"}
      </button>
    </div>
  );
};
