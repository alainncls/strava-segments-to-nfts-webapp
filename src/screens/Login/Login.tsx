import React from 'react';
import './Login.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import landingImage from '../../assets/img/landing.jpg';
import logoImage from '../../assets/img/logo.png';
import { useAccount, useConnect, useDisconnect, useEnsName, useNetwork } from 'wagmi';

const Login = () => {
  const { data: account } = useAccount();
  const { data: ensName } = useEnsName({ address: account?.address });
  const { activeConnector, connect, connectors, error, isConnecting, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { activeChain, chains, isLoading, pendingChainId, switchNetwork } = useNetwork();

  return (
    <section className="vh-100">
      <Container fluid={true}>
        <Row>
          <Col className="col-sm-6 text-black pt-4">
            <div className="px-5 ms-xl-4">
              <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: '#709085' }}></i>
              <span className="h1 fw-bold mb-0">
                <img alt={'Logo'} src={logoImage} />
              </span>
            </div>

            <Container>
              {account?.address && (
                <>
                  <Row>
                    {ensName ?? account?.address}
                    {ensName ? ` (${account?.address})` : null}
                  </Row>
                  <Row style={{ marginTop: '8px' }}>
                    Connected to {activeChain?.name ?? activeChain?.id}
                    {activeChain?.unsupported && ' (unsupported)'}
                  </Row>

                  {switchNetwork && (
                    <Row style={{ marginTop: '8px' }}>
                      {chains.map((x) =>
                        x.id === activeChain?.id ? null : (
                          <Col key={`${x.id}-col`} className={'col-sm-3'}>
                            <Button key={x.id} variant={'secondary'} onClick={() => switchNetwork(x.id)}>
                              {x.name}
                              {isLoading && x.id === pendingChainId && ' (switching)'}
                            </Button>
                          </Col>
                        ),
                      )}
                    </Row>
                  )}
                </>
              )}

              {activeConnector && (
                <Button onClick={() => disconnect()} style={{ marginTop: '8px' }}>
                  Disconnect from {activeConnector.name}
                </Button>
              )}

              {!account?.address && (
                <Row className="pt-1 mb-4">
                  <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                    Connect your wallet
                  </h3>
                  {connectors
                    .filter((x) => x.ready && x.id !== activeConnector?.id)
                    .map((x) => (
                      <Col key={`${x.id}-col`} className={'col-sm-3'}>
                        <Button key={x.id} onClick={() => connect(x)}>
                          {x.name}
                          {isConnecting && x.id === pendingConnector?.id && ' (connecting)'}
                        </Button>
                      </Col>
                    ))}
                </Row>
              )}
              {error && <div>{error.message}</div>}
            </Container>
          </Col>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src={landingImage}
              alt="Login fullscreen"
              className="w-100 vh-100"
              style={{ objectFit: 'cover', objectPosition: 'left' }}
            />
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
