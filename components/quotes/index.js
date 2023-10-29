/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState } from 'react';

import image from '../../public/assets/profile-pic.svg';

const quotes = [
  {
    client: 'Nam Do San',
    company: 'Founder Circle',
    quote: '“I am able to get information about any health or medical concern with the quick and interactive help of Medic Marie.”',
    image,
  },
  {
    client: 'Han Ji Pyeong',
    company: 'Apple',
    quote: '“I have been able to conveniently get my over the counter medicines with Medic Marie. The virtual assistant informs me of stocks ahead of time and allows me to reserve.”',
    image,
  },
  {
    client: 'Seo Dal-mi',
    company: 'Samsung',
    quote: '"I\'m so glad that I found out about Medic Marie. It made finding and purchasing medicine for my grandmother so much easier! I will definitely recommend other people to use it too."',
    image,
  },
  {
    client: 'Kim Jisoo',
    company: 'Huawei',
    quote: '“Medic Marie has helped when I need suddenly need to book doctor’s appointment. It helps me find the best doctors in my area.”',
    image,
  },
];

const Quotes = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section className="quotes-container" id="quotes">
      <div className="quotes">
        <div className="border" />
        <div className="quote">
          <div className="quote__author">
            <img src={quotes[current].image} alt="quote" />
            <div className="quote__author-texts">
              <p>{quotes[current].client}</p>
              <p>{quotes[current].company}</p>
            </div>
          </div>
          <div className="quote__text-box">
            <p>{quotes[current].quote}</p>
          </div>
        </div>
      </div>
      <div className="circles">
        {quotes.map((_quote, index) => (
          <span
            role="button"
            key={`quote + ${index + 1}`}
            onClick={() => setCurrent(index)}
            onKeyDown={() => setCurrent(index)}
            tabIndex={0}
          />
        ))}
      </div>
    </section>
  );
};

export default Quotes;
