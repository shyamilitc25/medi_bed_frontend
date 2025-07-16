import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load your components
const Dashboard = React.lazy(() => import('../pages/Dashboard')); 
const ResourceComp = React.lazy(() => import('../pages/Resources'));
//  const BedComp = React.lazy(() => import('../pages/Beds'));


function AppRoutes() {
  return (
    <Router>
      {/* Provide a fallback UI during the lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resources" element={<ResourceComp />} />
          {/* <Route path="/beds" element={<BedComp />} /> */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;