import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { ROUTE_TIMELINE } from '@v4ly/config/constants';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section>
        <h1>home page</h1>
        <p>links to ohters rutes</p>
        <Link to={ROUTE_TIMELINE}>Curved Timeline in CSS</Link>
      </section>
    </>
  );
}
