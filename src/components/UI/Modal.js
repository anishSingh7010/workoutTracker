import { createPortal } from 'react-dom';
import './Modal.css';

const Modal = (props) => {
  return (
    <>
      {createPortal(
        <div onClick={props.onClose} className="backdrop"></div>,
        document.getElementById('backdrop')
      )}
      {createPortal(
        <div className="modal">{props.children}</div>,
        document.getElementById('overlay')
      )}
    </>
  );
};

export default Modal;
