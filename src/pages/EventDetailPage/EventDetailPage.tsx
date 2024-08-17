import React from 'react';
import { useParams } from 'react-router-dom';

export const EventDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    console.log('Event ID:', id);

    return <div>EventDetailPage for ID: {id}</div>;
};
