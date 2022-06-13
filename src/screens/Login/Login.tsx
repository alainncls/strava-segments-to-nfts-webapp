import React from 'react';
import './Login.css';
import { Col, Row } from 'react-bootstrap';
import landingImage from '../../assets/img/landing.jpg';
import logoImage from '../../assets/img/logo.png';

const Login = () => {
  return (
    <section className="vh-100">
      <div className="container-fluid">
        <Row>
          <Col className="col-sm-6 text-black pt-4">
            <div className="px-5 ms-xl-4">
              <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: '#709085' }}></i>
              <span className="h1 fw-bold mb-0">
                <img alt={'Logo'} src={logoImage} />
              </span>
            </div>

            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: '23rem' }}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                  Connect your wallet
                </h3>

                <div className="pt-1 mb-4">{/* https://wagmi.sh/examples/connect-wallet */}</div>
              </form>
            </div>
          </Col>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src={landingImage}
              alt="Login image"
              className="w-100 vh-100"
              style={{ objectFit: 'cover', objectPosition: 'left' }}
            />
          </div>
        </Row>
      </div>
    </section>
  );
};

export default Login;
