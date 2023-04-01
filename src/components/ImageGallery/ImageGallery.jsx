import { Gallery } from 'components/ImageGallery/ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = function ({ images }) {
  return (
    <Gallery>
      {images.map(image => {
        return <ImageGalleryItem key={image.id} image={image} />;
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
