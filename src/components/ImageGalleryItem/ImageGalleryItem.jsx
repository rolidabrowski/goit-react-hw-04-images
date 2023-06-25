import { useState } from 'react';
import { Modal } from '../Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ item }) => {
  const { largeImageURL, tags, webformatURL } = item;

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <li className={css.item}>
        <div>
          <img
            className={css.itemImage}
            onClick={toggleModal}
            src={webformatURL}
            alt={tags}
            loading="lazy"
          />
        </div>
      </li>
      {showModal && (
        <Modal onModalClose={toggleModal}>
          {
            <>
              <img src={largeImageURL} alt={tags} />
            </>
          }
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
