import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "store/hooks";
import styles from "./Styles.module.css";
import logo1 from "styles/images/Logo-img.png";
import logo2 from "styles/images/Logo-text.png";
import Head from "next/head";
import { useRouter } from "next/router";
import YoutubeLink from "../socialmediaLinks/youtubeLink";
import InstagramLink from "../socialmediaLinks/instagramLink";
import TwitterLink from "../socialmediaLinks/TwitterLink";
import FacebookLink from "../socialmediaLinks/FacebookLink";
import { IconButton, Typography } from "@mui/material";

function Nav() {
  const router = useRouter();

  const { mainMenu, callToActionMenu } = useSelector((state) => state.nav);
  const { locale } = useSelector((state) => state.languages);
  const { headerGallery } = useSelector((state) => state.galleries);
  const events = useSelector((state) => state.fbData.events);

  const imageSrcs =
    headerGallery?.imageSrcs.indexOf(",") > -1
      ? headerGallery.imageSrcs.split(",")
      : [headerGallery?.imageSrcs];

  const [isSlideShowGallery, setIsSlideShowGallery] = useState(
    imageSrcs.length > 1 ? true : false
  );

  useEffect(() => {
    const imageSrcs =
      headerGallery?.imageSrcs.indexOf(",") > -1
        ? headerGallery.imageSrcs.split(",")
        : [headerGallery?.imageSrcs];
    setIsSlideShowGallery(imageSrcs.length > 1 ? true : false);
  }, [headerGallery]);

  useEffect(() => {
    setBgVisible(!!isSlideShowGallery);
  }, [isSlideShowGallery]);

  const [pathName, setPathName] = useState("");
  const [bgVisible, setBgVisible] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileDropDownIsVisibile, setMobileDropDownIsVisibile] =
    useState(false);
  const [upcomingEvents, setUpcomingEvents] = React.useState(
    !!events && JSON.parse(events?.content).length > 0
  );

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
    if (typeof window !== "undefined") {
      handleScroll();
      // setNavbar(window.location.pathname.length <= 1 ? false : true)
      window.addEventListener("scroll", handleScroll);

      handleResize();
      window.addEventListener("resize", handleResize);
    }
  }, [router]);

  function handleScroll() {
    if (typeof window !== "undefined" && isSlideShowGallery === false) {
      if (window.scrollY >= 180) {
        setBgVisible(true);
      } else {
        if (router.pathname !== "" && router.pathname !== "/")
          setBgVisible(true);
        else setBgVisible(false);
      }
    } else {
      setBgVisible(true);
    }
  }

  function handleResize() {
    if (typeof window !== "undefined") {
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

  const filteredMenu = !upcomingEvents
    ? mainMenu.filter((item) => item.term_id !== 86)
    : mainMenu;

  let mainMenuDisplay = filteredMenu.map((item, index) => {
    return (
      <li
        key={Date.now() + index}
        onClick={handleClick}
        className={styles.navItem}
      >
        <Link
          href={
            "/" + (item.link && item.link !== null ? item.link : item.post_name)
          }
        >
          {locale === "en_US" && item.title_en_US
            ? item.title_en_US
            : item.title}
        </Link>
      </li>
    );
  });

  let callToActionMenuDisplay = callToActionMenu.map((item, index) => (
    <li
      key={Date.now() + index}
      onClick={handleClick}
    >
      <Link
        href={
          "/" + (item.link && item.link !== null ? item.link : item.post_name)
        }
      >
        {locale === "en_US" && item.title_en_US ? item.title_en_US : item.title}
      </Link>
    </li>
  ));

  let socialmediaMenuDisplay = (
    <div className={styles.socialmediaMenu}>
      <YoutubeLink color={bgVisible ? "primary" : "#fff"} />
      <FacebookLink color={bgVisible ? "primary" : "#fff"} />
      <InstagramLink color={bgVisible ? "primary" : "#fff"} />
      <TwitterLink color={bgVisible ? "primary" : "#fff"} />
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
          <Link href={"/"}>
            <div className={styles.middleCol}>
              <Image
                src={logo1}
                title="home"
                alt="home-logo"
              />
              <Image
                src={logo2}
                title="home"
                alt="home-logo"
              />
            </div>
          </Link>

          <div className={styles.rightCol}>{socialmediaMenuDisplay}</div>
        </div>
        <div className={styles.bottomRow}>
          <ul>{mainMenuDisplay}</ul>
          <div className={styles.languageMenu}>
            <IconButton
              href={`https://www.juedische-stimme.de${router.asPath}`}
            >
              <Typography
                sx={{
                  fontSize: "18px !important",
                  fontWeight: locale === "de_DE" ? 600 : 400,
                }}
              >
                DE
              </Typography>
            </IconButton>
            <Typography> | </Typography>
            <IconButton
              href={`https://www.juedische-stimme.com${router.asPath}`}
              data-testid="english-button"
            >
              <Typography
                sx={{
                  fontSize: "18px !important",
                  fontWeight: locale === "de_EN" ? 600 : 400,
                }}
              >
                EN
              </Typography>
            </IconButton>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    menuDisplay = (
      <React.Fragment>
        <div className={styles.mobileNav}>
          <Link href={"/"}>
            <div className={styles.leftCol}>
              <Image
                src={logo1}
                title="home"
                alt="home-logo"
              />
              <Image
                src={logo2}
                title="home"
                alt="home-logo"
              />
            </div>
          </Link>
          <div className={styles.rightCol}>
            <div className={styles.languageMenu}>
              <a href={`https://www.juedische-stimme.de${router.asPath}`}>DE</a>
              <span> | </span>
              <a
                href={`https://www.juedische-stimme.com${router.asPath}`}
                data-testid="english-button"
              >
                EN
              </a>
            </div>

            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleClick}
            >
              <path
                d="M20 11H4C3.4 11 3 11.4 3 12C3 12.6 3.4 13 4 13H20C20.6 13 21 12.6 21 12C21 11.4 20.6 11 20 11ZM4 8H20C20.6 8 21 7.6 21 7C21 6.4 20.6 6 20 6H4C3.4 6 3 6.4 3 7C3 7.6 3.4 8 4 8ZM20 16H4C3.4 16 3 16.4 3 17C3 17.6 3.4 18 4 18H20C20.6 18 21 17.6 21 17C21 16.4 20.6 16 20 16Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <div
          className={
            mobileDropDownIsVisibile === true
              ? styles.mobileMenu + " " + styles.mobileMenuOpen
              : styles.mobileMenu + " " + styles.mobileMenuClose
          }
        >
          {mobileMenuDisplay}
        </div>
      </React.Fragment>
    );
  }

  return (
    <nav
      data-testid="nav"
      className={!!bgVisible ? styles.navActive : styles.nav}
    >
      <Head>
        <div>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="manifest"
            href="/site.webmanifest"
          />
        </div>
      </Head>
      {menuDisplay}
    </nav>
  );
}

export default Nav;
