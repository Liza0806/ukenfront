import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchAllEvents, fetchAllGroups } from "../../redux/thunks/thunks";
import { EventTypeDB, GroupType } from "../../redux/types/types";
import { EventTypeForCalendar, MyCalendar } from "../../components/Calendar/Calendar";

const AdminPage: React.FC = () => {
    const [visibleGroups, setVisibleGroups] = useState(false);
    const navigate = useNavigate(); 

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllGroups());
        dispatch(fetchAllEvents());
    }, [dispatch]);

    const groups: GroupType[] = useAppSelector((state) => state.groups.groups);
    const events: EventTypeDB[] = useAppSelector((state) => state.events.events);

    const eventsForCalendar: EventTypeForCalendar[] = events.map(e => {
        const startDate = new Date(e.date);
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 1); 

        return {
            title: e.group,
            start: startDate,
            end: endDate,
            allDay: false,
            id: e._id,
        };
    });

    const toggleGroupList = () => setVisibleGroups(!visibleGroups);

    const handleEventClick = (event: EventTypeForCalendar) => {
        console.log('Event clicked:', event);
        navigate(`/events/${event.id}`);
    };

    return (
        <div>
            Admin Page
            <p onClick={toggleGroupList}>Groups</p>
            {visibleGroups && (
                <ul>
                    {groups.map((group) => (
                        <li key={group._id}>{group.title}</li>
                    ))}
                </ul>
            )}
            <p onClick={() => {}}>Schedule</p>
            <MyCalendar events={eventsForCalendar} onEventClick={handleEventClick} />
        </div>
    );
};

export default AdminPage;
