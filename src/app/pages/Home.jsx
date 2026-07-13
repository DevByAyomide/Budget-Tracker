import BudgetCard from '../components/BudgetCard';
import TransactionList from '../components/TransactionList';

function Home() {
  return (
    <div className="p-4 space-y-12">
      <BudgetCard />
      <TransactionList />
    </div>
  );
}

export default Home;
