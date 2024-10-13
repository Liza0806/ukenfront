import React from "react"; /////
import ReactDOM from "react-dom"; //////
import cls from './Modal.module.scss'

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
  
  const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null; ///////

  // Найдем элемент для портала
  const modalRoot = document.getElementById('modal-root'); /////////

  // Если элемента нет, ничего не рендерим
  if (!modalRoot) return null; //////

  return ReactDOM.createPortal( ////////
    <div className={cls.overlay}>
      <div className={cls.modal}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    modalRoot 
  );
};




