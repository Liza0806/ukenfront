import React from "react";
import ReactDOM from "react-dom"; 
import cls from './Modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';

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
      <CloseIcon sx={{ color: "#ff9900",  cursor: "pointer", marginLeft: 'auto', transition: "transform 0.3s ease",
              ":hover": {
                transform: "scale(1.2)", 
              },}} 
              onClick={onClose}
              data-testid='closeModal'
              >Close</CloseIcon>
        {children}
       
      </div>
    </div>,
    modalRootElement // Используем напрямую DOM-элемент
  );
};
