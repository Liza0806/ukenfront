import React from "react";
import { useParams } from "react-router-dom";

const EventDetailPagesss: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("Event ID:", id);

  return <div>EventDetailPage for ID: {id}</div>;
};
//export default EventDetailPage;
