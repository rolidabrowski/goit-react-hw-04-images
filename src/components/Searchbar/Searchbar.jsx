import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (value.trim() === '') {
      return alert('Please enter key words for search');
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            aria-hidden="true"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <input
          className={css.input}
          type="text"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
