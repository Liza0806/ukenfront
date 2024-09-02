import React from "react";
import { Button, ButtonSize } from "../Button/Button";
import { ScheduleType } from "../../redux/types/types";
import cls from '../AddGroupForm/AddGroupForm.module.scss'

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
  <>
    <div>
      <label>Название группы:</label>
      <input
        type="text"
        value={state.title}
        name="title"
        onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
        required
      />
    </div>
    <div>
      <label>Тренер:</label>
      <input type="text" name="title" value="Костя" required />
    </div>
    <div>
      <label>Платежи:</label>
      <div className={cls.paymentsWrapper}>
        <label>Ежедневный платеж</label>
        <input
          type="number"
          name="dailyPayment"
          placeholder="Ежедневный платеж"
          value={state.dailyPayment}
          onChange={(e) => dispatch({ type: "SET_DAILY_PAYMENT", payload: Number(e.target.value) })}
          required
        />
        <label>Ежемесячный платеж</label>
        <input
          type="number"
          name="monthlyPayment"
          placeholder="Ежемесячный платеж"
          value={state.monthlyPayment}
          onChange={(e) => dispatch({ type: "SET_MONTHLY_PAYMENT", payload: Number(e.target.value) })}
          required
        />
      </div>
    </div>
    <div>
      <label>Расписание:</label>
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
          <Button size={ButtonSize.BASE} type="button" onClick={() => removeScheduleItem(index)}>
            Удалить занятие
          </Button>
        </div>
      ))}
      <Button size={ButtonSize.BASE} type="button" onClick={addSchedule}>
        Добавить занятие
      </Button>
    </div>
  </>
);

export default GroupFormFields;
