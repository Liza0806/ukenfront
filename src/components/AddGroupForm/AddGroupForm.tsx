import React, { useState } from "react";
import { AddGroupType, GroupType, ScheduleType } from "../../redux/types/types";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { addGroupTh } from "../../redux/thunks/thunks";
import cls from "./AddGroupForm.module.scss";
import { Button, ButtonColor, ButtonSize } from "../Button/Button";

const validDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const AddGroupForm: React.FC = () => {
    const  [showModal, setShowModal]  = useState(false);
  const [group, setGroup] = useState<AddGroupType>({
    title: "",
    coachId: "",
    payment: [{ dailyPayment: 0, monthlyPayment: 0 }],
    schedule: [{ day: "", time: "" }],
  });

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGroup((prevGroup) => ({
      ...prevGroup,
      [name]: value,
    }));
  };

  const handlePaymentChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newPayments = [...group.payment];
    newPayments[index] = { ...newPayments[index], [name]: parseFloat(value) };
    setGroup((prevGroup) => ({
      ...prevGroup,
      payment: newPayments,
    }));
  };

  const handleScheduleChange = (
    index: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newSchedule = [...group.schedule];
    newSchedule[index] = { ...newSchedule[index], [name]: value };
    setGroup((prevGroup) => ({
      ...prevGroup,
      schedule: newSchedule,
    }));
  };

  const addSchedule = () => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      schedule: [...prevGroup.schedule, { day: "", time: "" }],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addGroupTh({ group }));
    console.log(group, "handleSubmit");
  };

  return (
    <form onSubmit={handleSubmit} className={cls.addGroupForm}>
        <Button onClick={()=>setShowModal(!showModal)}>
Добавить группу
        </Button>
      { showModal && <div >


        <div>
        <label>Название группы:</label>
        <input
          type="text"
          name="title"
          value={group.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Платежи:</label>
        {group.payment.map((pay, index) => (
          <div key={index} className={cls.paymentsWrapper}>
            <label>Ежедневный платеж</label>
            <input
              type="number"
              name="dailyPayment"
              placeholder="Ежедневный платеж"
              value=""
              onChange={(e) => handlePaymentChange(index, e)}
              required
            />
            <label>Ежемесячный платеж</label>
            <input
              type="number"
              name="monthlyPayment"
              placeholder="Ежемесячный платеж"
              value=""
              onChange={(e) => handlePaymentChange(index, e)}
              required
            />
          </div>
        ))}
      </div>
      <div>
        <label>Расписание:</label>
        {group.schedule.map((sched, index) => (
          <div key={index}>
            <select
              name="day"
              value={sched.day}
              onChange={(e) => handleScheduleChange(index, e)}
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
              onChange={(e) => handleScheduleChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addSchedule}>
          Добавить расписание
        </button>
        <Button size={ButtonSize.BIG} color={ButtonColor.PRIMARY}>Добавить группу</Button>
        </div>
  
      </div>}

    </form>
  );
};

export default AddGroupForm;
