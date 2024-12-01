import React from 'react'

import cls from "./Futer.module.scss";
import telefon from "../../assets/svg/telephone-svgrepo-com (1).svg";
import telegram from "../../assets/svg/telegram-svgrepo-com.svg";
import instagram from "../../assets/svg/instagram-svgrepo-com.svg";
import location from '../../assets/svg/location-svgrepo-com.svg'

export const Futer = () => {
  return (
    <div className={cls.futerLanding}>
      <div className={cls.label}>UKEN</div>
       
       
      <div className={cls.contactContainer}>
      <div>
          <img src={location} alt="Описание изображения" />
        </div>
      <div className={cls.contactData}>
        <p className={cls.contact}> Полтава</p>
        <p className={cls.contact}>09563214055</p>
      </div>
      </div>
      
      <div className={cls.social}>
       
        <div>
          <img className={cls.icon} src={telegram} alt="Описание изображения" />
        </div>
        <div>
          <img className={cls.icon} src={telefon} alt="Описание изображения" />
        </div>
        <div>
          <img className={cls.icon} src={instagram} alt="Описание изображения" />
        </div>
      </div>
    </div>
  );
};
