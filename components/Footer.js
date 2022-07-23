import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from 'styles/Footer.module.css'
import ContactForm from './ContactForm'

export const Footer = () => {

  const [ navItems, setNavItems ] = useState([])

  useEffect(() => {
      getNavData()
  },[])

  async function getNavData(){
      const res  = await fetch('/api/footer')
      const data = await res.json();
      setNavItems(data)
  }

  return (
    <footer id={styles.footer}>
          <div className={styles.contactFormContainer}>
          <ContactForm/>
          </div>
          <ul className={styles.footerSideMenu}>
              {navItems.map((item,index)=>(
                  <li key={index}>
                      <Link href={'/'+item.post_name}>{item.post_title}</Link>
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