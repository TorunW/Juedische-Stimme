import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'store/hooks';
import { Category } from 'types/Category.type';
import styles from '../components/Styles.module.css';

type SearchFilterProps = {
  phrase?: string;
};

const SearchFilter = ({ phrase }: SearchFilterProps) => {
  const { categories, categoryName } = useSelector((state) => state.categories);

  const [searchPhrase, setSearchPhrase] = useState(phrase ? phrase : '');
  const [dropDownIsVisible, setDropDownIsVisible] = useState(false);
  console.log(dropDownIsVisible);
  function handleClick() {
    if (dropDownIsVisible === false) {
      setDropDownIsVisible(true);
    } else {
      setDropDownIsVisible(false);
    }
  }
  // function onCategorySelectChange(val: string) {
  //   window.location.href = `/category/${val}`;
  // }
  let categoryOptionsDisplay: ReactElement[];
  if (categories) {
    categoryOptionsDisplay = categories.map((cat, index) => (
      <a key={index} href={`/category/${cat.name}`}>
        {cat.name}
      </a>
    ));
  }

  return (
    <div className={styles.filterContainer}>
      <h3>Filter by:</h3>
      <div className={styles.searchContainer}>
        <div className={styles.dropDown}>
          <button onClick={handleClick}>
            Choose category
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M16.9999 9.17019C16.8126 8.98394 16.5591 8.87939 16.2949 8.87939C16.0308 8.87939 15.7773 8.98394 15.5899 9.17019L11.9999 12.7102L8.45995 9.17019C8.27259 8.98394 8.01913 8.87939 7.75495 8.87939C7.49076 8.87939 7.23731 8.98394 7.04995 9.17019C6.95622 9.26315 6.88183 9.37375 6.83106 9.49561C6.78029 9.61747 6.75415 9.74818 6.75415 9.88019C6.75415 10.0122 6.78029 10.1429 6.83106 10.2648C6.88183 10.3866 6.95622 10.4972 7.04995 10.5902L11.2899 14.8302C11.3829 14.9239 11.4935 14.9983 11.6154 15.0491C11.7372 15.0998 11.8679 15.126 11.9999 15.126C12.132 15.126 12.2627 15.0998 12.3845 15.0491C12.5064 14.9983 12.617 14.9239 12.7099 14.8302L16.9999 10.5902C17.0937 10.4972 17.1681 10.3866 17.2188 10.2648C17.2696 10.1429 17.2957 10.0122 17.2957 9.88019C17.2957 9.74818 17.2696 9.61747 17.2188 9.49561C17.1681 9.37375 17.0937 9.26315 16.9999 9.17019Z' />
            </svg>
          </button>
          <div
            className={
              dropDownIsVisible === false
                ? styles.dropDownMenu
                : styles.dropDownMenu + ' ' + styles.active
            }
          >
            {categoryOptionsDisplay}
          </div>
        </div>
        <div className={styles.inputSearch}>
          <input
            type={'text'}
            placeholder='search'
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
          <button
            onClick={() => (window.location.href = `/search/${searchPhrase}`)}
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M21.7099 20.2904L17.9999 16.6104C19.44 14.8148 20.1374 12.5357 19.9487 10.2417C19.76 7.94769 18.6996 5.81318 16.9854 4.27704C15.2713 2.7409 13.0337 1.9199 10.7328 1.98286C8.43194 2.04582 6.24263 2.98795 4.61505 4.61553C2.98747 6.24311 2.04534 8.43243 1.98237 10.7333C1.91941 13.0342 2.74041 15.2718 4.27655 16.9859C5.81269 18.7001 7.94721 19.7605 10.2412 19.9492C12.5352 20.1379 14.8143 19.4405 16.6099 18.0004L20.2899 21.6804C20.3829 21.7741 20.4935 21.8485 20.6153 21.8993C20.7372 21.9501 20.8679 21.9762 20.9999 21.9762C21.1319 21.9762 21.2626 21.9501 21.3845 21.8993C21.5063 21.8485 21.6169 21.7741 21.7099 21.6804C21.8901 21.4939 21.9909 21.2447 21.9909 20.9854C21.9909 20.7261 21.8901 20.4769 21.7099 20.2904ZM10.9999 18.0004C9.61544 18.0004 8.26206 17.5899 7.11091 16.8207C5.95977 16.0515 5.06256 14.9583 4.53275 13.6792C4.00293 12.4001 3.86431 10.9926 4.13441 9.63476C4.4045 8.27689 5.07119 7.02961 6.05016 6.05065C7.02912 5.07168 8.27641 4.40499 9.63427 4.1349C10.9921 3.8648 12.3996 4.00342 13.6787 4.53324C14.9578 5.06305 16.051 5.96026 16.8202 7.1114C17.5894 8.26255 17.9999 9.61592 17.9999 11.0004C17.9999 12.8569 17.2624 14.6374 15.9497 15.9501C14.6369 17.2629 12.8564 18.0004 10.9999 18.0004Z'
                // fill='black'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchFilter;
