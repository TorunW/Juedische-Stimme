import React from 'react'
import getPaginationRange from 'helpers/getPaginationRange';
import styles from './Styles.module.css';

const Pagination = ({pageNum,itemsCount,itemsPerPage,type,title}) => {

    const { minNumber, maxNumber } = getPaginationRange(
        pageNum,
        Math.ceil(itemsCount / itemsPerPage)
    );

    const pages = [];
    for (let i = 1; i <= Math.ceil(itemsCount / itemsPerPage); i++) {
        pages.push(i);
    }

    function onPrevPageClick() {
        window.location.href = `/${type}/${title}/page/${pageNum - 1}`;
    }

    function onNextPageClick() {
        window.location.href = `/${type}/${title}/page/${pageNum + 1}`;
    }

    return (
        <div>
            <ul className={styles.pagination}>
                <button onClick={onPrevPageClick}>prev</button>
                {pages
                .filter((number) => number >= minNumber && number < maxNumber)
                .map((number) => (
                    <li key={number} className={styles.pageItem}>
                        <a
                            href={`/${type}/${title}/page/${number}`}
                            className={number === pageNum ? styles.active : styles.pageLink}
                        >
                            {number}
                        </a>
                    </li>
                ))}
                <button onClick={onNextPageClick}>next</button>
            </ul>
        </div>
    )
}

export default Pagination