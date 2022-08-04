import React from 'react';
import Image from 'next/image';
import backgroundImage from 'styles/images/call-to-action.jpg';
import styles from 'styles/CallToAction.module.css';

const CallToAction = () => {
  return (
    <div className={styles.ctaPage}>
      <Image src={backgroundImage} className={styles.backgroundImage} />
      <div className={styles.ctaContainer}>
        <div className={styles.cta}></div>
        <div className={styles.cta}></div>
        <div className={styles.cta}></div>
      </div>
    </div>
  );
};

export default CallToAction;
