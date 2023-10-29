import React from 'react';
import Head from 'next/head';

import {
  Services, Quotes, Hero, Navbar, Footer,
} from '../components';

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
