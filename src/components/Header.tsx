import React from 'react';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <a className="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link  disabled" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link  disabled" href="#">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="p-5 mb-3 text-center bg-light">
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
