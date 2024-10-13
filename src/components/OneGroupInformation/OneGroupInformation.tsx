import React, { useRef, useState } from "react";
import cls from "./OneGroupInformation.module.scss";
import { GroupType, ParticipantType, ScheduleType, User } from "../../redux/types/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

import { toast } from "react-toastify";
import { fetchAllGroups, fetchAllUsers, updateGroupTh } from "../../redux/thunks/thunks";
import { unwrapResult } from "@reduxjs/toolkit";
import { UserList } from "../UserList/UserList";
import { Modal } from "@mui/material";

interface OneGroupInformationProps {
  groupData: GroupType;
}

export const OneGroupInformation: React.FC<OneGroupInformationProps> = ({
  groupData,
}) => {
  const { title, payment, schedule, participants, _id } = groupData;

  const appDispatch = useAppDispatch();
  const [updateButton, setUpdateButton] = useState(true);

  const [updateTitle, setUpdateTitle] = useState(false);
  const [dayP, setDayP] = useState(groupData.payment[0].dailyPayment);
  const [monthP, setMonthP] = useState(groupData.payment[0].monthlyPayment);

  const [updateDailyPayment, setUpdateDailyPayment] = useState(false);
  const [updateMonthlyPayment, setUpdateMonthlyPayment] = useState(false);
  const [updateSchedule, setUpdateSchedule] = useState(false);
  const [scheduleS, setSchedule] = useState<ScheduleType[]>(groupData.schedule);
  const [usersInBase, setUsersInBase] = useState<ParticipantType[]>([])
  const [usersInGroup, setUsersInGroup] = useState<ParticipantType[]>(groupData.participants);
  const [usersForList, setUsersForList] = useState<ParticipantType[]>([])
  const [showAddUsersForm, setShowAddUsersForm] = useState(false)
  const [updateUsers, setUpdateUsers] = useState(false);


  const [oneGroup, setOneGroup] = useState<GroupType>({
    ...groupData,
    payment: (groupData.payment && groupData.payment.length > 0) 
      ? groupData.payment 
      : [],
    schedule: groupData.schedule ?? [],
    participants: (groupData.participants && groupData.participants.length > 0)
    ? groupData.participants.filter(participant => typeof participant === 'object' && participant !== null)
    : [],
  });
  const newSchedule = useRef<ScheduleType[]>([...oneGroup.schedule]);
  
  const newUsers = useRef<ParticipantType[]>([...oneGroup.participants]);

  const handleDeleteUser = (id: string) => {
    // const newParticipants = event.participants.filter(
    //   (participant) => participant._id !== id
    // );
    // setEvent({ ...event, participants: newParticipants });
    // setShowUpdateEvent(true);
  };

  const handleAddUser = (participant: ParticipantType) => {
    const isAlreadyExist =newUsers.current.find(
      (p) => p._id === participant._id
    );
    if (isAlreadyExist) {
      return;
    }
    newUsers.current =([...newUsers.current, { _id: participant._id, name: participant.name, telegramId: participant.telegramId}]);
    console.log(newUsers.current, 'newUsers.current in handleAddUser')
  //  setUpdateUsers(false);
  };

  const getUsers = () => {
    setShowAddUsersForm(true)
    console.log('getUsers')
    appDispatch(fetchAllUsers())
      .then((response) => {
        try {
          const result = unwrapResult(response);
          if (result !== "error") {
            const sortedUsers = result.sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
            setUsersInBase(sortedUsers as User[]);
           const users =  deleteDoubleUsers(usersInBase, usersInGroup)
           setUsersForList(users)
            console.log('getUsers2')
          } else {
            setUsersInBase([]);
            console.log('getUsers3')
          }
        } catch (error) {
          console.error("Ошибка при получении пользователей:", error);
          setUsersInBase([]);
          console.log('getUsers4')
        }
      })
      .catch((error) => {
        console.log('getUsers4')
        console.error("Ошибка при запросе:", error);
        setUsersInBase([]);
      });
  };

  const findUsers = (params: string) => {
    const newUsersN = usersInBase.filter((user) =>
      user.name.toLowerCase().includes(params.toLowerCase())
    );
    if (newUsersN.length === 0) {
     console.log('нема юзерів')
     // setNoUsersFound(true);
    } else {
      const sortedUsers = newUsersN.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
     // setNoUsersFound(false);
    
     setUsersInBase(sortedUsers);
    }
  };

  const deleteDoubleUsers = (usersInBase: ParticipantType[], usersInGroup: ParticipantType[]): ParticipantType[] => {
    return usersInBase.filter((userInBase) => {
      return !usersInGroup.some((userInGroup) => userInGroup._id === userInBase._id);
    });
  };





  // апдейт формы
  const handleUpdate = async () => {

    console.log('handleUpdate', oneGroup)
  
    const groupForTh: GroupType = {
      // _id: oneGroup._id,
      title: oneGroup.title,
      coachId: "Kostya",
      payment: [{dailyPayment: dayP,
        monthlyPayment: monthP
      }],
      schedule: [...newSchedule.current],
      participants: [...newUsers.current]
    }
      try {
      console.log(_id, '_id')
      await appDispatch(updateGroupTh({ group: groupForTh, _id: oneGroup._id || '0' }));        toast.success("Группа успешно добавлена");
        appDispatch(fetchAllGroups());
      //  setUpdateButton(false);
      } catch (error) {
        toast.error("Ошибка при добавлении группы");
      }
  //  }
  };


  const daysOfWeekUkk = [
    "Понеділок",
   "Вівторок",
    "Середа",
     "Четвер",
    "П'ятниця",
     "Субота",
     "Неділя",
  ];
 
  const handleCloseModal = () => {
    setShowAddUsersForm(false)
  }

  return (
    <div className={cls.oneGroup}>
      <div
        onDoubleClick={() => setUpdateTitle(true)}
        onBlur={() => setUpdateTitle(false)}
      >
        {!updateTitle && <p className={cls.title}>{oneGroup?.title ?? ''}</p>}
        {updateTitle && (
          <input
            className={cls.input}
            type="text"
            value={oneGroup?.title || ''}
            name="title"
            onChange={(e) => setOneGroup((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
        )}
      </div>
      {/* Секция оплаты */}
      <section>
        <h3 className={cls.title}>Оплата</h3>
        <div
          onDoubleClick={() => setUpdateDailyPayment(true)}
          onBlur={() => setUpdateDailyPayment(false)}
        >
          {!updateDailyPayment && (
            <div>
              <p className={cls.title}>
              Оплата за день: {dayP || 0} грн
                {/* Оплата за день: {oneGroup?.payment[0]?.dailyPayment || 0} грн */}
              </p>
            </div>
          )}
          {updateDailyPayment && (
            <input
              className={cls.input}
              type="text"
              name="dailyPayment"
              placeholder="Ежедневный платеж"
              value={dayP}
              onChange={(e) =>
                setDayP(Number(e.target.value))
             }
              required
            />
          )}
        </div>
        <div
          onDoubleClick={() => {
            setUpdateMonthlyPayment(true)
            setMonthP(0)
          }}
          onBlur={() => setUpdateMonthlyPayment(false)}
        >
          {!updateMonthlyPayment && (
            <p className={cls.title}>
                   Оплата за місяць: {monthP ?? 0} грн
              {/* Оплата за місяць: {oneGroup?.payment[0]?.monthlyPayment ?? 0} грн */}
            </p>
          )}
          {updateMonthlyPayment && (
            <input
              className={cls.input}
              type="text"
              name="monthlyPayment"
              placeholder="Ежемесячный платеж"
              value={monthP}
              onChange={(e) =>
               setMonthP(Number(e.target.value))
              }
              required
            />
          )}
        </div>
      </section>

      {/* Секция графика */}
      <section className={cls.title}>
        <h3 className={cls.h3}>Графік:</h3>
        <ul className={cls.titleSchedule}>
          {schedule.map((sched, index) => (
            <li key={index}>
             {!updateSchedule && <div onDoubleClick={() => setUpdateSchedule(true)}
            >
                 {scheduleS[index].day}: {scheduleS[index].time}
              </div>}
             <div>
             {updateSchedule && (
          <div>
          <select
            value={newSchedule.current[index].day}
            onChange={(e) => {
              // Обновляем значение ref
              newSchedule.current[index] = { 
                ...newSchedule.current[index], 
                day: e.target.value 
              };
              setSchedule([...newSchedule.current]); 
            }}
         
          >
            {daysOfWeekUkk.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
      

            <input
              type="time"
              value={newSchedule.current[index].time}
              onChange={(e) => {
          
                  // Обновляем значение ref
                  newSchedule.current[index] = { 
                    ...newSchedule.current[index], 
                    time: e.target.value 
                  };
                  setSchedule([...newSchedule.current]); 
              }}
            />
          </div>
        )}
          
             
             </div>
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
        <button onClick={getUsers}>add participants</button>
        {showAddUsersForm && 
        <Modal 
  onClose={handleCloseModal} // Функция для закрытия модалки
  open={showAddUsersForm}       // Логическое значение для отображения модалки
>
  <UserList 
    users={usersForList}           // Пропсы для списка пользователей
    addUsers={handleAddUser}  // Функция для добавления пользователей
    deleteUser={handleDeleteUser}
  />
</Modal>
      
       
          }
      </section>
      {updateButton && <button onClick={handleUpdate}>update group</button>}
    </div>
  );
};
