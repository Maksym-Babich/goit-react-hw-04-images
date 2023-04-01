import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContent, Image } from 'components/Modal/Modal.styled';

export function Modal({ toggleModal, src, alt }) {
  useEffect(() => {
    const onModalMount = event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', onModalMount);

    return () => {
      window.removeEventListener('keydown', onModalMount);
    };
  }, [toggleModal]);

  const onOverlayClick = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <Overlay onClick={onOverlayClick}>
      <ModalContent>
        <Image alt={alt} src={src} />
      </ModalContent>
    </Overlay>,
    document.querySelector('#modal-root')
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
