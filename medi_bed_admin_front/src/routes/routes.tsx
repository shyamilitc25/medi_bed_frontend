import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load your components
const Dashboard = React.lazy(() => import('../pages/Dashboard')); // Assuming the Home component is in the "pages" directory

function App() {
  return (
    <Router>
      {/* Provide a fallback UI during the lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;