import React from "react";

interface GroupInfoProps {
  id: string;
}

export const GroupInfo: React.FC<GroupInfoProps> = ({ id }) => {
  return <div> Info about {id}</div>;
};
