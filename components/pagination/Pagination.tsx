import React from 'react'
import getPaginationRange from 'helpers/getPaginationRange';
import styles from './Styles.module.css';

const Pagination = ({pageNum,itemsCount,itemsPerPage,type,title}) => {

    const totalPages = Math.ceil(itemsCount / itemsPerPage)

    const { minNumber, maxNumber } = getPaginationRange(
        pageNum,
        totalPages
    );

    const pages = [];
    for (let i = 1; i <= Math.ceil(itemsCount / itemsPerPage); i++) {
        pages.push(i);
    }

    function onFirstPageClick(){
        window.location.href = `/${type}/${title}/page/1`;
    }

    function onPrevPageClick() {
        window.location.href = `/${type}/${title}/page/${pageNum - 1}`;
    }

    function onNextPageClick() {
        window.location.href = `/${type}/${title}/page/${pageNum + 1}`;
    }

    function onLastPageClick() {
        window.location.href = `/${type}/${title}/page/${totalPages - 1}`;
    }


    return (
        <div>
            <ul className={styles.pagination}>
                <button onClick={onFirstPageClick}>first</button>
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
                <button onClick={onLastPageClick}>last</button>
            </ul>
        </div>
    )
}

export default Pagination