import { useState } from 'react';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery';
import css from './App.module.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery
        value={searchQuery}
        page={page}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};
