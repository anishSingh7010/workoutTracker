import { createPortal } from 'react-dom';
import './Modal.css';

const Modal = ({ classes = [], children, onClose }) => {
  return (
    <>
      {createPortal(
        <div onClick={onClose} className="backdrop"></div>,
        document.getElementById('backdrop')
      )}
      {createPortal(
        <div className={'modal ' + classes.join(' ')}>{children}</div>,
        document.getElementById('overlay')
      )}
    </>
  );
};

export default Modal;
