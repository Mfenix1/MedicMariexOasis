import React from 'react';

const Services = () => (
  <section className="services" id="services">
    <article className="services__heading">
      <h2>What can you ask Medic Marie?</h2>
      <p>
        To chat with Medic Marie via SMS, text <span class="contact-info">"INFO"</span> to <span class="contact-info">21588046</span> or <span class="contact-info">25658046</span>, and Medic Marie will be ready to guide you with the following:
      </p>
    </article>
    <div className="services__cards">
      <div className="services__card">
        <img src="./assets/search-doctor.svg" alt="search doctor" />
        <h4>Doctor-finder</h4>
        <p>Medic Marie can list down the possible doctors in your area to treat your illness.</p>
      </div>
      <div className="services__card">
        <img src="./assets/online-pharmacy.svg" alt="online pharmacy" />
        <h4>Prescriptions & Pharmacies</h4>
        <p>She also tells you the over-the-counter drug you need and where to find it.</p>
      </div>
      <div className="services__card">
        <img src="./assets/consultation.svg" alt="consultation" />
        <h4>Health Consultations</h4>
        <p>Free consultation with our trusted doctors and get the best recomendations</p>
      </div>
    </div>
  </section>
);

export default Services
