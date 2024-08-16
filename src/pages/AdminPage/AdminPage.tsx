import React, { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchAllGroups } from "../../redux/thunks/thunks";
import { GroupType, EventType } from "../../redux/slices/groupsSlice";
import { isSameDay, isSameWeek, isSameMonth, subMonths, getMonth, getYear } from 'date-fns';


const AdminPage = () => {
  const [visibleGroups, setVisibleGroups] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllGroups());
  }, []);

  const groups: GroupType[] = useAppSelector((state) => state.groups.groups);

  const toggleGroupList = () => {
  setVisibleGroups(!visibleGroups)
  }
 
  
const onChousePeriod = (id: string)=> {
  const now = new Date();
// const events = groups.map(g=> {

// })
//   switch (id) {
//     case 'today':
//       return events.filter(event => {
//         const eventDate = new Date(event.date);
//         return isSameDay(eventDate, now);
//       });

//     case 'week':
//       return events.filter(event => {
//         const eventDate = new Date(event.date);
//         return isSameWeek(eventDate, now, { weekStartsOn: 1 });
//       });

//     case 'month':
//       return events.filter(event => {
//         const eventDate = new Date(event.date);
//         return isSameMonth(eventDate, now);
//       });

//     case 'lastMonth':
//       return events.filter(event => {
//         const eventDate = new Date(event.date);
//         const lastMonth = subMonths(now, 1);
//         return getMonth(eventDate) === getMonth(lastMonth) && getYear(eventDate) === getYear(lastMonth);
//       });

//     default:
//       return []; 
//   }
};
  const toggleSchedule = () => {

  }


  return (
    <div>
      Admin Page
      <p onClick={toggleGroupList}>Groups</p>

      {visibleGroups && (
        <ul>
          {groups.map((group) => {
            return <p key={group._id}>{group.title}</p>;
          })}
        </ul>
      )}
<p onClick={toggleSchedule}>Schedule</p>
      <ul>
        {/* <li id='today' onClick={()=>onChousePeriod(id)}>Today</li>
        <li id='week' onClick={()=>onChousePeriod(id)}>Week</li>
        <li id='month' onClick={()=>onChousePeriod(id)}>Month</li>
        <li id='lastMonth'onClick={()=>onChousePeriod(id)}>Last month</li> */}
      </ul>
    </div>
  );
};

export default AdminPage;
//  <Link to='/groups'>Groups</Link>
//       <Link to='/schedule'>Groups</Link>
