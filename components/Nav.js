import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'styles/Nav.module.css';

function Nav() {
  const { items } = useSelector((state) => state.nav);

  let menuDisplay = items.map((item, index) => (
    <li
      className={
        item.taxonomy === 'main_menu'
          ? styles.mainMenu
          : styles.callToActionMenu
      }
      key={Date.now() + index}
    >
      <Link
        href={
          '/' + (item.link && item.link !== null ? item.link : item.post_name)
        }
      >
        {item.title && item.title !== null ? item.title : item.post_title}
      </Link>
    </li>
  ));

  return (
    <nav className={styles.nav}>
      <div className={styles.topContainer}>
        <Link href={'/'}>
          <div className={styles.logoContainer}>
            <img style={{ height: '50px' }} src='Logo-img.png' />{' '}
            <img style={{ height: '50px' }} src='Logo-text.png' />
          </div>
        </Link>
        <div className={styles.buttonContainer}>{menuDisplay}</div>
        <div>socialmedoa</div>
      </div>
      <div className={styles.bottomContainer}>{menuDisplay}</div>
    </nav>
  );
}

export default Nav;
