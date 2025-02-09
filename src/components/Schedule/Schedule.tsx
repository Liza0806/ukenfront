import cls from "./Schedule.module.scss";
import { Container } from "../Container/Container";
import bg from "../../assets/fon-oktagona-ufc.webp";
import { useState, useEffect } from "react";
import { Modal } from "../../components/Modal/Modal";
import { ScheduleFormModal } from "../ScheduleFormModal/ScheduleFormModal";
export const Schedule = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const [showModalForAdd, setShowModalForAdd] = useState(false);

  const openGroupModal = () => {
    setShowModalForAdd(true)
  }

  const [name, setName] = useState('')
  const [time, setTime] = useState({})
 
  const changeName = (name: any) => {
    setName(name)
  }
  const changeTime = (time: any) => {
    setTime(time)
  }
  return (

  

    <div>
      {isMobile ? (
        <Container isCentre={false} containerImage={bg}>
          <div className={cls.containerSchedule}>
            <div className={cls.titleHead}>
              <p className={cls.headerTitle}>ГРАФІК</p>
            </div>
            <ul className={cls.gridContainer}>
              <OnGroupName name="18+" time={['19.00 - 20.00', '19.30 - 20.00', '17.00 - 18.00'  ]} openModal = {openGroupModal} changeName = {changeName} changeTime = {changeTime}/>
              <OnGroupName name="ДОРОСЛІ"  time={['15.00 - 16.00', '18.30 - 20.00', '14.00 - 15.00'  ]} openModal = {openGroupModal} changeName = {changeName} changeTime = {changeTime}/>
              <OnGroupName name="ДІТИ"  time={['20.00 - 21.00', '19.30 - 20.00', '20.00 - 21.00'  ]} openModal = {openGroupModal} changeName = {changeName} changeTime = {changeTime}/>
              <OnGroupName name="5+"  time={['8.00 - 9.00', '10.30 - 11.00', '8.00 - 9.00'  ]} openModal = {openGroupModal} changeName = {changeName} changeTime = {changeTime}/>
              <OnGroupName name="10+"  time={['11.00 - 12.00', '11.30 - 12.00', '12.00 - 13.00'  ]} openModal = {openGroupModal} changeName = {changeName} changeTime = {changeTime}/>
              <OnGroupName name="16+"  time={['19.00 - 20.00', '19.30 - 20.00', '17.00 - 18.00'  ]} openModal = {openGroupModal} changeName = {changeName} changeTime = {changeTime}/>
              <OnGroupName name="7+"  time={['19.00 - 20.00', '19.30 - 20.00', '17.00 - 18.00'  ]} openModal = {openGroupModal} changeName = {changeName} changeTime = {changeTime}/>
            </ul>
          </div>

           <Modal open={showModalForAdd} onClose={() => setShowModalForAdd(false)}>
                    <ScheduleFormModal
                      time = {time}
                      name = {name}
                      isEditMode={false}
                      closeModal={() => setShowModalForAdd(false)}
                    />
                  </Modal>
        </Container>
      ) : (
        <Container isCentre={false} containerImage={bg}>
          <div className={cls.containerSchedule}>
            <div className={cls.titleHead}>
              <p className={cls.headerTitle}>ГРАФІК</p>
            </div>

            <div className={cls.gridContainer}>
              <OneLine
                firstLine={true}
                nameGroup={""}
                mondayTime={"ПОН"}
                thuesdayTime={"ВТ"}
                wendsdayTime={"СР"}
                thursdayTime={"ЧТ"}
                fridayTime={"ПТ"}
                saturDayTime={"СБ"}
                sundayTime={"НД"}
              />
              <OneLine
                nameGroup={"18+"}
                mondayTime={"20.00"}
                thuesdayTime={"14.00"}
                wendsdayTime={"10.00"}
                thursdayTime={"16.00"}
                fridayTime={"15.00"}
                saturDayTime={"11.00"}
                sundayTime={"10.00"}
              />
              <OneLine
                nameGroup={"young"}
                mondayTime={"20.00"}
                thuesdayTime={"14.00"}
                wendsdayTime={"10.00"}
                thursdayTime={"16.00"}
                fridayTime={"15.00"}
                saturDayTime={"11.00"}
                sundayTime={"10.00"}
              />
              <OneLine
                nameGroup={"adult"}
                mondayTime={"20.00"}
                thuesdayTime={"14.00"}
                wendsdayTime={"10.00"}
                thursdayTime={"16.00"}
                fridayTime={"15.00"}
                saturDayTime={"11.00"}
                sundayTime={"10.00"}
              />
              <OneLine
                nameGroup={"children"}
                mondayTime={"20.00"}
                thuesdayTime={"14.00"}
                wendsdayTime={"10.00"}
                thursdayTime={"16.00"}
                fridayTime={"15.00"}
                saturDayTime={"11.00"}
                sundayTime={"10.00"}
              />
              <OneLine
                nameGroup={"5+"}
                mondayTime={"20.00"}
                thuesdayTime={"14.00"}
                wendsdayTime={"10.00"}
                thursdayTime={"16.00"}
                fridayTime={"15.00"}
                saturDayTime={"11.00"}
                sundayTime={"10.00"}
              />
              <OneLine
                nameGroup={"10+"}
                mondayTime={"20.00"}
                thuesdayTime={"14.00"}
                wendsdayTime={"10.00"}
                thursdayTime={"16.00"}
                fridayTime={"15.00"}
                saturDayTime={"11.00"}
                sundayTime={"10.00"}
              />
              <OneLine
                nameGroup={"16+"}
                mondayTime={"20.00"}
                thuesdayTime={"14.00"}
                wendsdayTime={"10.00"}
                thursdayTime={"16.00"}
                fridayTime={"15.00"}
                saturDayTime={"11.00"}
                sundayTime={"10.00"}
              />
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export const OneLine = (props: any) => {
  return props.firstLine ? (
    <div className={cls.gridDay}>
      <OneTimeFirstLine title={props.nameGroup} />
      <OneTimeFirstLine title={props.mondayTime} />
      <OneTimeFirstLine title={props.thuesdayTime} />
      <OneTimeFirstLine title={props.wendsdayTime} />
      <OneTimeFirstLine title={props.thursdayTime} />
      <OneTimeFirstLine title={props.fridayTime} />
      <OneTimeFirstLine title={props.saturDayTime} />
      <OneTimeFirstLine title={props.sundayTime} />
    </div>
  ) : (
    <div className={cls.oneLine}>
      <OneTime title={props.nameGroup} />
      <OneTime title={props.mondayTime} />
      <OneTime title={props.thuesdayTime} />
      <OneTime title={props.wendsdayTime} />
      <OneTime title={props.thursdayTime} />
      <OneTime title={props.fridayTime} />
      <OneTime title={props.saturDayTime} />
      <OneTime title={props.sundayTime} />
    </div>
  );
};

const OneTime = (props: any) => {
  return (
    <div className={cls.oneTime}>
      <p className={cls.dateOfShcedule}>{props.title}</p>
    </div>
  );
};

const OneTimeFirstLine = (props: any) => {
  return (
    <div className={cls.oneTimeDay}>
      <p className={cls.dateOfShcedule}>{props.title}</p>
    </div>
  );
};

type PropsType = {
  name: string;
  openModal: ()=>void
  changeName: (name:string) => void
  changeTime: any
  time: string[]
};

const OnGroupName = (props: PropsType) => {
  return (
    <li className={cls.nameGroup} onClick={() => { 
      props.openModal(); 
      props.changeName(props.name); 
      props.changeTime(props.time)
    }}>
      {props.name}
    </li>
  );
};
