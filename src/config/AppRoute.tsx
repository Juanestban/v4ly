import { HelmetProvider } from 'react-helmet-async';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { ROUTE_HOME, ROUTE_TIMELINE, ROUTE_YUTU } from './constants';

import { Footer, Header } from '@v4ly/components';
import { Home } from '@v4ly/views/Home';
import { TimeLine } from '@v4ly/views/TimeLine';
import { Yutu } from '@v4ly/views/Yutu';

export default function AppRoute() {
  return (
    <HelmetProvider>
      <HashRouter>
        <Header />
        <main>
          <Routes>
            <Route path={ROUTE_HOME} element={<Home />} />
            <Route path={ROUTE_TIMELINE} element={<TimeLine />} />
            <Route path={ROUTE_YUTU} element={<Yutu />} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </HelmetProvider>
  );
}
