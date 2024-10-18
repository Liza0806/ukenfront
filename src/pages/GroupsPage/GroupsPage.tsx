import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

import { OneGroupInformation } from "../../components/OneGroupInformation/OneGroupInformation";
import cls from "./GroupsPage.module.scss";
import { Container } from "../../components/Container/Container";
import containerImage from "../../assets/gymForGruops.jpg";
import { selectGroups } from "../../redux/selectors/selectors";
import {
  deleteGroupTh,
  fetchAllGroups, 
} from "../../redux/thunks/thunks";
import { Modal } from "../../components/Modal/Modal";
import { useManageUsers } from "../../hooks/hooks";
import { GroupFormModal } from "../../components/GroupFormModal/GroupFormModal";

const GroupsPage = () => {
  const dispatch = useAppDispatch();
  const {
    getUsers
  } = useManageUsers();
  useEffect(() => {
    getUsers()
dispatch(fetchAllGroups())
  }, []);

  const groups = useAppSelector(selectGroups);

  const [showAddGroupe, setShowAddGroupe] = useState(false);
  const handleDeleteGroup = useCallback(async (groupId: string) => {
    try {
      await dispatch(deleteGroupTh(groupId));
    } catch (error) {
      console.error("Ошибка при удалении группы:", error);
    }
  }, [dispatch]);

  return (
    <Container containerImage={containerImage} isCentre={false}>
      <div className={cls.containerGradient}>
        <div className={cls.containerHeader}>
          <p className={cls.titleHead}>ГРУПИ</p>
        </div>

        <Modal open={showAddGroupe} onClose={() => setShowAddGroupe(false)}>
          <GroupFormModal isEditMode={false} />
        </Modal>

        <ul className={cls.containerGroups}>
          {groups.map((group) => (
            <div className={cls.oneGroupContainer} key={group._id}>
              <p className={cls.title}>{group.title}</p>
              <li>
                <OneGroupInformation groupData={group} />
                <button
                  className={cls.deleteButton}
                  onClick={() => handleDeleteGroup(group._id || '0')} ///// перепиши!!!!
                >
                  Удалити групу
                </button>
              </li>
            </div>
          ))}
        </ul>

        <button
          className={cls.button}
          onClick={() => {
            setShowAddGroupe(true);
          }}
        >
          Створити групи
        </button>
      </div>
    </Container>
  );
};

export default GroupsPage;
