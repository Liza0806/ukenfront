import cls from "./ScheduleFormModal.module.scss";
import React, { useState } from "react";
import { GroupType } from "../../redux/types/types";
import { TRUE } from "sass";
 

interface GroupFormProps {
  initialGroupData?: GroupType | undefined;
  isEditMode: boolean;
  closeModal: () => void;
  setGroupData?: (data: any) => void;
  name: string
  time: any
}

export const ScheduleFormModal: React.FC<GroupFormProps> = ({
  initialGroupData,
  isEditMode,
  closeModal,
  setGroupData,
  name, 
  time
}) => {
  return (
    <div className={cls.modalContent}>
      <div>
      <p className={cls.title}>{name}</p>
      </div>

      <div className={cls.days}>
         <div>
            <ul>
           <NameDay title='ПОНЕДІЛОК' time = {false} />
           <NameDay title='ВІВТОРОК' time = {false}/>
           <NameDay title='СЕРЕДА' time = {false}/>
            </ul>
         </div>

         <div>
            <ul>
           <NameDay title={time[0]} time = {true}/>
           <NameDay title={time[1]} time = {true}/>
           <NameDay title={time[2]} time = {true}/>
            </ul>
         </div>
      </div>
     
    </div>
  );

 
};

type PropsType = {
 title: string;
 time: boolean;

}

const NameDay = (props: PropsType) => {
    return (
    <li className={props.time? cls.oneTime : cls.oneDay}>
        {props.title}
    </li>
    )
  }