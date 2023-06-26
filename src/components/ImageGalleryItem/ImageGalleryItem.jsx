import { Modal } from '../index';
import { useToggle } from '../index';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ item }) => {
  const { largeImageURL, tags, webformatURL } = item;
  const { isOpen, open, close } = useToggle(false);

  return (
    <>
      <li className={css.item}>
        <div>
          <img
            className={css.itemImage}
            onClick={open}
            src={webformatURL}
            alt={tags}
            loading="lazy"
          />
        </div>
      </li>
      {isOpen && (
        <Modal onModalClose={close}>
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

export default ImageGalleryItem;
