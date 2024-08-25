import kostya from "../../assets/k2.jpg";
import bg from "../../assets/fon-oktagona-ufc.jpg";
import { Text } from "../Text/Text";
import { Title } from "../Title/Title";
import cls from "./Coach.module.scss";
import { ReactSVG } from "react-svg";
import education from "../../assets/education-learning-21-svgrepo-com.svg";
import fight from "../../assets/fight-svgrepo-com.svg";
import judo from "../../assets/olympic-judo-silhouettes-fight-svgrepo-com.svg";
import punch from "../../assets/person-fight-punch-svgrepo-com.svg";
import { TrainerInfo } from "../TrainerInfo/TrainerInfo";


export const Coach = () => {
  return (
    <section className={cls.wrapper} style={{ backgroundImage: `url(${bg})` }}>
      <div>
        <Title text="Константин Горулько" classN={"small"} color={"orange"} />
        <div>
          <img src={kostya} alt='kostya'/>
        </div>
      </div>
       <TrainerInfo/>
    </section>
  );
};
