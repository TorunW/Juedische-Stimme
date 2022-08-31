import React, { useState } from 'react';
import { Category } from 'types/Category.type';
import styles from '../components/Styles.module.css';

type SearchFilterProps = {
  categoryName?: string;
  categories?: Category[];
  phrase?: string;
};

const SearchFilter = ({
  categoryName,
  categories,
  phrase,
}: SearchFilterProps) => {
  const [searchPhrase, setSearchPhrase] = useState(phrase ? phrase : '');
  function onCategorySelectChange(val: string) {
    window.location.href = `/category/${val}`;
  }
  let categoryOptionsDisplay;
  if (categories) {
    categoryOptionsDisplay = categories.map((cat, index) => (
      <option
        key={index}
        value={cat.name}
        selected={cat.name === categoryName ? true : false}
      >
        {cat.name}
      </option>
    ));
  }
  return (
    <div className={styles.filterContainer}>
      <h3>Filter by:</h3>
      <div className={styles.searchContainer}>
        <select
          value={categoryName}
          onChange={(e) => onCategorySelectChange(e.target.value)}
        >
          <option value={'Select'}>Select Category</option>
          {categoryOptionsDisplay}
        </select>
        <input
          type={'text'}
          placeholder='search'
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
        />
      </div>
      <button
        onClick={() => (window.location.href = `/search/${searchPhrase}`)}
      >
        search
      </button>
    </div>
  );
};
export default SearchFilter;
