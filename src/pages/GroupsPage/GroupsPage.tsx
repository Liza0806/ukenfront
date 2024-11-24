import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

import { OneGroupInformation } from "../../components/OneGroupInformation/OneGroupInformation";
import cls from "./GroupsPage.module.scss";
import { Container } from "../../components/Container/Container";
import containerImage from "../../assets/gymForGruops.jpg";
import { selectGroups, selectGroupsError } from "../../redux/selectors/selectors";
import {
  deleteGroupTh,
  fetchAllGroups,
} from "../../redux/thunks/thunks";
import { Modal } from "../../components/Modal/Modal";
import { GroupFormModal } from "../../components/GroupFormModal/GroupFormModal";

const GroupsPage = () => {
  const [showModalForUpdate, setShowModalForUpdate] = useState(false);
  const id = useRef("");
  const [showModalForAdd, setShowModalForAdd] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
  dispatch(fetchAllGroups());
  }, [dispatch]);

  const groups = useAppSelector(selectGroups);
  const error = useAppSelector(selectGroupsError); 

  const handleDeleteGroup = 
    async (groupId: string) => {
      try {
        await dispatch(deleteGroupTh(groupId));
 
      } catch (error) {
        console.error("Ошибка при удалении группы:", error);
      }
    }
 


  return (
    <Container containerImage={containerImage} isCentre={false}>
      <div className={cls.containerGradient}>
        <div className={cls.containerHeader}>
          <p className={cls.titleHead}>ГРУПИ</p>
          {error && <p>Ошибка при удалении группы</p>}
        </div>

        {/* Модалка для создания*/}
        <Modal open={showModalForAdd} onClose={() => setShowModalForAdd(false)}>
          <GroupFormModal
            isEditMode={false}
            closeModal={() => setShowModalForAdd(false)}
          />
        </Modal>

        {/* Модалка для редактирования*/}
        <Modal
          open={showModalForUpdate}
          onClose={() => setShowModalForUpdate(false)}
        >
          <GroupFormModal
            initialGroupData={groups.find(
              (group) => id && group._id === String(id)
            )}
            isEditMode={true}
            closeModal={() => setShowModalForUpdate(false)}
          />
        </Modal>

        <ul className={cls.containerGroups}>
          {groups.map((group) => (
            <div className={cls.oneGroupContainer} key={group._id}>
              <button
                className={cls.deleteButton}
                onClick={() => {
                  setShowModalForUpdate(true);
                  id.current = group._id;
                }}
              >
                Редагувати групу
              </button>
              <p className={cls.title}>{group.title}</p>
              <li>
                <OneGroupInformation groupData={group} />
                <button
                  className={cls.deleteButton}
                  onClick={() => handleDeleteGroup(group._id)}
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
            setShowModalForAdd(true);
          }}
        >
          Створити групи
        </button>
      </div>
    </Container>
  );
};

export default GroupsPage;
