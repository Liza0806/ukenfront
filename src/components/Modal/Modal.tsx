import React from "react";
import ReactDOM from "react-dom"; 
import cls from './Modal.module.scss';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  // Находим элемент modal-root
  const modalRootElement = document.getElementById('modal-root') as HTMLElement;

  return ReactDOM.createPortal(
    <div className={cls.overlay}>
      <div className={cls.modal}>
      <button onClick={onClose}>Close</button>
        {children}
       
      </div>
    </div>,
    modalRootElement // Используем напрямую DOM-элемент
  );
};
