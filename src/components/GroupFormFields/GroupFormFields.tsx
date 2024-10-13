import React from "react";
import { Button, ButtonSize } from "../Button/Button";
import { ScheduleType } from "../../redux/types/types";
import cls from './GroupFormFields.module.scss'

interface GroupFormFieldsProps {
  state: any;
  handleScheduleChange: (index: number, field: string, value: string) => void;
  addSchedule: () => void;
  removeScheduleItem: (index: number) => void;
  validDays: string[];
  dispatch: React.Dispatch<any>;
}

const GroupFormFields: React.FC<GroupFormFieldsProps> = ({
  state,
  handleScheduleChange,
  addSchedule,
  removeScheduleItem,
  validDays,
  dispatch,
}) => (
  <div className={cls.container}>
    <div className={cls.name}>
      <label className={cls.title}>Назва групи:</label>
      <input
       className={cls.input}
        type="text"
        value={state.title}
        name="title"
        onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
        onDoubleClick={(e) => dispatch({ type: "SET_TITLE", payload: e.currentTarget.value })}
        required
      />
    </div>
    <div>
      <label className={cls.title}>Тренер:</label>
      <input className={cls.input} type="text" name="title" value="Костя" required />
    </div>
    <div>
      <label className={cls.title}>Платежі:</label>
      <div className={cls.container}>
        <label className={cls.title}>Оплата за день</label>
        <input
        className={cls.input}
          type="text"
          name="dailyPayment"
          placeholder="Ежедневный платеж"
          value={state.dailyPayment}
          onChange={(e) => dispatch({ type: "SET_DAILY_PAYMENT", payload: e.target.value })}
          required
        />
        <label className={cls.title}>Оплата за місяць</label>
        <input
          className={cls.input}
          type="text"
          name="monthlyPayment"
          placeholder="Ежемесячный платеж"
          value={state.monthlyPayment}
          onChange={(e) => dispatch({ type: "SET_MONTHLY_PAYMENT", payload: e.target.value })}
          required
        />
      </div>
    </div>
    <div>
      <label className={cls.title}>Расписание:</label>
      {state.schedule.map((sched: ScheduleType, index: number) => (
        <div key={index}>
          <select
            name="day"
            value={sched.day}
            onChange={(e) => handleScheduleChange(index, "day", e.target.value)}
            required
          >
            <option value="">Выберите день</option>
            {validDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="time"
            placeholder="Время"
            value={sched.time}
            onChange={(e) => handleScheduleChange(index, "time", e.target.value)}
            required
          />
          <Button className={cls.button} size={ButtonSize.BASE} type="button" onClick={() => removeScheduleItem(index)}>
            Удалить занятие
          </Button>
        </div>
      ))}
      <Button className={cls.button} size={ButtonSize.BASE} type="button" onClick={addSchedule}>
        Добавить занятие
      </Button>
    </div>
  </div>
);

export default GroupFormFields;
