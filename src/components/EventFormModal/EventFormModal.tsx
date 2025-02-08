import cls from "./EventFormModal.module.scss";
import {
  EventTypeDB,
  daysOfWeekUk,
  ParticipantType,
  ScheduleType,
  AddEventTypeDB,
} from "../../redux/types/types";
import UserList from "../UserList/UserList";
import {
  selectCurrentEvent,
  selectEvents,
  selectGroups,
  selectUsers,
} from "../../redux/selectors/selectors";
import { useAppSelector } from "../../redux/hooks/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useMemo, useState } from "react";
import { GroupType } from "../../redux/types/types";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { toast } from "react-toastify";
import {
  addEvent,
  addGroupTh,
  fetchAllEvents,
  updateGroupTh,
} from "../../redux/thunks/thunks";
import AddIcon from "@mui/icons-material/Add";

import {
  setCurrentGroup,
  updateCurrentGroup,
} from "../../redux/slices/groupsSlice";
import {
  clearCurrentEvent,
  setCurrentEvent,
  updateCurrentEvent,
} from "../../redux/slices/eventsSlice";
import { useSelector } from "react-redux";
import { uk } from "date-fns/locale";
import UpdateIcon from "@mui/icons-material/Update";
import DatePicker from "react-datepicker";

interface GroupFormProps {
  initialGroupData?: GroupType | undefined;
  isEditMode: boolean;
  closeModal: () => void;
  setGroupData?: (data: any) => void;
}

export const EventFormModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const [eventForAdd, setEventForAdd] = useState<EventTypeDB | null>(null);
  const [showAdditionalUsers, setShowAdditionalUsers] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const usersInBase = useAppSelector(selectUsers);
  const groups = useAppSelector(selectGroups) || [];
  const currentEvent = useSelector(selectCurrentEvent);
  const availableParticipants = useMemo(() => {
    return usersInBase.filter(
      (user) => !currentEvent?.participants?.some((p) => p._id === user._id)
    );
  }, [usersInBase, currentEvent?.participants]);
  

console.log(availableParticipants, usersInBase, 'availableParticipants, usersInBase,')
  useEffect(() => {
    dispatch(
      setCurrentEvent({
        _id: "",
        date: new Date().toISOString(),
        groupId: "",
        groupTitle: "",
        isCancelled: false,
        participants: [],
      })
    );
    return () => {
      dispatch(clearCurrentEvent()); // Очищаем состояние при размонтировании
    };
  }, [dispatch]);

  const submitEvent = (event: AddEventTypeDB) => {
    dispatch(
      addEvent({
        date: event.date,
        groupId: event.groupId,
        groupTitle: event.groupTitle,
        isCancelled: event.isCancelled,
        participants: event.participants,
      })
    ).then(() => dispatch(fetchAllEvents()));
    setShowAdditionalUsers(false);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      dispatch(updateCurrentEvent({ date: date.toISOString() }));
    }
  };

  const handleRemoveParticipant = (participantId: string) => {
    if (!currentEvent) return;
    const updatedParticipants = currentEvent.participants.filter(
      (u) => u._id !== participantId
    );

    dispatch(updateCurrentEvent({ participants: updatedParticipants }));
  };
  console.log(currentEvent?.date, "currentEvent?.date in oneEventPage");
  console.log(currentEvent?.date, "currentEvent?.date in oneEventPage");
  return (
    <div className={cls.container}>
      <div className={cls.trainingContainer}>
        <div className={cls.header}>
          <h3 className={cls.title}>
      Название: {currentEvent?.groupTitle || ""}
            <input value={currentEvent?.groupTitle || ""} onChange={(e)=>dispatch(updateCurrentEvent({groupTitle: e.target.value}))}/>
          </h3>
          <p>Выберите группу:</p>
          <select>
            <option value="" disabled>
              Выберите группу
            </option>
            {groups.map((group, index) => (
              <option key={index} value={group._id}>
                {group.title}
              </option>
            ))}
          </select>

          <UpdateIcon
            data-testid="updateIcon"
            style={{ color: "blue", fontSize: "36px", cursor: "pointer" }}
            className={cls.upIcon}
            onClick={() =>
              submitEvent({
                date: currentEvent?.date ?? new Date().toISOString(),
                groupTitle: currentEvent?.groupTitle || "комусь назначив",
                groupId: currentEvent?.groupId || "", ///////////////////////////// СЕЛЕКТ С ГРУППАМИ!!!!
                isCancelled: currentEvent?.isCancelled || false,
                participants: currentEvent?.participants || [],
              })
            }
          ></UpdateIcon>
        </div>

        <div className={cls.date}>
          <span className={cls.text}>Тренування відбудеться</span>
          <p onClick={() => setShowCalendar(!showCalendar)}>
            {currentEvent?.date &&
              new Date(currentEvent.date).toLocaleString("uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
          </p>

          <p onClick={() => setShowTimer(!showTimer)}>
            {currentEvent?.date &&
              new Date(currentEvent.date).toLocaleString("uk-UA", {
                hour: "2-digit",
                minute: "2-digit",
              })}
          </p>
        </div>

        {showCalendar && (
          <div
            className={cls.modalOverlay}
            onClick={() => setShowCalendar(false)}
          >
            <div
              className={cls.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <DatePicker
                selected={
                  currentEvent?.date
                    ? new Date(
                        new Date(currentEvent.date).toISOString().slice(0, -1)
                      )
                    : null
                }
                onChange={handleDateChange}
                dateFormat="Pp"
                inline
                locale={uk}
              />
            </div>
          </div>
        )}

        {showTimer && (
          <div className={cls.modalOverlay} onClick={() => setShowTimer(false)}>
            <div
              className={cls.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <DatePicker
                selected={
                  currentEvent?.date
                    ? new Date(
                        new Date(currentEvent.date).toISOString().slice(0, -1)
                      )
                    : null
                }
                onChange={handleDateChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={1}
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                inline
                locale={uk}
              />
            </div>
          </div>
        )}

        {/* участники: */}
        <div className={cls.usersInTrain}>
          <h3 className={cls.title}>Учасники: </h3>
          {currentEvent?.participants &&
 currentEvent.participants.length > 0 ? (
            <ul>
              {currentEvent.participants.map((participant, index) => (
                <li className={cls.oneUser} key={index}>
                  <DeleteIcon
                    data-testid="userInListDeleteBtn"
                    onClick={() => handleRemoveParticipant(participant._id)}
                    className={cls.deleteIcon}
                  />
                  {participant.name || "Не вказано"}
                </li>
              ))}
            </ul>
          ) : (
            <p className={cls.oneUser}>На тренування ніхто не записався</p>
          )}
        </div>
        {/* возможные участники: */}

        <div className={cls.participants}>
          {showAdditionalUsers &&
            availableParticipants &&
            availableParticipants.length > 0 && (
              <UserList
                usersInComponent={currentEvent?.participants || []}
                usersInBase={availableParticipants}
                setUsersInComponent={updateCurrentEvent}
              />
            )}
        </div>

        {!showAdditionalUsers && (
          <button
            data-testid="ShowAdditionalUsers"
            type="button"
            className={cls.buttonOpen}
            onClick={() => setShowAdditionalUsers(true)}
          >
            показати можливих учасників
          </button>
        )}
      </div>
    </div>
  );
};
