import cls from './Container.module.scss';

import React from 'react';

interface ContainerProps {
    children: React.ReactNode; // Позволяет компоненту принимать дочерние элементы
    containerImage: string;
}

type CalendarTypeProps = {
    isCentre: boolean

}

type CombinedProps = ContainerProps & CalendarTypeProps;

export const Container: React.FC<CombinedProps> = (props) => {
    const { children, isCentre, containerImage } = props; // Деструктурируем isCentre из props

    return (
        <div 
            className={isCentre ? cls.container : cls.containerForCalendar} 
            style={{ 
                backgroundImage: `url(${containerImage})`, 
                backgroundColor: 'rgba(255, 255, 255, 0.6)', // Полупрозрачный белый цвет
                backgroundBlendMode: 'overlay', // Смешиваем цвет с изображением
                backgroundSize: 'cover', // Масштабируем изображение
                backgroundPosition: 'center', // Центрируем изображение
            
            }}
        >
            {children} {/* Здесь отображаются дочерние элементы */}
        </div>
    );
};