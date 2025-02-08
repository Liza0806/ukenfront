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
  selectGroupsIsLoading,
} from "../../redux/selectors/selectors";
import { deleteGroupTh, fetchAllGroups } from "../../redux/thunks/thunks";
import { Modal } from "../../components/Modal/Modal";
import { GroupFormModal } from "../../components/GroupFormModal/GroupFormModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GroupType } from "../../redux/types/types";
import {
  clearCurrentGroup,
  setCurrentGroup,
} from "../../redux/slices/groupsSlice";
import { useSelector } from "react-redux";
import { Loader } from "../../components/Loader/Loader";

const GroupsPage = () => {
  const isLoading = useSelector(selectGroupsIsLoading);
  const [showModalForUpdate, setShowModalForUpdate] = useState(false);
  const _id = useRef("");
  const [groupData, setGroupData] = useState<GroupType | undefined>();
  const [showModalForAdd, setShowModalForAdd] = useState(false);
  const groups = useAppSelector(selectGroups);
  const groupWithCurrentTime = groups.map((g) => ({
    ...g,
    schedule: g.schedule.map((s) => {
      const [hours, minutes] = s.time.split(":").map(Number);
      return { ...s, time: `${hours + 2}:${minutes === 0 ? "00" : minutes}` };
    }),
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllGroups());
  }, [dispatch]);

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await dispatch(deleteGroupTh(groupId));
    } catch (error) {
      console.error("Ошибка при удалении группы:", error);
    }
  };
  console.log("render GroupsPage", groupData);

  // useEffect(() => {
  //   throw new Error("Ошибка на LandingPage!");  //// раскомментируй для тестов ошибки
  // }, []);
  
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
            closeModal={() => {
              setShowModalForAdd(false);
              dispatch(clearCurrentGroup());
            }}
          />
        </Modal>

        {/* Модалка для редактирования*/}
        <Modal
          open={showModalForUpdate}
          onClose={() => setShowModalForUpdate(false)}
        >
          <GroupFormModal
            initialGroupData={groupData}
            isEditMode={true}
            closeModal={() => {
              setShowModalForUpdate(false);
              dispatch(clearCurrentGroup());
            }}
          />
        </Modal>

        <ul className={cls.containerGroups}>
          {groupWithCurrentTime.map((group) => (
            <div className={cls.oneGroupContainer} key={group._id}>
              <div className={cls.edit}>
                <p className={cls.title}>{group.title}</p>
                <button
                  data-testid="editButton"
                  className={cls.changeButton}
                  onClick={() => {
                    setShowModalForUpdate(true);
                    _id.current = group._id;
                    setGroupData(group);
                    dispatch(setCurrentGroup(group));
                  }}
                >
                  <EditIcon sx={{ color: "white" }} />
                </button>
                <button
                  data-testid="deleteButton"
                  className={cls.deleteButton}
                  onClick={() => handleDeleteGroup(group._id)}
                >
                  <DeleteIcon sx={{ color: "white" }} />
                </button>
              </div>

              <li>
                <OneGroupInformation
                  title={group.title}
                  dailyPayment={group.dailyPayment}
                  monthlyPayment={group.monthlyPayment}
                  participants={[...group.participants]}
                  schedule={group.schedule}
                />
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
