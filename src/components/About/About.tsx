import { Text } from "../Text/Text";
import { Title } from "../Title/Title";
import cls from "./About.module.scss";
import { Container } from "../Container/Container";
import box from "../../assets/boxNew.webp";
import kickboxing from "../../assets/kickboxing.jpg";
import wrestling from "../../assets/wrestling.jpg";
import { useState } from "react";
import { Box } from "@mui/material";

export const About = () => {
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedDescription, setSelectedDescription] = useState(""); // Новое состояние для описания
  const [active, setActive] = useState(false);

  const descriptions = [
    "Бокс — контактний вид спорту, в якому спортсмени наносять один одному удари кулаками в спеціальних рукавичках.",
    "Кікбоксинг — вид єдиноборства, в якому сполучаються техніка і правила боксу з прийомами карате і тайського боксу",

    "Греепплінг— єдиноборство, в основі якого лежить позиційне маневрування та комбінації больвих і удушливих прийомів.",
  ];

  const handleClick = (e: any, index: number) => {
    const imgSrc = e.currentTarget.querySelector("img").src;
    setSelectedImg(imgSrc);
    setSelectedDescription(descriptions[index]); // Устанавливаем соответствующее описание
    setActive(true);
  };

  const closeModal = (e: any) => {
    if (e.target.className.includes(cls.modal)) {
      setActive(false);
    }
  };

  return (
    <div className={cls.pageOfFightArt}>
      <p className={cls.title}>БОЙОВІ МИСТЕЦТВА</p>
      <div className={cls.figtArtItem}>
        <div className={cls.oneFightArt}>
       
       <img className={cls.image} src={box} alt="this is coach" />
       <p className={cls.titleOfArt}>{descriptions[0]}</p> 
        </div>
        <div className={cls.oneFightArt}>
       
       <img className={cls.image} src={kickboxing} alt="this is coach" />
       <p className={cls.titleOfArt}>{descriptions[1]}</p> 
        </div>
        <div className={cls.oneFightArt}>
       

      <img className={cls.image} src={wrestling } alt="this is coach" />
      <p className={cls.titleOfArt}>{descriptions[2]}</p> 
       </div>
      </div>
    </div>
  );
};

export const Modal = (props: any) => {
  return (
    <div
      className={props.active ? cls.modal + " " + cls.active : cls.modal}
      onClick={props.closeModal}
    >
      <img className={cls.imageModal} src={props.img} alt="Изображение" />
      <p className={cls.titleOfModal}>{props.description}</p>
    </div>
  );
};

export const Description = (props: any) => {
  return (
    <div className={cls.containerTitle}>
      <p className={cls.titleOfArt}>{props.title}</p>
    </div>
  );
};
