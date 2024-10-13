import { useState } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import AddGroupForm from "../../components/AddGroupForm/AddGroupForm";
import { OneGroupInformation } from "../../components/OneGroupInformation/OneGroupInformation";
import cls from "./GroupsPage.module.scss";
import { Container } from "../../components/Container/Container";
import containerImage from "../../assets/gymForGruops.jpg";
import { selectGroups } from "../../redux/selectors/selectors";

const GroupsPage = () => {
  // const groups: GroupType[] = useAppSelector((state) => state.groups.groups);
  const groups = useAppSelector(selectGroups);
  // Указываем, что visibleGroups будет объектом с ключами-строками и значениями-логическими

  const [showAddGroupe, setShowAddGroupe] = useState(false);
  return (
    <Container containerImage={containerImage} isCentre={false}>
      <div className={cls.containerGradient}>
        <div className={cls.containerHeader}>
          <p className={cls.titleHead}>ГРУПИ</p>
        </div>

        {showAddGroupe && (
          <div
            className={cls.modalOverlay}
            onClick={() => setShowAddGroupe(false)}
          >
            <div
              className={cls.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <AddGroupForm groups={groups} />
            </div>
          </div>
        )}

        <ul className={cls.containerGroups}>
          {groups.map((group) => (
            <div className={cls.oneGroupContainer}>
               <p className={cls.title}>{group.title}</p> 
              <li key={group._id}>
                <OneGroupInformation groupData={group} />
              </li>
            </div>
          ))}
        </ul>
        <button className={cls.button} onClick={() => setShowAddGroupe(true)}>
          Створити групи
        </button>
      </div>
    </Container>
  );
};

export default GroupsPage;
