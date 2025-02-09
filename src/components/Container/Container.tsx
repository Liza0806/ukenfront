
import cls from './Container.module.scss';
import React, { forwardRef } from 'react';

interface ContainerProps {
    children: React.ReactNode; // Позволяет компоненту принимать дочерние элементы
    containerImage: string;
}

type CalendarTypeProps = {
    isCentre: boolean;
}

// Измените определение компонента на forwardRef
const Container = forwardRef<HTMLDivElement, ContainerProps & CalendarTypeProps>(
    (props, ref) => {
        const { children, isCentre, containerImage } = props;

        return (
            <div 
                ref={ref} 
                className={isCentre ? cls.container : cls.containerForCalendar} 
                style={{ 
                    backgroundImage: `url(${containerImage})`, 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                    backgroundBlendMode: 'overlay', 
                    backgroundSize: 'contain', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat', 
                    height: '100%' 
                }}
            >
                {children} {/* Здесь отображаются дочерние элементы */}
            </div>
        );
    }
);

export { Container };