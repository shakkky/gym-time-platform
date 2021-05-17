import React from 'react';
import SignupForm from '../../components/SignupForm';
import logo from '../../assets/logo.jpg';
import './Signup.scss';

const Signup = () => {
  return (
    <div>
      <section>
        <div className="header-container">
          <img src={logo} alt="logo"/>
          <p>Join now!</p>
          <h1>Create your account</h1>
        </div>
        <div className="container-sm">
          <SignupForm />
        </div>
      </section>
    </div>
  );
}

export default Signup;
