import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import wideBackgroundImage from 'styles/images/call-to-action.jpg';
import smallBackgroundImage from 'styles/images/call-to-action-small.jpg';
import styles from './Styles.module.css';
import NewsletterForm from '../forms/NewsletterForm';
import Link from 'next/link';

// import backgroundImage from 'styles/images/test.jpg';

const CallToAction = () => {
  const [isShown, setIsShown] = useState(false);
  const [isBigScreen, setIsBigScreen] = useState(true);

  useEffect(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
  }, []);

  function handleClick() {
    if (isShown === false) {
      setIsShown(true);
    } else {
      setIsShown(false);
    }
  }

  function updateScreenSize() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 830) {
        setIsBigScreen(true);
      } else {
        setIsBigScreen(false);
      }
    }
  }

  return (
    <section className={styles.ctaPage}>
      <div className={styles.imgWrapper}>
        <Image
          src={
            isBigScreen === true ? wideBackgroundImage : smallBackgroundImage
          }
          className={styles.backgroundImage}
        />
        <div className={styles.boxContainer}>
          <div className={styles.cta}>
            <svg
              width='134'
              height='134'
              viewBox='0 0 134 134'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {/* <g id='Users / users'>
                <g id='Vector' filter='url(#filter0_d_221_76)'> */}
              <path
                d='M68.6749 68.2282C71.6541 65.6494 74.0436 62.4599 75.6813 58.8762C77.319 55.2925 78.1666 51.3984 78.1666 47.4582C78.1666 40.0542 75.2254 32.9535 69.99 27.7181C64.7546 22.4827 57.6539 19.5415 50.2499 19.5415C42.846 19.5415 35.7452 22.4827 30.5099 27.7181C25.2745 32.9535 22.3333 40.0542 22.3333 47.4582C22.3332 51.3984 23.1808 55.2925 24.8185 58.8762C26.4563 62.4599 28.8458 65.6494 31.8249 68.2282C24.009 71.7674 17.3779 77.4827 12.7242 84.6909C8.0706 91.899 5.59147 100.295 5.58325 108.875C5.58325 110.356 6.17149 111.776 7.21857 112.823C8.26565 113.87 9.68579 114.458 11.1666 114.458C12.6474 114.458 14.0675 113.87 15.1146 112.823C16.1617 111.776 16.7499 110.356 16.7499 108.875C16.7499 99.9901 20.2794 91.4692 26.5618 85.1868C32.8443 78.9043 41.3652 75.3748 50.2499 75.3748C59.1347 75.3748 67.6555 78.9043 73.938 85.1868C80.2205 91.4692 83.7499 99.9901 83.7499 108.875C83.7499 110.356 84.3382 111.776 85.3852 112.823C86.4323 113.87 87.8525 114.458 89.3333 114.458C90.814 114.458 92.2342 113.87 93.2813 112.823C94.3283 111.776 94.9166 110.356 94.9166 108.875C94.9084 100.295 92.4292 91.899 87.7756 84.6909C83.122 77.4827 76.4908 71.7674 68.6749 68.2282V68.2282ZM50.2499 64.2082C46.9371 64.2082 43.6986 63.2258 40.9441 61.3853C38.1896 59.5448 36.0427 56.9288 34.7749 53.8681C33.5072 50.8075 33.1755 47.4396 33.8218 44.1904C34.4681 40.9412 36.0634 37.9567 38.4059 35.6141C40.7484 33.2716 43.733 31.6763 46.9822 31.03C50.2313 30.3837 53.5992 30.7154 56.6599 31.9832C59.7205 33.251 62.3365 35.3978 64.177 38.1524C66.0175 40.9069 66.9999 44.1453 66.9999 47.4582C66.9999 51.9005 65.2352 56.161 62.094 59.3022C58.9527 62.4434 54.6923 64.2082 50.2499 64.2082ZM104.632 65.9948C108.205 61.9711 110.539 57.0004 111.353 51.6811C112.167 46.3617 111.426 40.9205 109.22 36.0123C107.013 31.1042 103.436 26.9383 98.9169 24.0161C94.3982 21.0939 89.1312 19.5401 83.7499 19.5415C82.2691 19.5415 80.849 20.1297 79.8019 21.1768C78.7548 22.2239 78.1666 23.644 78.1666 25.1248C78.1666 26.6056 78.7548 28.0258 79.8019 29.0728C80.849 30.1199 82.2691 30.7082 83.7499 30.7082C88.1923 30.7082 92.4527 32.4729 95.594 35.6141C98.7352 38.7554 100.5 43.0158 100.5 47.4582C100.492 50.3908 99.7143 53.2699 98.2446 55.8076C96.7749 58.3453 94.6646 60.4527 92.1249 61.919C91.2971 62.3965 90.6057 63.0785 90.117 63.8996C89.6282 64.7208 89.3583 65.6537 89.3333 66.609C89.3099 67.5568 89.5283 68.495 89.9679 69.3351C90.4074 70.1752 91.0537 70.8895 91.8458 71.4107L94.0233 72.8623L94.7491 73.2532C101.479 76.4453 107.157 81.4941 111.114 87.8051C115.07 94.1161 117.141 101.426 117.082 108.875C117.082 110.356 117.671 111.776 118.718 112.823C119.765 113.87 121.185 114.458 122.666 114.458C124.147 114.458 125.567 113.87 126.614 112.823C127.661 111.776 128.249 110.356 128.249 108.875C128.295 100.307 126.149 91.8694 122.015 84.3643C117.881 76.8593 111.897 70.5358 104.632 65.9948V65.9948Z'
                fill='white'
              />
              {/* </g>
              </g> */}
              {/* <defs>
                <filter
                  id='filter0_d_221_76'
                  x='1.58325'
                  y='19.5415'
                  width='130.667'
                  height='102.917'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'
                >
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feColorMatrix
                    in='SourceAlpha'
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                    result='hardAlpha'
                  />
                  <feOffset dy='4' />
                  <feGaussianBlur stdDeviation='2' />
                  <feComposite in2='hardAlpha' operator='out' />
                  <feColorMatrix
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                  />
                  <feBlend
                    mode='normal'
                    in2='BackgroundImageFix'
                    result='effect1_dropShadow_221_76'
                  />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='effect1_dropShadow_221_76'
                    result='shape'
                  />
                </filter>
              </defs> */}
            </svg>
            <Link href='/mitgliedsantrag'>
              <a></a>
            </Link>
            <h4>Mitglied werden</h4>

            <p>
              Bring deine Interessen und Talente ein! Werde Teil der weltweiten
              Bewegung!
            </p>
          </div>
          <div className={styles.cta}>
            <Link href='/hilf-uns'>
              <a></a>
            </Link>
            <svg
              width='134'
              height='134'
              viewBox='0 0 134 134'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {/* <g id='Shopping / gift'>
                <g id='Vector' filter='url(#filter0_d_221_78)'> */}
              <path
                d='M100.5 39.0832H98.5458C99.82 36.4745 100.488 33.6115 100.5 30.7082C100.517 26.8184 99.3693 23.0126 97.2048 19.7807C95.0403 16.5487 91.9581 14.0385 88.3548 12.5732C84.7516 11.1079 80.7922 10.7545 76.9865 11.5585C73.1807 12.3626 69.7026 14.2873 67 17.0849C64.2974 14.2873 60.8193 12.3626 57.0135 11.5585C53.2078 10.7545 49.2484 11.1079 45.6452 12.5732C42.0419 14.0385 38.9597 16.5487 36.7952 19.7807C34.6308 23.0126 33.4831 26.8184 33.5 30.7082C33.5119 33.6115 34.18 36.4745 35.4542 39.0832H43.5C29.0576 39.0832 24.7972 40.8479 21.656 43.9892C18.5147 47.1304 16.75 51.3908 16.75 55.8332V66.9999C16.75 68.4807 17.3382 69.9008 18.3853 70.9479C19.4324 71.9949 20.8525 72.5832 22.3333 72.5832H27.9167V106.083C27.9167 110.526 29.6814 114.786 32.8226 117.927C35.9639 121.068 40.2243 122.833 44.6667 122.833H89.3333C93.7757 122.833 98.0361 121.068 101.177 117.927C104.319 114.786 106.083 110.526 106.083 106.083V72.5832H111.667C113.147 72.5832 114.568 71.9949 115.615 70.9479C116.662 69.9008 117.25 68.4807 117.25 66.9999V55.8332C117.25 51.3908 115.485 47.1304 112.344 43.9892C109.203 40.8479 104.942 39.0832 100.5 39.0832ZM61.4167 111.667H44.6667C43.1859 111.667 41.7657 111.078 40.7187 110.031C39.6716 108.984 39.0833 107.564 39.0833 106.083V72.5832H61.4167V111.667ZM61.4167 61.4165H27.9167V55.8332C27.9167 54.3524 28.5049 52.9323 29.552 51.8852C30.5991 50.8381 32.0192 50.2499 33.5 50.2499H61.4167V61.4165ZM61.4167 39.0832H53.0417C51.3853 39.0832 49.766 38.592 48.3888 37.6718C47.0115 36.7515 45.9381 35.4435 45.3042 33.9132C44.6703 32.3828 44.5044 30.6989 44.8276 29.0743C45.1507 27.4497 45.9484 25.9574 47.1196 24.7862C48.2909 23.6149 49.7832 22.8173 51.4078 22.4941C53.0324 22.171 54.7163 22.3368 56.2466 22.9707C57.777 23.6046 59.085 24.678 60.0052 26.0553C60.9255 27.4326 61.4167 29.0518 61.4167 30.7082V39.0832ZM72.5833 30.7082C72.5833 29.0518 73.0745 27.4326 73.9948 26.0553C74.915 24.678 76.223 23.6046 77.7534 22.9707C79.2837 22.3368 80.9676 22.171 82.5922 22.4941C84.2168 22.8173 85.7091 23.6149 86.8804 24.7862C88.0516 25.9574 88.8493 27.4497 89.1724 29.0743C89.4956 30.6989 89.3297 32.3828 88.6958 33.9132C88.0619 35.4435 86.9885 36.7515 85.6112 37.6718C84.234 38.592 82.6148 39.0832 80.9583 39.0832H72.5833V30.7082ZM94.9167 106.083C94.9167 107.564 94.3284 108.984 93.2813 110.031C92.2343 111.078 90.8141 111.667 89.3333 111.667H72.5833V72.5832H94.9167V106.083ZM106.083 61.4165H72.5833V50.2499H100.5C101.981 50.2499 103.401 50.8381 104.448 51.8852C105.495 52.9323 106.083 54.3524 106.083 55.8332V61.4165Z'
                fill='white'
              />
              {/* </g>
              </g> */}
              {/* <defs>
                <filter
                  id='filter0_d_221_78'
                  x='12.75'
                  y='11.1377'
                  width='108.5'
                  height='119.695'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'
                >
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feColorMatrix
                    in='SourceAlpha'
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                    result='hardAlpha'
                  />
                  <feOffset dy='4' />
                  <feGaussianBlur stdDeviation='2' />
                  <feComposite in2='hardAlpha' operator='out' />
                  <feColorMatrix
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                  />
                  <feBlend
                    mode='normal'
                    in2='BackgroundImageFix'
                    result='effect1_dropShadow_221_78'
                  />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='effect1_dropShadow_221_78'
                    result='shape'
                  />
                </filter>
              </defs> */}
            </svg>
            <h4>Spenden</h4>
            <p>
              Deine Spende hilt uns, die Menschenrechte weltweit zu verteidigen!
            </p>
          </div>
          <div
            data-testid='newsletter-button-container'
            className={styles.cta}
            onClick={handleClick}
          >
            <svg
              width='134'
              height='134'
              viewBox='0 0 134 134'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {/* <g id='Communication / message'>
                <g id='Vector' filter='url(#filter0_d_214_155)'> */}
              <path
                d='M106.083 22.3335H27.9165C23.4741 22.3335 19.2137 24.0982 16.0725 27.2395C12.9312 30.3807 11.1665 34.6411 11.1665 39.0835V94.9168C11.1665 99.3592 12.9312 103.62 16.0725 106.761C19.2137 109.902 23.4741 111.667 27.9165 111.667H106.083C110.526 111.667 114.786 109.902 117.927 106.761C121.068 103.62 122.833 99.3592 122.833 94.9168V39.0835C122.833 34.6411 121.068 30.3807 117.927 27.2395C114.786 24.0982 110.526 22.3335 106.083 22.3335ZM27.9165 33.5002H106.083C107.564 33.5002 108.984 34.0884 110.031 35.1355C111.078 36.1826 111.667 37.6027 111.667 39.0835L66.9998 66.3302L22.3332 39.0835C22.3332 37.6027 22.9214 36.1826 23.9685 35.1355C25.0156 34.0884 26.4357 33.5002 27.9165 33.5002ZM111.667 94.9168C111.667 96.3976 111.078 97.8178 110.031 98.8648C108.984 99.9119 107.564 100.5 106.083 100.5H27.9165C26.4357 100.5 25.0156 99.9119 23.9685 98.8648C22.9214 97.8178 22.3332 96.3976 22.3332 94.9168V51.8135L64.0965 77.3293C64.9453 77.8194 65.9081 78.0774 66.8882 78.0774C67.8682 78.0774 68.8311 77.8194 69.6798 77.3293L111.667 51.8135V94.9168Z'
                fill='white'
              />
              {/* </g>
              </g> */}
              {/* <defs>
                <filter
                  id='filter0_d_214_155'
                  x='7.1665'
                  y='22.3335'
                  width='119.667'
                  height='97.3335'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'
                >
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feColorMatrix
                    in='SourceAlpha'
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                    result='hardAlpha'
                  />
                  <feOffset dy='4' />
                  <feGaussianBlur stdDeviation='2' />
                  <feComposite in2='hardAlpha' operator='out' />
                  <feColorMatrix
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                  />
                  <feBlend
                    mode='normal'
                    in2='BackgroundImageFix'
                    result='effect1_dropShadow_214_155'
                  />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='effect1_dropShadow_214_155'
                    result='shape'
                  />
                </filter>
              </defs> */}
            </svg>

            <h4>Newsletter</h4>
            <p>
              Bleib auf dem Laufenden und mach dich für die Menschenrchte stark!
            </p>
          </div>
        </div>
      </div>
      <div
        data-testid='newsletter-form'
        className={
          styles.drawer + (isShown === true ? ' ' + styles.visible : '')
        }
      >
        <NewsletterForm />
      </div>
    </section>
  );
};

export default CallToAction;
