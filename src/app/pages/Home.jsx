import BudgetCard from '../components/BudgetCard';
import Modal from '../components/Modal';
import TransactionList from '../components/TransactionList';

function Home() {
  return (
    <div className="p-4 space-y-12 relative h-screen">
      <BudgetCard />
      <TransactionList />
      <Modal expense={true} />
    </div>
  );
}

export default Home;
