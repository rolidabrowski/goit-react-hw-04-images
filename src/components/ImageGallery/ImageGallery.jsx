import { useState, useEffect } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Button } from '../Button';
import { MyLoader } from '../Loader';
import api from '../services/api';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ value, page, onLoadMore }) => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  let perPage = 12;

  useEffect(() => {
    if (!value) {
      return;
    }

    if (page === 1) {
      setGallery([]);
    }

    setIsLoading(true);

    try {
      api.fetchPhotos(value, page, perPage).then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setGallery(prevGallery => [...prevGallery, ...hits]);
        setTotalPages(Math.floor(totalHits / perPage));
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [value, page, perPage, onLoadMore]);

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
