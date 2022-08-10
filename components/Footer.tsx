import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from 'styles/Footer.module.css';
import ContactForm from './ContactForm';
import { useSelector } from 'store/hooks';
import { useRouter } from 'next/router';
import JewishVoiceForPeace from 'public/Jewish-voice-for-peace.svg';
export const Footer = () => {
  const { footerMenu } = useSelector((state) => state.nav);
  const router = useRouter();

  function logout() {
    sessionStorage.removeItem('Token');
    router.push('/login');
  }

  return (
    <footer id={styles.footer}>
      <div className={styles.footerTopMenu}>
        <div className={styles.contactFormContainer}>
          <ContactForm />
        </div>
        <div className={styles.vl}></div>
        <div className={styles.footerSideMenu}>
          <div className={styles.footerMenuContent}>
            <div className={styles.label}>Unsere partner & freunde</div>
            <div className={styles.imgContainer}>
              <a
                href='https://www.jewishvoiceforpeace.org/p'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src='./Jewish-voice-for-peace.svg' />
              </a>
              <a
                href='https://www.palaestinaspricht.de/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src='./Palästina-spricht.svg' />
              </a>
            </div>
          </div>
          <div className={styles.footerMenuContent}>
            <div className={styles.label}>Kontakt</div>{' '}
            <p>mail@juedische-stimme.de</p>
          </div>
          <div className={styles.footerMenuContent}>
            <div className={styles.label}>
              <Link href='/impressum'>Impressum</Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottomMenu}>
        <button onClick={logout}>Logout</button>
        copyright © 2022 JÜDISCHE STIMME für gerechten frieden in nahost, berlin
        seit 2007. Privacy Policy Terms of Use
      </div>
    </footer>
  );
};

export default Footer;
