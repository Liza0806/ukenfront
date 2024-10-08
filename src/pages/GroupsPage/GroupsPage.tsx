import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchAllGroups } from "../../redux/thunks/thunks";
import { GroupType } from "../../redux/types/types";
import AddGroupForm from "../../components/AddGroupForm/AddGroupForm";
import { GroupPage } from "../../components/OneGroupInformation/GroupPage";

const GroupsPage = () => {
  const isFirstRender = useRef(true);

  const groups: GroupType[] = useAppSelector((state) => state.groups.groups);

  const [visibleGroups, setVisibleGroups] = useState<{
    [key: string]: boolean;
  }>(groups.reduce((acc, group) => ({ ...acc, [group._id]: false }), {}));

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(fetchAllGroups());
    }
  }, [dispatch, isFirstRender]);

  const toggleGroupVisibility = (id: string) => {
    setVisibleGroups((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  return (
    <>
      <p>Groups</p>
      <ul>
        {groups.map((group) => (
          <li key={group._id} onClick={() => toggleGroupVisibility(group._id)}>
            {group.title}
            {visibleGroups[group._id] && <GroupPage groupData={group} />}
          </li>
        ))}
      </ul>
      <AddGroupForm groups={groups}/>
    </>
  );
};

export default GroupsPage;
