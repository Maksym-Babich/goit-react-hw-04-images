import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Item,
  Image,
} from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem({ image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Item>
      <Image alt={image.tags} src={image.webformatURL} onClick={toggleModal} />
      {isModalOpen && (
        <Modal
          alt={image.tags}
          src={image.largeImageURL}
          toggleModal={toggleModal}
        />
      )}
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
