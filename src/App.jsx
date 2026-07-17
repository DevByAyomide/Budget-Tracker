import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('./app/pages/Home'));
const Transactions = lazy(() => import('./app/pages/Transactions'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default App;
