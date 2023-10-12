import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { ROUTE_HOME } from '@v4ly/config/constants';
import { CurvedTimeLine } from '@v4ly/components';

import s from './TimeLine.module.css';

export default function TimeLine() {
  const [quantity, setQuantity] = useState(3);

  const handleClick = (operator: 'next' | 'prev') => () => {
    if (quantity === 0 && operator === 'prev') {
      return;
    }

    setQuantity((prev) => (operator === 'next' ? prev + 1 : prev - 1));
  };

  return (
    <>
      <Helmet>
        <title>Curved Timeline in CSS</title>
      </Helmet>
      <section>
        <Link to={ROUTE_HOME}>Back</Link>
        <h1>Curved Timeline in CSS</h1>

        <div className="wrapper">
          <div className={s.container}>
            <h2>counter</h2>
            <div className={s.counter}>
              <button onClick={handleClick('prev')}>-</button>
              <p>{quantity}</p>
              <button onClick={handleClick('next')}>+</button>
            </div>
          </div>
          {quantity === 0 ? <h2>Empty messages</h2> : <CurvedTimeLine messages={quantity} />}
        </div>
      </section>
    </>
  );
}
