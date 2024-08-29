import React, { useState } from 'react';
import { GroupType, ScheduleType } from '../../redux/types/types';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { addGroupTh } from '../../redux/thunks/thunks';

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
  const [group, setGroup] = useState<GroupType>({
    _id: '',
    title: '',
    coachId: '',
    payment: [{ dailyPayment: 0, monthlyPayment: 0 }],
    schedule: [{ day: '', time: '' }],
  });

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGroup((prevGroup) => ({
      ...prevGroup,
      [name]: value,
    }));
  };

  const handlePaymentChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newPayments = [...group.payment];
    newPayments[index] = { ...newPayments[index], [name]: parseFloat(value) };
    setGroup((prevGroup) => ({
      ...prevGroup,
      payment: newPayments,
    }));
  };

  const handleScheduleChange = (index: number, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newSchedule = [...group.schedule];
    newSchedule[index] = { ...newSchedule[index], [name]: value };
    setGroup((prevGroup) => ({
      ...prevGroup,
      schedule: newSchedule,
    }));
  };

  const addPayment = () => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      payment: [...prevGroup.payment, { dailyPayment: 0, monthlyPayment: 0 }],
    }));
  };

  const addSchedule = () => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      schedule: [...prevGroup.schedule, { day: '', time: '' }],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  
    dispatch(addGroupTh({ group }));
    console.log(group);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID группы:</label>
        <input
          type="text"
          name="_id"
          value={group._id}
          onChange={handleChange}
          required
        />
      </div>
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
        <label>ID тренера:</label>
        <input
          type="text"
          name="coachId"
          value={group.coachId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Платежи:</label>
        {group.payment.map((pay, index) => (
          <div key={index}>
            <input
              type="number"
              name="dailyPayment"
              placeholder="Ежедневный платеж"
              value={pay.dailyPayment}
              onChange={(e) => handlePaymentChange(index, e)}
              required
            />
            <input
              type="number"
              name="monthlyPayment"
              placeholder="Ежемесячный платеж"
              value={pay.monthlyPayment}
              onChange={(e) => handlePaymentChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addPayment}>Добавить платеж</button>
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
                <option key={day} value={day}>{day}</option>
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
        <button type="button" onClick={addSchedule}>Добавить расписание</button>
      </div>
      <button type="submit">Добавить группу</button>
    </form>
  );
};

export default AddGroupForm;
