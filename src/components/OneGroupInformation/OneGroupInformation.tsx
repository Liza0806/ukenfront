import React from "react";
import cls from "./OneGroupInformation.module.scss";
import {
  GroupType,
  ParticipantType,
  ScheduleType,
} from "../../redux/types/types";
import UserList from "../UserList/UserList";

interface OneGroupInformationProps {
  title: string;
  dailyPayment: number;
  monthlyPayment: number;
  schedule: ScheduleType[];
  participants: ParticipantType[];
}

export const OneGroupInformation: React.FC<OneGroupInformationProps> = ({
  title,
  dailyPayment,
  monthlyPayment,
  schedule,
  participants,
}) => {
  console.log(
    "render OneGroupInformationProps",
    title,
    dailyPayment,
    monthlyPayment,
    schedule,
    participants
  );

  return (
    <div className={cls.oneGroup}>
      {/* Секция оплаты */}
      <section>
        <h3 className={cls.title}>Оплата</h3>
        <p className={cls.title}>Оплата за день: {dailyPayment || 0} грн</p>
        <p className={cls.title}>Оплата за місяць: {monthlyPayment ?? 0} грн</p>
      </section>

      {/* Секция графика */}
      <section className={cls.title}>
        <h3 className={cls.h3}>Графік:</h3>
        <ul>
          {schedule.map((sched, index) => (
            <li key={index}>
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
    </div>
  );
};
