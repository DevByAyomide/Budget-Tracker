import { useState, lazy } from 'react';
import { PieChart, ListFilter } from 'lucide-react';
import BudgetCard from '../components/BudgetCard';
import TransactionList from '../components/TransactionList';
import MonthlyAnalyticsView from '../components/analytics/MonthlyAnalyticsView';

const Modal = lazy(() => import('../components/Modal'));

function Home() {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'transactions'

  return (
    <main role="main" className="p-4 space-y-6 relative min-h-screen pb-28">
      {/* 1. Available Balance Card */}
      <BudgetCard />

      {/* 2. Navigation Tab Switcher */}
      <div className="flex bg-muted p-1 rounded-xl w-full">
        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-background text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <PieChart size={16} />
          <span>Monthly Analytics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('transactions')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'transactions'
              ? 'bg-background text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ListFilter size={16} />
          <span>Recent Activity</span>
        </button>
      </div>

      {/* 3. Active Tab View */}
      {activeTab === 'analytics' ? (
        <MonthlyAnalyticsView />
      ) : (
        <TransactionList />
      )}

      {/* 4. Floating Action Button */}
      <Modal expense={true} />
    </main>
  );
}

export default Home;

