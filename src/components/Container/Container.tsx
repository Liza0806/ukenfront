
import cls from './Container.module.scss';
import React, { forwardRef } from 'react';

interface ContainerProps {
    children: React.ReactNode; // Позволяет компоненту принимать дочерние элементы
    containerImage: string;
}

type CalendarTypeProps = {
    isCentre: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps & CalendarTypeProps>(
    (props, ref) => {
        const { children, isCentre, containerImage } = props;

        return (
            <div 
                ref={ref} // Убедитесь, что ref установлен на div
                className={isCentre ? cls.container : cls.containerForCalendar} 
                style={{ 
                    backgroundImage: `url(${containerImage})`, 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Полупрозрачный белый цвет
                    backgroundBlendMode: 'overlay', // Смешиваем цвет с изображением
                    backgroundSize: 'cover', // Масштабируем изображение
                    backgroundPosition: 'center', // Центрируем изображение
                }}
            >
                {children} {/* Здесь отображаются дочерние элементы */}
            </div>
        );
    }
);

export { Container };