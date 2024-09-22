import cls from './Container.module.scss';
import containerImage from '../../assets/PhoneForPagIvent.jpg';
import React from 'react';

interface ContainerProps {
    children: React.ReactNode; // Позволяет компоненту принимать дочерние элементы
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className={cls.container} style={{ backgroundImage: `url(${containerImage})` }}>
            {children} {/* Здесь отображаются дочерние элементы */}
        </div>
    );
};