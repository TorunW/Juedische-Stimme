import React, { useEffect } from 'react';
import getPaginationRange from 'helpers/getPaginationRange';
import styles from './Styles.module.css';
import { Box } from '@mui/material';

const Pagination = ({ pageNum, itemsCount, itemsPerPage, type, title }) => {
  const totalPages = Math.ceil(itemsCount / itemsPerPage) - 1;

  const { minNumber, maxNumber } = getPaginationRange(pageNum, totalPages);
  const [isClickableRight, setIsClickableRight] = React.useState(false);
  const [isClickableLeft, setIsClickableLeft] = React.useState(false);

  const pages = [];
  for (let i = 1; i <= Math.ceil(itemsCount / itemsPerPage); i++) {
    pages.push(i);
  }

  function onFirstPageClick() {
    isClickableLeft === true
      ? (window.location.href = `/${type}/${title}/page/1`)
      : '';
  }

  function onPrevPageClick() {
    isClickableLeft === true
      ? (window.location.href = `/${type}/${title}/page/${pageNum - 1}`)
      : '';
  }

  function onNextPageClick() {
    isClickableRight === true
      ? (window.location.href = `/${type}/${title}/page/${pageNum + 1}`)
      : '';
  }

  function onLastPageClick() {
    isClickableRight === true
      ? (window.location.href = `/${type}/${title}/page/${totalPages - 1}`)
      : '';
  }

  useEffect(() => {
    if (pageNum === totalPages - 1) {
      setIsClickableRight(false);
    } else {
      setIsClickableRight(true);
    }

    if (pageNum === 1) {
      setIsClickableLeft(false);
    } else {
      setIsClickableLeft(true);
    }
  }, []);

  return (
    <Box marginY={5} sx={{ maxWidth: '80vw', margin: '48px auto' }}>
      <ul className={styles.pagination}>
        <button onClick={onFirstPageClick}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.4599 8.28994C11.367 8.19621 11.2564 8.12182 11.1345 8.07105C11.0127 8.02028 10.882 7.99414 10.7499 7.99414C10.6179 7.99414 10.4872 8.02028 10.3654 8.07105C10.2435 8.12182 10.1329 8.19621 10.0399 8.28994L7.03994 11.2899C6.94621 11.3829 6.87182 11.4935 6.82105 11.6154C6.77028 11.7372 6.74414 11.8679 6.74414 11.9999C6.74414 12.132 6.77028 12.2627 6.82105 12.3845C6.87182 12.5064 6.94621 12.617 7.03994 12.7099L10.0399 15.7099C10.1329 15.8037 10.2435 15.8781 10.3654 15.9288C10.4872 15.9796 10.6179 16.0057 10.7499 16.0057C10.882 16.0057 11.0127 15.9796 11.1345 15.9288C11.2564 15.8781 11.367 15.8037 11.4599 15.7099C11.5537 15.617 11.6281 15.5064 11.6788 15.3845C11.7296 15.2627 11.7557 15.132 11.7557 14.9999C11.7557 14.8679 11.7296 14.7372 11.6788 14.6154C11.6281 14.4935 11.5537 14.3829 11.4599 14.2899L9.15994 11.9999L11.4599 9.70994C11.5537 9.61698 11.6281 9.50638 11.6788 9.38452C11.7296 9.26266 11.7557 9.13195 11.7557 8.99994C11.7557 8.86793 11.7296 8.73722 11.6788 8.61536C11.6281 8.4935 11.5537 8.3829 11.4599 8.28994ZM14.6599 11.9999L16.9999 9.70994C17.1882 9.52164 17.294 9.26624 17.294 8.99994C17.294 8.73364 17.1882 8.47824 16.9999 8.28994C16.8116 8.10164 16.5562 7.99585 16.2899 7.99585C16.0236 7.99585 15.7682 8.10164 15.5799 8.28994L12.5799 11.2899C12.4862 11.3829 12.4118 11.4935 12.361 11.6154C12.3103 11.7372 12.2841 11.8679 12.2841 11.9999C12.2841 12.132 12.3103 12.2627 12.361 12.3845C12.4118 12.5064 12.4862 12.617 12.5799 12.7099L15.5799 15.7099C15.6729 15.8037 15.7835 15.8781 15.9054 15.9288C16.0272 15.9796 16.1579 16.0057 16.2899 16.0057C16.422 16.0057 16.5527 15.9796 16.6745 15.9288C16.7964 15.8781 16.907 15.8037 16.9999 15.7099C17.0937 15.617 17.1681 15.5064 17.2188 15.3845C17.2696 15.2627 17.2957 15.132 17.2957 14.9999C17.2957 14.8679 17.2696 14.7372 17.2188 14.6154C17.1681 14.4935 17.0937 14.3829 16.9999 14.2899L14.6599 11.9999Z'
              fill={isClickableLeft === true ? 'black' : 'gray'}
            />
          </svg>
        </button>
        <button onClick={onPrevPageClick}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.2899 11.9997L14.8299 8.4597C15.0162 8.27234 15.1207 8.01889 15.1207 7.7547C15.1207 7.49052 15.0162 7.23707 14.8299 7.0497C14.737 6.95598 14.6264 6.88158 14.5045 6.83081C14.3827 6.78004 14.252 6.75391 14.1199 6.75391C13.9879 6.75391 13.8572 6.78004 13.7354 6.83081C13.6135 6.88158 13.5029 6.95598 13.4099 7.0497L9.16994 11.2897C9.07622 11.3827 9.00182 11.4933 8.95105 11.6151C8.90028 11.737 8.87415 11.8677 8.87415 11.9997C8.87415 12.1317 8.90028 12.2624 8.95105 12.3843C9.00182 12.5061 9.07622 12.6167 9.16994 12.7097L13.4099 16.9997C13.5034 17.0924 13.6142 17.1657 13.736 17.2155C13.8579 17.2652 13.9883 17.2905 14.1199 17.2897C14.2516 17.2905 14.382 17.2652 14.5038 17.2155C14.6257 17.1657 14.7365 17.0924 14.8299 16.9997C15.0162 16.8123 15.1207 16.5589 15.1207 16.2947C15.1207 16.0305 15.0162 15.7771 14.8299 15.5897L11.2899 11.9997Z'
              fill={isClickableLeft === true ? 'black' : 'gray'}
            />
          </svg>
        </button>
        {pages
          .filter((number) => number >= minNumber && number < maxNumber)
          .map((number) => (
            <li key={number} className={styles.pageItem}>
              <a
                href={`/${type}/${title}/page/${number}`}
                className={
                  parseInt(number) === parseInt(pageNum)
                    ? styles.active
                    : styles.pageLink
                }
              >
                {number}
              </a>
            </li>
          ))}
        <button onClick={onNextPageClick}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M14.8299 11.2897L10.5899 7.0497C10.497 6.95598 10.3864 6.88158 10.2645 6.83081C10.1427 6.78004 10.012 6.75391 9.87994 6.75391C9.74793 6.75391 9.61723 6.78004 9.49537 6.83081C9.37351 6.88158 9.26291 6.95598 9.16994 7.0497C8.98369 7.23707 8.87915 7.49052 8.87915 7.7547C8.87915 8.01889 8.98369 8.27234 9.16994 8.4597L12.7099 11.9997L9.16994 15.5397C8.98369 15.7271 8.87915 15.9805 8.87915 16.2447C8.87915 16.5089 8.98369 16.7623 9.16994 16.9497C9.26338 17.0424 9.3742 17.1157 9.49604 17.1655C9.61787 17.2152 9.74834 17.2405 9.87994 17.2397C10.0115 17.2405 10.142 17.2152 10.2638 17.1655C10.3857 17.1157 10.4965 17.0424 10.5899 16.9497L14.8299 12.7097C14.9237 12.6167 14.9981 12.5061 15.0488 12.3843C15.0996 12.2624 15.1257 12.1317 15.1257 11.9997C15.1257 11.8677 15.0996 11.737 15.0488 11.6151C14.9981 11.4933 14.9237 11.3827 14.8299 11.2897Z'
              fill={isClickableRight === true ? 'black' : 'gray'}
            />
          </svg>
        </button>
        <button onClick={onLastPageClick}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8.46002 8.28978C8.27172 8.09617 8.01422 7.98529 7.74416 7.98154C7.47411 7.97779 7.21363 8.08147 7.02002 8.26978C6.82641 8.45808 6.71554 8.71558 6.71179 8.98564C6.70804 9.25569 6.81172 9.51617 7.00002 9.70978L9.34002 11.9998L7.00002 14.2898C6.90629 14.3827 6.8319 14.4933 6.78113 14.6152C6.73036 14.7371 6.70422 14.8678 6.70422 14.9998C6.70422 15.1318 6.73036 15.2625 6.78113 15.3844C6.8319 15.5062 6.90629 15.6168 7.00002 15.7098C7.09298 15.8035 7.20359 15.8779 7.32545 15.9287C7.4473 15.9794 7.57801 16.0056 7.71002 16.0056C7.84203 16.0056 7.97274 15.9794 8.0946 15.9287C8.21646 15.8779 8.32706 15.8035 8.42002 15.7098L11.42 12.7098C11.5138 12.6168 11.5881 12.5062 11.6389 12.3844C11.6897 12.2625 11.7158 12.1318 11.7158 11.9998C11.7158 11.8678 11.6897 11.7371 11.6389 11.6152C11.5881 11.4933 11.5138 11.3827 11.42 11.2898L8.46002 8.28978ZM16.96 11.2898L13.96 8.28978C13.7717 8.10147 13.5163 7.99569 13.25 7.99569C12.9837 7.99569 12.7283 8.10147 12.54 8.28978C12.3517 8.47808 12.2459 8.73348 12.2459 8.99978C12.2459 9.26608 12.3517 9.52147 12.54 9.70978L14.84 11.9998L12.54 14.2898C12.4463 14.3827 12.3719 14.4933 12.3211 14.6152C12.2704 14.7371 12.2442 14.8678 12.2442 14.9998C12.2442 15.1318 12.2704 15.2625 12.3211 15.3844C12.3719 15.5062 12.4463 15.6168 12.54 15.7098C12.633 15.8035 12.7436 15.8779 12.8654 15.9287C12.9873 15.9794 13.118 16.0056 13.25 16.0056C13.382 16.0056 13.5127 15.9794 13.6346 15.9287C13.7565 15.8779 13.8671 15.8035 13.96 15.7098L16.96 12.7098C17.0564 12.6195 17.134 12.511 17.1882 12.3906C17.2424 12.2701 17.2723 12.1401 17.276 12.0081C17.2797 11.8761 17.2572 11.7446 17.2099 11.6213C17.1625 11.498 17.0912 11.3854 17 11.2898H16.96Z'
              fill={isClickableRight === true ? 'black' : 'gray'}
            />
          </svg>
        </button>
      </ul>
    </Box>
  );
};

export default Pagination;
