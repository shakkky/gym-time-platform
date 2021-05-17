import React from 'react';
import successAnimation from '../../assets/success-animation.gif';
import { Button } from 'react-bootstrap';

const Verified = () => {
  return (
    <div>
      <section>
        <div className="header-container">
          <img src={successAnimation} alt="Success Animation"/>
          <h1>Email Verified</h1>
          <p>Congratulations! Your email address has been verified. You can now start using our online portal.</p>
        </div>
        <div className="container-sm">
          <Button variant="primary" size="lrg" onClick={(e) => window.location.href="/portal"} block>
              Take me to the portal
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Verified