import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const root = document.querySelector('#root');

export const Modal = ({ onModalClose, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === `Escape`) {
        onModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onModalClose]);

  const handleBackdropeClick = event => {
    if (event.target === event.currentTarget) {
      onModalClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropeClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    root
  );
};

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
