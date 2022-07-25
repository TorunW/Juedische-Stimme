import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'styles/Nav.module.css';

function Nav() {
  const { items } = useSelector((state) => state.nav);

  return (
    <nav className={styles.nav}>
      <div className={styles.topContainer}>
        <Link href={'/'}>Home</Link>
        <div>Call to action button</div>
      </div>
      <div className={styles.bottomContainer}>
      {items.map((item,index)=> (
                    <li key={Date.now() + index}>
                        <Link href={'/'+ (item.link && item.link !== null ? item.link : item.post_name)}>
                            {item.title && item.title !== null ? item.title : item.post_title}
                        </Link>
                    </li>
                ))}
      </div>
    </nav>
  );
}

export default Nav;
