import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'store/hooks';
import styles from './Styles.module.css';
import logo1 from 'styles/images/Logo-img.png';
import logo2 from 'styles/images/Logo-text.png';
import Head from 'next/head';
import { useRouter } from 'next/router';

function Nav() {
  const router = useRouter();
  const { mainMenu, callToActionMenu } = useSelector((state) => state.nav);
  const { locale } = useSelector((state) => state.languages);
  const [pathName, setPathName] = useState('');
  const [bgVisible, setBgVisible] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileDropDownIsVisibile, setMobileDropDownIsVisibile] =
    useState(false);

  // console.log(bgVisible, 'scroll');
  // console.log(isMobileView, 'mobiles');

  useEffect(() => {
    if (locale !== null) {
      let newPathName = window.location.pathname;
      if (window.location.pathname.indexOf(locale) > -1)
        newPathName = window.location.pathname.split(locale)[1];
      setPathName(newPathName);
    }
  }, [locale]);

  useEffect(() => {
    handleScroll();
    handleResize();
    if (typeof window !== 'undefined') {
      handleScroll();
      // setNavbar(window.location.pathname.length <= 1 ? false : true)
      window.addEventListener('scroll', handleScroll);

      handleResize();
      window.addEventListener('resize', handleResize);
    }
  }, [router]);

  function handleScroll() {
    if (typeof window !== 'undefined') {
      if (window.scrollY >= 80) {
        setBgVisible(true);
      } else {
        if (router.pathname !== '' && router.pathname !== '/')
          setBgVisible(true);
        else setBgVisible(false);
      }
    }
  }

  function handleResize() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 844) {
        setIsMobileView(false);
      } else {
        setIsMobileView(true);
      }
    }
  }

  function handleClick() {
    mobileDropDownIsVisibile === false
      ? setMobileDropDownIsVisibile(true)
      : setMobileDropDownIsVisibile(false);
  }
  let mainMenuDisplay = mainMenu.map((item, index) => (
    <li key={Date.now() + index} onClick={handleClick}>
      <Link
        href={
          '/' + (item.link && item.link !== null ? item.link : item.post_name)
        }
      >
        {item.title && item.title !== null ? item.title : item.post_title}
      </Link>
    </li>
  ));

  let callToActionMenuDisplay = callToActionMenu.map((item, index) => (
    <li key={Date.now() + index} onClick={handleClick}>
      <Link
        href={
          '/' + (item.link && item.link !== null ? item.link : item.post_name)
        }
      >
        {item.title && item.title !== null ? item.title : item.post_title}
      </Link>
    </li>
  ));

  let socialmediaMenuDisplay = (
    <div className={styles.socialmediaMenu}>
      <a
        href={'https://www.facebook.com/12juedischestimme'}
        target='_blank'
        rel='noopener noreferrer'
      >
        <svg
          width='30'
          height='30'
          viewBox='0 0 30 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M26.125 2.5H3.875C3.51033 2.5 3.16059 2.64487 2.90273 2.90273C2.64487 3.16059 2.5 3.51033 2.5 3.875V26.125C2.5 26.3056 2.53557 26.4844 2.60467 26.6512C2.67377 26.818 2.77505 26.9696 2.90273 27.0973C3.03041 27.225 3.18199 27.3262 3.34881 27.3953C3.51563 27.4644 3.69443 27.5 3.875 27.5H15.85V17.8125H12.6V14.0625H15.85V11.25C15.7827 10.5897 15.8606 9.92266 16.0784 9.29567C16.2962 8.66868 16.6485 8.09693 17.1106 7.62051C17.5727 7.1441 18.1335 6.77455 18.7535 6.5378C19.3736 6.30104 20.038 6.20281 20.7 6.25C21.6729 6.24401 22.6454 6.2941 23.6125 6.4V9.775H21.625C20.05 9.775 19.75 10.525 19.75 11.6125V14.025H23.5L23.0125 17.775H19.75V27.5H26.125C26.3056 27.5 26.4844 27.4644 26.6512 27.3953C26.818 27.3262 26.9696 27.225 27.0973 27.0973C27.225 26.9696 27.3262 26.818 27.3953 26.6512C27.4644 26.4844 27.5 26.3056 27.5 26.125V3.875C27.5 3.69443 27.4644 3.51563 27.3953 3.34881C27.3262 3.18199 27.225 3.03041 27.0973 2.90273C26.9696 2.77505 26.818 2.67377 26.6512 2.60467C26.4844 2.53557 26.3056 2.5 26.125 2.5V2.5Z' />
        </svg>
      </a>
      <a
        href={'https://twitter.com/JNahost'}
        target='_blank'
        rel='noopener noreferrer'
      >
        <svg
          width='30'
          height='30'
          viewBox='0 0 30 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M15 8.75C13.7639 8.75 12.5555 9.11656 11.5277 9.80331C10.4999 10.4901 9.6988 11.4662 9.22575 12.6082C8.75271 13.7503 8.62893 15.0069 8.87009 16.2193C9.11125 17.4317 9.7065 18.5453 10.5806 19.4194C11.4547 20.2935 12.5683 20.8888 13.7807 21.1299C14.9931 21.3711 16.2497 21.2473 17.3918 20.7742C18.5338 20.3012 19.5099 19.5001 20.1967 18.4723C20.8834 17.4445 21.25 16.2361 21.25 15C21.25 13.3424 20.5915 11.7527 19.4194 10.5806C18.2473 9.40848 16.6576 8.75 15 8.75ZM15 18.75C14.2583 18.75 13.5333 18.5301 12.9166 18.118C12.2999 17.706 11.8193 17.1203 11.5355 16.4351C11.2516 15.7498 11.1774 14.9958 11.3221 14.2684C11.4667 13.541 11.8239 12.8728 12.3483 12.3483C12.8728 11.8239 13.541 11.4667 14.2684 11.3221C14.9958 11.1774 15.7498 11.2516 16.4351 11.5355C17.1203 11.8193 17.706 12.2999 18.118 12.9166C18.5301 13.5333 18.75 14.2583 18.75 15C18.75 15.9946 18.3549 16.9484 17.6517 17.6517C16.9484 18.3549 15.9946 18.75 15 18.75ZM21.25 7.5C21.0028 7.5 20.7611 7.57331 20.5555 7.71066C20.35 7.84801 20.1898 8.04324 20.0951 8.27165C20.0005 8.50005 19.9758 8.75139 20.024 8.99386C20.0723 9.23634 20.1913 9.45907 20.3661 9.63388C20.5409 9.8087 20.7637 9.92775 21.0061 9.97598C21.2486 10.0242 21.4999 9.99946 21.7284 9.90485C21.9568 9.81024 22.152 9.65002 22.2893 9.44446C22.4267 9.2389 22.5 8.99723 22.5 8.75C22.5 8.41848 22.3683 8.10054 22.1339 7.86612C21.8995 7.6317 21.5815 7.5 21.25 7.5ZM27.425 10.3C27.4043 9.23178 27.2014 8.17493 26.825 7.175C26.476 6.26508 25.9395 5.43874 25.2504 4.74962C24.5613 4.06051 23.7349 3.52402 22.825 3.175C21.8251 2.79862 20.7682 2.59571 19.7 2.575C18.4875 2.5 18.0875 2.5 15 2.5C11.9125 2.5 11.5125 2.5 10.3 2.575C9.23178 2.59571 8.17493 2.79862 7.175 3.175C6.26508 3.52402 5.43874 4.06051 4.74962 4.74962C4.06051 5.43874 3.52402 6.26508 3.175 7.175C2.79862 8.17493 2.59571 9.23178 2.575 10.3C2.5 11.525 2.5 11.925 2.5 15C2.5 18.075 2.5 18.475 2.575 19.7C2.59571 20.7682 2.79862 21.8251 3.175 22.825C3.52402 23.7349 4.06051 24.5613 4.74962 25.2504C5.43874 25.9395 6.26508 26.476 7.175 26.825C8.17493 27.2014 9.23178 27.4043 10.3 27.425C11.55 27.425 11.9125 27.5 15 27.5C18.0875 27.5 18.4875 27.5 19.7 27.425C20.7682 27.4043 21.8251 27.2014 22.825 26.825C23.7349 26.476 24.5613 25.9395 25.2504 25.2504C25.9395 24.5613 26.476 23.7349 26.825 22.825C27.2014 21.8251 27.4043 20.7682 27.425 19.7C27.425 18.45 27.5 18.075 27.5 15C27.5 11.925 27.5 11.525 27.425 10.3ZM24.925 19.5875C24.9031 20.3808 24.7554 21.1655 24.4875 21.9125C24.266 22.5029 23.9159 23.0367 23.4625 23.475C23.0268 23.9286 22.492 24.2751 21.9 24.4875C21.1513 24.7664 20.3613 24.9185 19.5625 24.9375C18.3875 24.9375 18.025 25 14.9875 25C11.95 25 11.6 25 10.425 25C9.62752 24.9794 8.83844 24.8317 8.0875 24.5625C7.49707 24.341 6.96334 23.9909 6.525 23.5375C6.07144 23.1018 5.7249 22.567 5.5125 21.975C5.23476 21.2303 5.08269 20.4446 5.0625 19.65C5.0625 18.4 5.0625 18.0875 5.0625 15.0625C5.0625 12.0375 5.0625 11.675 5.0625 10.475C5.08405 9.67651 5.23605 8.88692 5.5125 8.1375C5.7282 7.55079 6.07442 7.02078 6.525 6.5875C6.96072 6.13394 7.49551 5.7874 8.0875 5.575C8.83624 5.29612 9.62624 5.14403 10.425 5.125C11.6 5 11.9625 5 15 5C18.0375 5 18.4 5 19.575 5C20.3777 5.02041 21.1716 5.17243 21.925 5.45C22.5117 5.6657 23.0417 6.01192 23.475 6.4625C23.9286 6.89822 24.2751 7.43301 24.4875 8.025C24.7935 8.7857 24.9668 9.59323 25 10.4125C25 11.6625 25.0625 11.975 25.0625 15C25.0625 18.025 25 18.3875 25 19.5875H24.925Z' />
        </svg>
      </a>

      <a
        href={'https://www.instagram.com/juedischestimme/'}
        target='_blank'
        rel='noopener noreferrer'
      >
        <svg
          width='30'
          height='30'
          viewBox='0 0 30 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M28.739 4.93776C28.7392 4.71697 28.6808 4.50008 28.5699 4.30919C28.4589 4.1183 28.2994 3.96022 28.1074 3.85105C27.9155 3.74188 27.6981 3.68552 27.4773 3.68771C27.2566 3.68991 27.0403 3.75057 26.8506 3.86353C26.119 4.29901 25.3313 4.63251 24.5093 4.85478C23.3356 3.84757 21.8385 3.29641 20.2918 3.30204C18.5951 3.304 16.9655 3.96529 15.7471 5.14627C14.5288 6.32726 13.8171 7.9355 13.7623 9.63139C10.4173 9.09797 7.3856 7.35205 5.24537 4.72657C5.11642 4.57011 4.95173 4.44696 4.7652 4.3675C4.57867 4.28804 4.37576 4.2546 4.1736 4.27001C3.97155 4.28664 3.77659 4.35225 3.60559 4.46115C3.43458 4.57004 3.29268 4.71896 3.19215 4.89501C2.67656 5.79477 2.38044 6.80345 2.32783 7.83914C2.27523 8.87483 2.46763 9.90832 2.88941 10.8557L2.88697 10.8581C2.6974 10.9749 2.54096 11.1383 2.4326 11.3328C2.32425 11.5273 2.2676 11.7463 2.26807 11.969C2.26578 12.1526 2.27679 12.3362 2.30103 12.5183C2.42871 14.0911 3.12576 15.5634 4.26148 16.6589C4.18444 16.8057 4.13742 16.9664 4.12316 17.1315C4.10891 17.2967 4.12771 17.463 4.17847 17.6208C4.67362 19.1635 5.7266 20.4659 7.13136 21.2732C5.70416 21.8251 4.16313 22.0175 2.64405 21.8335C2.36289 21.7982 2.07808 21.8595 1.83636 22.0074C1.59463 22.1552 1.41033 22.3809 1.31369 22.6472C1.21705 22.9136 1.21381 23.2049 1.3045 23.4734C1.39519 23.7419 1.57442 23.9715 1.8128 24.1247C4.42542 25.8074 7.46739 26.7021 10.575 26.7017C14.0991 26.7413 17.5375 25.6152 20.3553 23.4985C23.1731 21.3818 25.2125 18.3931 26.156 14.9975C26.5973 13.5183 26.8227 11.9831 26.825 10.4395C26.825 10.3577 26.825 10.2734 26.8238 10.1892C27.4764 9.48538 27.982 8.65835 28.3109 7.75659C28.6397 6.85483 28.7853 5.8965 28.739 4.93776ZM24.6057 8.95264C24.3993 9.19683 24.2948 9.51114 24.314 9.83033C24.3262 10.0366 24.325 10.2441 24.325 10.4395C24.3224 11.7439 24.1312 13.0411 23.7573 14.2908C22.9867 17.18 21.2688 19.7271 18.8787 21.524C16.4886 23.321 13.5646 24.2639 10.575 24.2017C9.50111 24.202 8.43091 24.0758 7.38654 23.8257C8.7183 23.3965 9.96352 22.7348 11.0645 21.8713C11.2673 21.7117 11.4157 21.4932 11.4894 21.2458C11.563 20.9985 11.5584 20.7344 11.476 20.4898C11.3936 20.2452 11.2375 20.0321 11.0292 19.8797C10.8209 19.7273 10.5706 19.6431 10.3125 19.6387C9.27355 19.6225 8.28142 19.2037 7.54517 18.4705C7.73195 18.4351 7.9175 18.3911 8.10182 18.3386C8.37184 18.2618 8.60813 18.0963 8.77265 17.8688C8.93717 17.6413 9.02035 17.3651 9.00879 17.0846C8.99723 16.8041 8.89161 16.5356 8.70893 16.3225C8.52625 16.1093 8.27714 15.9638 8.00172 15.9094C7.39864 15.7903 6.83115 15.5338 6.34337 15.1597C5.85558 14.7856 5.46063 14.304 5.18922 13.7524C5.41513 13.7833 5.64249 13.8024 5.87037 13.8098C6.1411 13.8139 6.40612 13.7318 6.62709 13.5753C6.84807 13.4189 7.01356 13.1962 7.09962 12.9395C7.1821 12.6804 7.17785 12.4015 7.08753 12.1451C6.99722 11.8887 6.82575 11.6687 6.59913 11.5186C6.04932 11.1523 5.59894 10.6553 5.28833 10.0723C4.97772 9.48917 4.81658 8.83815 4.81935 8.17751C4.81935 8.09451 4.82178 8.01149 4.82667 7.92971C7.62825 10.5425 11.2621 12.0828 15.0879 12.2791C15.281 12.2867 15.4734 12.2503 15.6504 12.1727C15.8274 12.0951 15.9844 11.9783 16.1097 11.8311C16.2336 11.6824 16.3214 11.5071 16.3661 11.3188C16.4108 11.1305 16.4111 10.9343 16.3672 10.7459C16.2957 10.4476 16.2592 10.142 16.2585 9.83522C16.2597 8.76589 16.685 7.74068 17.4411 6.98455C18.1972 6.22842 19.2224 5.80314 20.2918 5.80201C20.8419 5.80053 21.3864 5.91313 21.8909 6.13269C22.3953 6.35225 22.8488 6.67401 23.2227 7.07764C23.3668 7.23275 23.5483 7.34839 23.7498 7.41356C23.9513 7.47874 24.1661 7.49129 24.3738 7.45001C24.8872 7.35008 25.3934 7.2155 25.8887 7.04718C25.5508 7.7384 25.1191 8.37962 24.6057 8.95264Z' />
        </svg>
      </a>
    </div>
  );

  let mobileMenuDisplay;
  if (mobileDropDownIsVisibile === true) {
    mobileMenuDisplay = (
      <>
        <ul>{mainMenuDisplay}</ul>
        <ul>{callToActionMenuDisplay}</ul>
        {socialmediaMenuDisplay}
      </>
    );
  }

  let menuDisplay;
  if (isMobileView === false) {
    menuDisplay = (
      <React.Fragment>
        <div className={styles.topRow}>
          <div className={styles.leftCol}>
            <ul>{callToActionMenuDisplay}</ul>
          </div>
          <Link href={'/'}>
            <div className={styles.middleCol}>
              <Image src={logo1} title='home' alt='home-logo' />
              <Image src={logo2} title='home' alt='home-logo' />
            </div>
          </Link>
          <div className={styles.rightCol}>
            {socialmediaMenuDisplay}
            <div className={styles.languageMenu}>
              <a href={`${pathName}`}>DE</a>
              <b> | </b>
              <a href={`/en_US${pathName}`} data-testid='english-button'>
                EN
              </a>
            </div>
          </div>
        </div>
        <div className={styles.bottomRow}>
          <ul>{mainMenuDisplay}</ul>
        </div>
      </React.Fragment>
    );
  } else {
    menuDisplay = (
      <React.Fragment>
        <div className={styles.mobileNav}>
          <Link href={'/'}>
            <div className={styles.leftCol}>
              <Image src={logo1} title='home' alt='home-logo' />
              <Image src={logo2} title='home' alt='home-logo' />
            </div>
          </Link>
          <div className={styles.rightCol}>
            <div className={styles.languageMenu}>
              <a href={`${pathName}`}>DE</a>
              <b> | </b>
              <a href={`/en_US${pathName}`} data-testid='english-button'>
                EN
              </a>
            </div>

            <svg
              width='30'
              height='30'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              onClick={handleClick}
            >
              <path
                d='M20 11H4C3.4 11 3 11.4 3 12C3 12.6 3.4 13 4 13H20C20.6 13 21 12.6 21 12C21 11.4 20.6 11 20 11ZM4 8H20C20.6 8 21 7.6 21 7C21 6.4 20.6 6 20 6H4C3.4 6 3 6.4 3 7C3 7.6 3.4 8 4 8ZM20 16H4C3.4 16 3 16.4 3 17C3 17.6 3.4 18 4 18H20C20.6 18 21 17.6 21 17C21 16.4 20.6 16 20 16Z'
                fill='black'
              />
            </svg>
          </div>
        </div>
        <div
          className={
            mobileDropDownIsVisibile === true
              ? styles.mobileMenu + ' ' + styles.mobileMenuOpen
              : styles.mobileMenu + ' ' + styles.mobileMenuClose
          }
        >
          {mobileMenuDisplay}
        </div>
      </React.Fragment>
    );
  }

  return (
    <nav
      data-testid='nav'
      className={bgVisible === true ? styles.navActive : styles.nav}
    >
      <Head>
        <div>
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
        </div>
      </Head>
      {menuDisplay}
    </nav>
  );
}

export default Nav;
