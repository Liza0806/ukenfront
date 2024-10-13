import React from "react";
import { Button, ButtonSize } from "../Button/Button";
import { ScheduleType } from "../../redux/types/types";
import clss from "../AddGroupForm/AddGroupForm.module.scss";
import cls from "./GroupFormFields.module.scss";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


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
    <div className={cls.containerName}>
      <div className={cls.name}>
        <label className={cls.title}>Назва групи:</label>
        <input
          className={cls.input}
          type="text"
          value={state.title}
          name="title"
          onChange={(e) =>
            dispatch({ type: "SET_TITLE", payload: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label className={cls.title}>Тренер:</label>
        <input
          className={cls.input}
          type="text"
          name="title"
          value="Костя"
          required
        />
      </div>
    </div>
    <div className={cls.containerPay}>
      
      <div>
        <label className={cls.title}>Оплата за тренування:</label>
        <input
          className={cls.input}
          type="text"
          name="dailyPayment"
          placeholder="Разовий платіж"
          value={state.dailyPayment}
          onChange={(e) =>
            dispatch({ type: "SET_DAILY_PAYMENT", payload: e.target.value })
          }
          required
        />
        </div>
        <div> 
        <label className={cls.title}>Оплата за місяць:</label>
        <input
          className={cls.input}
          type="text"
          name="monthlyPayment"
          placeholder="Місячний платіж"
          value={state.monthlyPayment}
          onChange={(e) =>
            dispatch({ type: "SET_MONTHLY_PAYMENT", payload: e.target.value })
          }
          required
        />
      </div>
   
    </div>
    <div className={cls.containerSchedule}>
      <label className={cls.title}>Графік:</label>
      {state.schedule.map((sched: ScheduleType, index: number) => (
        <div key={index}>
          <select
            className={cls.selectCustom}
            name="day"
            value={sched.day}
            onChange={(e) => handleScheduleChange(index, "day", e.target.value)}
            required
          >
            <option value=""><span className={cls.placeholder}>Виберіть день</span></option>
            {validDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <input 
          className={cls.inputTime}
            type="text"
            name="time"
            placeholder="Час"
            value={sched.time}
            onChange={(e) =>
              handleScheduleChange(index, "time", e.target.value)
            }
            required
          />
          <Button
            className={cls.buttonDel}
            size={ButtonSize.BASE}
            type="button"
            onClick={() => removeScheduleItem(index)}
          >
           <DeleteForeverIcon className={cls.deleteIcon}></DeleteForeverIcon>
          </Button>
        </div>
      ))}
      <Button
        className={cls.button}
        size={ButtonSize.BASE}
        type="button"
        onClick={addSchedule}
      >
        Додати заняття
      </Button>
    </div>
  </div>
);

export default GroupFormFields;
