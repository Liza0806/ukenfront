import React from "react";
import cls from "./GroupPage.module.scss";

import { GroupType } from "../../redux/types/types";

interface GroupPageProps {
  groupData: GroupType;
}

export const GroupPage: React.FC<GroupPageProps> = ({ groupData }) => {
  const { title, payment, schedule, participants } = groupData;

  return (
    <div className={cls.container}>
      <h1>{title}</h1>
      <section>
        <h3>Оплата</h3>
        <div>
          <p>Ежедневная оплата: {payment[0].dailyPayment} грн</p>
          <p>Месячная оплата: {payment[0].monthlyPayment} грн</p>
        </div>
      </section>

      <section>
        <h3>Расписание</h3>
        <ul>
          {schedule.map((sched) => (
            <li key={sched.day}>
              {sched.day}: {sched.time}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Участники</h3>
        {participants.length > 0 ? (
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant.name || "Не указано"}</li>
            ))}
          </ul>
        ) : (
          <p className={cls.noParticipants}>Нет участников</p>
        )}
      </section>
    </div>
  );
};
