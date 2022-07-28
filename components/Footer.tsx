import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from 'styles/Footer.module.css'
import ContactForm from './ContactForm'
import { useSelector } from 'store/hooks'

export const Footer = () => {
  const { footerMenu } = useSelector(state => state.nav)
  return (
    <footer id={styles.footer}>
          <div className={styles.contactFormContainer}>
          <ContactForm/>
          </div>
          <ul className={styles.footerSideMenu}>
              {footerMenu.map((item,index)=> (
                    <li key={Date.now() + index}>
                        <Link href={'/'+ (item.link && item.link !== null ? item.link : item.post_name)}>
                            {item.title && item.title !== null ? item.title : item.post_title}
                        </Link>
                    </li>
              ))}
          </ul>
          <div className={styles.footerBottomMenu}>
            BOTTOM MENU!!
          </div>
    </footer>
  )
}

export default Footer;