import { HelmetProvider } from 'react-helmet-async';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { ROUTE_HOME, ROUTE_TIMELINE } from './constants';

import { Home } from '@v4ly/views/Home';
import { TimeLine } from '@v4ly/views/TimeLine';

export default function AppRoute() {
  return (
    <HelmetProvider>
      <HashRouter>
        <Routes>
          <Route path={ROUTE_HOME} element={<Home />} />
          <Route path={ROUTE_TIMELINE} element={<TimeLine />} />
        </Routes>
      </HashRouter>
    </HelmetProvider>
  );
}
