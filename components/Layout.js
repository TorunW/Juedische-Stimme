import { useEffect } from 'react';
import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

function Layout({ children }) {
  useEffect(() => {
    var s = document.createElement('script');
    s.setAttribute('data-account', 'a9ZRfATQg4');
    s.setAttribute('src', 'https://cdn.userway.org/widget.js');
    (document.body || document.head).appendChild(s);
  }, []);

  return (
    <div id="main-layout">
      <Nav />
      {children}
      <Footer/>
    </div>
  );
}

export default Layout;
