import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { toast } from "react-toastify";
import { OneGroupInformation } from "../../components/OneGroupInformation/OneGroupInformation";
import cls from "./GroupsPage.module.scss";
import { Container } from "../../components/Container/Container";
import containerImage from "../../assets/gymForGruops.jpg";
import {
  selectGroups,
  selectGroupsError,
} from "../../redux/selectors/selectors";
import { deleteGroupTh, fetchAllGroups } from "../../redux/thunks/thunks";
import { Modal } from "../../components/Modal/Modal";
import { GroupFormModal } from "../../components/GroupFormModal/GroupFormModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GroupsPage = () => {
  ////////// утро 26.01
  const [showModalForUpdate, setShowModalForUpdate] = useState(false);
  const _id = useRef("");
  const [showModalForAdd, setShowModalForAdd] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllGroups());
  }, [dispatch]);

  const groups = useAppSelector(selectGroups);

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await dispatch(deleteGroupTh(groupId));
    } catch (error) {
      console.error("Ошибка при удалении группы:", error);
    }
  };

  return (
    <Container containerImage={containerImage} isCentre={false}>
      <div className={cls.containerGradient}>
        <div className={cls.containerHeader}>
          <p className={cls.titleHead}>ГРУПИ</p>
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
              (group) => _id?.current && group._id === _id.current
            )}
            isEditMode={true}
            closeModal={() => setShowModalForUpdate(false)}
          />
        </Modal>

        <ul className={cls.containerGroups}>
          {groups.map((group) => (
            <div className={cls.oneGroupContainer} key={group._id}>
              <div className={cls.edit}>
                <p className={cls.title}>{group.title}</p>
                <button
                  className={cls.changeButton}
                  onClick={() => {
                    setShowModalForUpdate(true);
                    _id.current = group._id;
                  }}
                >
                  <EditIcon sx={{ color: "white" }} />
                </button>
                <button
                  className={cls.deleteButton}
                  onClick={() => handleDeleteGroup(group._id)}
                >
                  <DeleteIcon sx={{ color: "white" }} />
                </button>
              </div>

              <li>
                <OneGroupInformation groupData={group} />
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
