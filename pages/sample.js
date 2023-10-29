import React from 'react';
import Head from 'next/head';

import {
  Services, Contents, Quotes, Hero, Blog, Navbar, Footer,
} from '../components';

export default () => (
  <div>
    <Head>
      <title>Sample Page</title>
    </Head>
    <Navbar />
    <Footer />
  </div>
);
