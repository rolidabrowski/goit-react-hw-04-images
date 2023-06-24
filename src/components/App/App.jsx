import { useState } from 'react';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery';
import css from './App.module.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery value={searchQuery} />
    </div>
  );
};
