import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchAllGroups } from "../../redux/thunks/thunks";
import { GroupType } from "../../redux/types/types";
import AddGroupForm from "../../components/AddGroupForm/AddGroupForm";
import { GroupPage } from "../../components/OneGroupInformation/OneGroupInformation";
import cls from './GroupsPage.module.scss';
import { Container } from "../../components/Container/Container";
import containerImage from "../../assets/gymForGruops.jpg";

const GroupsPage = () => {
  const isFirstRender = useRef(true);

  const groups: GroupType[] = useAppSelector((state) => state.groups.groups);

  // Указываем, что visibleGroups будет объектом с ключами-строками и значениями-логическими
  const [visibleGroups, setVisibleGroups] = useState<Record<string, boolean>>({});

  const dispatch = useAppDispatch();

  // Инициализация групп при первом рендере и после загрузки данных
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(fetchAllGroups());
    }
  }, [dispatch]);

  // Обновляем состояние видимости, когда группы загружены
  useEffect(() => {
    if (groups.length > 0) {
      const initialVisibility = groups.reduce((acc, group) => {
        acc[group._id] = true; // Все группы видны по умолчанию
        return acc;
      }, {} as Record<string, boolean>); // Явно указываем тип для аккумулятора
      setVisibleGroups(initialVisibility);
    }
  }, [groups]); // Выполняется, когда меняется список групп

  const toggleGroupVisibility = (id: string) => {
    setVisibleGroups((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const [showAddGroupe, setShowAddGroupe] = useState(false)
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
             <li
             
              key={group._id}
              onClick={() => toggleGroupVisibility(group._id)}
            >
             
              {visibleGroups[group._id] && <GroupPage groupData={group} />}
            </li>
           </div>
          ))}
       
        </ul>
        <button className={cls.button} onClick={()=>setShowAddGroupe(true)}>Створити групи</button> 

   </div>
   
    </Container>
  );
};

export default GroupsPage