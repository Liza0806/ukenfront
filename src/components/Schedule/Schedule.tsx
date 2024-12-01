import cls from "./Schedule.module.scss";
import { Container } from "../Container/Container";
import bg from "../../assets/fon-oktagona-ufc.jpg";

export const Schedule = () => {
  return (
    <Container isCentre={false} containerImage={bg}>
      <div className={cls.containerSchedule}>
        <div className={cls.titleHead}>
          <p className={cls.headerTitle}>ГРАФІК</p>
        </div>
     
        <div className={cls.gridContainer}>
        <OneLine
            firstLine = {true}
            nameGroup={''}
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
  );
};

const OneLine = (props: any) => {
  return (
    props.firstLine?<div className={cls.gridDay}>
    <OneTimeFirstLine title={props.nameGroup} />
    <OneTimeFirstLine title={props.mondayTime} />
    <OneTimeFirstLine title={props.thuesdayTime} />
    <OneTimeFirstLine title={props.wendsdayTime} />
    <OneTimeFirstLine title={props.thursdayTime} />
    <OneTimeFirstLine title={props.fridayTime} />
    <OneTimeFirstLine title={props.saturDayTime} />
    <OneTimeFirstLine title={props.sundayTime} />
  </div>:
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
  <div className={cls.oneTime}><p className={cls.dateOfShcedule}>{props.title}</p></div>
)
};

const OneTimeFirstLine = (props: any) => {
  return (
  <div className={cls.oneTimeDay}><p className={cls.dateOfShcedule}>{props.title}</p></div>
)
};
