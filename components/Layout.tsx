import React from 'react';
import Nav from './nav/Nav';
import Footer from './footer/Footer';

function Layout({ children }) {
  return (
    <div id='main-layout'>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
