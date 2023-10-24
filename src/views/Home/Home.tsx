import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { ROUTE_TIMELINE, ROUTE_DRAGGABLE_SLIDER } from '@v4ly/config/constants';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section>
        <h1>home page</h1>
        <p>links to ohters rutes</p>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link to={ROUTE_TIMELINE}>Curved Timeline in CSS</Link>
          <Link to={ROUTE_DRAGGABLE_SLIDER}>Draggable slider autoplay</Link>
        </div>
      </section>
    </>
  );
}
