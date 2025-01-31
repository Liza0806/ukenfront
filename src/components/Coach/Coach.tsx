import coach from "../../assets/newKostya.png";
import { Text } from "../Text/Text";
import { Title } from "../Title/Title";
import cls from "./Coach.module.scss";
import { ReactSVG } from "react-svg";
import education from "../../assets/education-learning-21-svgrepo-com.svg";
import fight from "../../assets/fight-svgrepo-com.svg";
import judo from "../../assets/olympic-judo-silhouettes-fight-svgrepo-com.svg";
import punch from "../../assets/person-fight-punch-svgrepo-com.svg";
import { TrainerInfo } from "../TrainerInfo/TrainerInfo";
import { Container } from "../Container/Container";


export const Coach = () => {
  return (
    <div className={cls.container}>
    <div className={cls.containerCoach}>
       <div className={cls.titleHead} >
        <h2 className={cls.headerNameTitle}>КОНСТЯНТИН ГОРУЛЬКО</h2>
        <h1 className={cls.headerTitle}>ТРЕНЕР</h1>
       </div> 
    
      <div className={cls.coachBody}>
      <div className={cls.photo}>
      <img className={cls.imageCoach} src={coach} alt="this is coach" />
     
      </div>
      <div className={cls.coachHero}>
     
      <p className={cls.titleCoach}>
       Lorem ipsum dolor sit amet, consectetur 
       adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
       nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
      </p>      
      </div>
      </div>
    </div>
  </div>
  );
};
