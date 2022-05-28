import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect fixed={'top'} expand={'lg'} bg={'light'} variant={'light'} role="navigation">
        <Container>
          <Navbar.Toggle aria-controls={'responsive-navbar-nav'} />
          <Navbar.Collapse aria-controls={'responsive-navbar-nav'}>
            <Nav>
              <Nav.Link href={'/'}>Home</Nav.Link>
              <Nav.Link disabled href={'/'}>
                Features
              </Nav.Link>
              <Nav.Link disabled href={'/'}>
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="p-5 mt-5 mb-3 text-center bg-light">
        <h1 className="mb-3">Strava Segments to NFTs</h1>
        <h4 className="mb-3">Mint NFTs for the eligible Strava segments you've gone through</h4>
        <a
          className="btn btn-outline-secondary m-1"
          href="https://github.com/alainncls/strava-segments-to-nfts-webapp"
          target="_blank"
          rel="noreferrer"
          role="button"
        >
          <i className="bi bi-github"></i> WebApp
        </a>
        <a
          className="btn btn-outline-secondary m-1"
          href="https://github.com/alainncls/strava-segments-to-nfts"
          target="_blank"
          rel="noreferrer"
          role="button"
        >
          <i className="bi bi-github"></i> Server
        </a>
      </div>
    </header>
  );
};

export default Header;
