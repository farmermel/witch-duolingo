import { Footer } from '../Footer/Footer';
import hamsa from '../../assets/hamsa.svg';
import { Link } from 'react-router-dom';
import React from 'react';

export const LandingPage = () => {
  return (
    <>
      <img className="hamsa" src={hamsa} alt="ominous hamsa" />
      <h3>
        Learn to speak like a witch.
        Nothing is free but it won&apos;t cost you money.
      </h3>
      <button className="medium-button" type="button">
        <Link to="/user-home">
          Pay the Price
        </Link>
      </button>
      <Footer />
    </>
  );
};