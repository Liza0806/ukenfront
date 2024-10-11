import React from "react";
import cls from "./OneGroupInformation.module.scss";

import { GroupType } from "../../redux/types/types";

interface GroupPageProps {
  groupData: GroupType;
}

export const GroupPage: React.FC<GroupPageProps> = ({ groupData }) => {
  const { title, payment, schedule, participants } = groupData;

  // Определение типа для дней недели
  type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

  // Объект с переводами дней недели на украинский
  const daysOfWeekUk: Record<DaysOfWeek, string> = {
    Monday: "Понеділок",
    Tuesday: "Вівторок",
    Wednesday: "Середа",
    Thursday: "Четвер",
    Friday: "П'ятниця",
    Saturday: "Субота",
    Sunday: "Неділя",
  };

  // Функция для получения дня недели на украинском языке
  const getDayInUkrainian = (day: string): string => {
    const dayKey = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase(); // Приводим строку к правильному регистру
    return daysOfWeekUk[dayKey as DaysOfWeek] || day; // Возвращаем перевод или оригинал
  };

  return (
    <div className={cls.oneGroup}>
      {/* Секция оплаты */}
      <section>
        <h3 className={cls.title}>Оплата</h3>
        <div>
          <p className={cls.title}>Оплата за день: {payment[0].dailyPayment} грн</p>
          <p className={cls.title}>Оплата за місяць: {payment[0].monthlyPayment} грн</p>
        </div>
      </section>

      {/* Секция графика */}
      <section className={cls.title}>
        <h3 className={cls.h3}>Графік:</h3>
        <ul className={cls.titleSchedule}>
          {schedule.map((sched, index) => (
            <li key={index}>
              {getDayInUkrainian(sched.day)}: {sched.time}
            </li>
          ))}
        </ul>
      </section>

      {/* Секция участников */}
      <section className={cls.title}>
        <h3 className={cls.h3}>Учасники:</h3>
        {participants.length > 0 ? (
          <ul className={cls.titleSchedule}>
            {participants.map((participant, index) => (
              <li key={index}>{participant.name || "Не вказано"}</li>
            ))}
          </ul>
        ) : (
          <p className={cls.titleSchedule}>Нет учасників</p>
        )}
      </section>
    </div>
  );
};