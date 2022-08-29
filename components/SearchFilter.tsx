import React, { useState } from 'react';
import { Category } from 'types/Category.type';

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
    <div style={{ backgroundColor: 'yellow' }}>
      <h2>Filter</h2>
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
      <button
        onClick={() => (window.location.href = `/search/${searchPhrase}`)}
      >
        search
      </button>
    </div>
  );
};
export default SearchFilter;
