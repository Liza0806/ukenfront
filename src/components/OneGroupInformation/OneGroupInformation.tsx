import React, { useState, useCallback } from "react";
import cls from "./OneGroupInformation.module.scss";
import {
  GroupType,
  ParticipantType,
  ScheduleType,
} from "../../redux/types/types";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { toast } from "react-toastify";
import {
  fetchAllGroups,
  fetchAllUsers,
  updateGroupTh,
} from "../../redux/thunks/thunks";
import { unwrapResult } from "@reduxjs/toolkit";
import { UserList } from "../UserList/UserList";
import { Modal } from "../Modal/Modal";
import { GroupFormModal } from "../GroupFormModal/GroupFormModal";

interface OneGroupInformationProps {
  groupData: GroupType;
}

export const OneGroupInformation: React.FC<OneGroupInformationProps> = ({
  groupData,
}) => {
  const { title, payment, schedule, participants, _id } = groupData;

  const appDispatch = useAppDispatch();
  // const [updateButton, setUpdateButton] = useState(true);

  const [updateSchedule, setUpdateSchedule] = useState(false);
  const [usersInBase, setUsersInBase] = useState<ParticipantType[]>([]);

  ////////////////// new part /////////////////

  const [showModal, setShowModal] = useState(false);
  const [groupFormState, setGroupFormState] = useState({
    newTitle: title,
    newDayPayment: payment[0].dailyPayment,
    newMonthlyPayment: payment[0].monthlyPayment,
    newScheduleUS: schedule,
    participants: participants
  });

  const getUsers = useCallback(async () => {
    try {
      const response = await appDispatch(fetchAllUsers());
      const result = unwrapResult(response);
      setUsersInBase(result !== "error" ? result : []);
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
      setUsersInBase([]);
    }
  }, [appDispatch]);

  return (
    <div className={cls.oneGroup}>
      <button
        onClick={() => {
          setShowModal(true);
          getUsers();
        }}
      >
        OPEN MODAL
      </button>
      <div>
        <p className={cls.title}>{groupData?.title ?? ""}</p>
      </div>
      {/* Секция оплаты */}
      <section>
        <h3 className={cls.title}>Оплата</h3>
        <p>Оплата за день: {groupFormState.newDayPayment || 0} грн</p>
        <p>Оплата за місяць: {groupFormState.newMonthlyPayment ?? 0} грн</p>
      </section>

      {/* Секция графика */}
      <section className={cls.title}>
        <h3 className={cls.h3}>Графік:</h3>
        <ul>
          {groupFormState.newScheduleUS.map((sched, index) => (
            <li key={index} onDoubleClick={() => setUpdateSchedule(true)}>
              {sched.day}: {sched.time}
            </li>
          ))}
        </ul>
      </section>

      {/* Секция участников */}
      <section className={cls.title}>
        <h3 className={cls.h3}>Учасники:</h3>
        {participants.length > 0 ? (
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant.name || "Не вказано"}</li>
            ))}
          </ul>
        ) : (
          <p>Нет учасників</p>
        )}
      </section>

      {/* Модалка */}

      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <GroupFormModal initialGroupData={groupData} isEditMode={true} />
        </Modal>
      )}
    </div>
  );
};
