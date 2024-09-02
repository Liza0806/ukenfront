import React from 'react';
import moment from 'moment';
import cls from './OneTrainingPage.module.scss'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { FindUsers } from '../../components/AddParticipants/AddParticipants';


interface OneTrainingProps {
  training: {
    _id: string;
    date: string;
    groupTitle: string;
    groupId: string;
    isCancelled: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

 const OneTrainingPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const events = useAppSelector((state) => state.events.events);
    console.log("Event ID:", id);
    const event = events.find((e) => e._id === id);
    const dispatch = useAppDispatch();

    if (!event) {
      return <div>Event not found</div>;
    }
  
  const {
    date,
    groupTitle,
    groupId,
    participants,
    isCancelled,
  } = event;

  return (
    <div className={cls.trainingPage}>
      <h1>Training Details</h1>
      <div className={cls.trainingDetails}>
        <p><strong>Date:</strong> {moment(date).format('YYYY-MM-DD HH:mm:ss')}</p>
        <p><strong>Group Title:</strong> {groupTitle}</p>
        <p><strong>Group ID:</strong> {groupId}</p>
        <p><strong>Cancelled:</strong> {isCancelled ? 'Yes' : 'No'}</p>
        {participants.length? <ul>{participants.map((p)=>{
            return ( <p>participants: {p.name}</p>)
        })} </ul> : <p>no participants</p> }
<FindUsers eventId = {event._id}/>
      </div>
    </div>
  );
};


export default OneTrainingPage;