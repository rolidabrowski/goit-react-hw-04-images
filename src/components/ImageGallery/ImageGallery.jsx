import { useState, useEffect } from 'react';
import { ImageGalleryItem } from '../index';
import { Button } from '../index';
import { MyLoader } from '../index';
import api from '../services/api';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const PER_PAGE = 12;

export const ImageGallery = ({ value, page, onLoadMore }) => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!value) {
      return;
    }

    if (page === 1) {
      setGallery([]);
    }

    setIsLoading(true);

    try {
      api.fetchPhotos(value, page, PER_PAGE).then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setGallery(prevGallery => [...prevGallery, ...hits]);
        setTotalPages(Math.floor(totalHits / PER_PAGE));
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [value, page, onLoadMore]);

  if (error) {
    alert('Something went wrong. Try again.');
  }

  if (isLoading) {
    return <MyLoader />;
  }

  if (gallery.length > 0) {
    return (
      <>
        <ul className={css.gallery}>
          {gallery.map(image => (
            <ImageGalleryItem key={image.id} item={image} />
          ))}
        </ul>
        {page <= totalPages && <Button onClick={onLoadMore}>Load More</Button>}
      </>
    );
  }
};

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default ImageGallery;
