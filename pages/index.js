import React from 'react';
import Head from 'next/head';

import Services from '../components/services/index';
import Navbar from '../components/navbar/index';
import Hero from '../components/hero/index';
import Quotes from '../components/quotes/index';
import Footer from '../components/footer/index';

export default () => (
  <div>
    <Head>
      <title>Medic Marie</title>
    </Head>
    <Navbar />
    <Hero />
    <Services />
    <Quotes />
    <Footer />
  </div>
);
