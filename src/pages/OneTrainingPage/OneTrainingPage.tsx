import React from 'react';
import moment from 'moment';
import cls from './OneTrainingPage.module.scss'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { FindUsers } from '../../components/AddParticipants/AddParticipants';
import { updateEventParticipants } from '../../redux/thunks/thunks';


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
  const deleteParticipantHandler = (_id: string, eventId: string) => {
   
    const newParticipants = participants.filter((participant)=>participant._id !== _id);
    console.log('addParticipantHandler', newParticipants, eventId)
  dispatch(updateEventParticipants( {eventId, participants: newParticipants}))
  }
  return (
    <div className={cls.trainingPage}>
      <h1>Training Details</h1>
      <div className={cls.trainingDetails}>
        <p><strong>Date:</strong> {moment(date).format('YYYY-MM-DD HH:mm:ss')}</p>
        <p><strong>Group Title:</strong> {groupTitle}</p>
        {participants.length? <ul>{participants.map((p)=>{
            return (<li> <p>{p.name}</p> <button onClick={()=>deleteParticipantHandler(p._id, event._id)}>x</button></li> )
        })} </ul> : <p>no participants</p> }
<FindUsers eventId = {event._id} participants = {event.participants}/>
      </div>
    </div>
  );
};


export default OneTrainingPage;