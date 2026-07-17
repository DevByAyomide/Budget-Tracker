import { lazy } from 'react';
import BudgetCard from '../components/BudgetCard';
import TransactionList from '../components/TransactionList';

const Modal = lazy(() => import('../components/Modal'));

function Home() {
  return (
    <main role="main" className="p-4 space-y-12 relative h-screen">
      <BudgetCard />
      <TransactionList />
      <Modal expense={true} />
    </main>
  );
}

export default Home;
