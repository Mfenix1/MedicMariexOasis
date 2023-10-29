import React from 'react';

export default () => (
  <section className="header" id="hero">
    <div className="header__draw">
      <img
        src="./assets/landing-img.svg"
        alt="illustration"
      />
    </div>
    <div className="header__text-box">
      <h1>Your virtual 
      companion in health</h1>
      <p>
        Medic Marie is an A.I.-powered medical assistant
        that provides you with 24/7 information on your
        medical needs.
      </p>
      <button type="button" className="btn btn-rounded-big">
        Text "INFO" to 21588046 now
      </button>
    </div>
  </section>
);
