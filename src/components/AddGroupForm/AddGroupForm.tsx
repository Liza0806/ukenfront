import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { addGroupTh, fetchAllGroups } from "../../redux/thunks/thunks";
import cls from "./AddGroupForm.module.scss";
import { Button, ButtonColor, ButtonSize } from "../Button/Button";
import { GroupType, ScheduleType } from "../../redux/types/types";
import { toast } from "react-toastify";

const validDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

interface AddGroupFormProps {
  groups: GroupType[];
}

const AddGroupForm = ({ groups }: AddGroupFormProps) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [dailyPayment, setDailyPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const addSchedule = () => {
    setSchedule((prevSchedule) => [...prevSchedule, { day: "", time: "" }]);
  };
  const handleScheduleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setSchedule((prevSchedule) => {
      const newSchedule = [...prevSchedule];
      newSchedule[index] = { ...newSchedule[index], [field]: value };

      if (isInvalidTime(newSchedule[index])) {
        setError("Время занято");
      } else {
        setError(null);
      }

      return newSchedule;
    });
  };

  const isGroupExists = (groupTitle: string) =>
    groups.some((group) => group.title === groupTitle);

  const isInvalidTime = ({ day, time }: { day: string; time: string }) => {
    const theSameTime = groups.some((group: GroupType) =>
      group.schedule.some(
        (schedule: ScheduleType) =>
          schedule.day === day && schedule.time === time
      )
    );

    if (theSameTime) {
      setError("Время занято");
    }

    return theSameTime;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isGroupExists(title)) {
      setError("Группа с таким названием уже существует");
      console.log("группа с таким названием уже есть");
      return;
    }
    const group = {
      title,
      coachId: "Костя",
      payment: [{ dailyPayment, monthlyPayment }],
      schedule,
    };
    dispatch(addGroupTh({ group }))
    .unwrap()
    .then(() => {
      dispatch(fetchAllGroups()); // Fetch all groups after adding a new one
      toast.success("Группа добавлена успешно");
    })
    .catch((err) => {
      setError("Ошибка при добавлении группы");
      console.error(err);
    });

    setError(null);
    setShowModal(false)
    toast.success("Группа добавлена успешно");
    console.log(group, "handleSubmit");
  };

  return (
    <form onSubmit={handleSubmit} className={cls.addGroupForm}>
      {!showModal && (
        <Button onClick={() => setShowModal(!showModal)}>
          Добавить группу
        </Button>
      )}
      {showModal && (
        <div>
          <div>
            <label>Название группы:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                value={dailyPayment}
                onChange={(e) => setDailyPayment(Number(e.target.value))}
                required
              />
              <label>Ежемесячный платеж</label>
              <input
                type="number"
                name="monthlyPayment"
                placeholder="Ежемесячный платеж"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div>
            <label>Расписание:</label>
            {schedule.map((sched, index) => (
              <div key={index}>
                <select
                  name="day"
                  value={sched.day}
                  onChange={(e) =>
                    handleScheduleChange(index, "day", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleScheduleChange(index, "time", e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <Button size={ButtonSize.BASE} type="button" onClick={addSchedule}>
              Добавить занятие
            </Button>
          </div>

          <Button
            size={ButtonSize.BIG}
            color={ButtonColor.PRIMARY}
            type="submit"
          >
            Добавить группу
          </Button>
        </div>
      )}
    </form>
  );
};

export default AddGroupForm;
