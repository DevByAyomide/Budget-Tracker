import { Link } from 'react-router-dom';
import { ChevronLeft, History, Plus } from 'lucide-react';
import MonthlyAnalyticsView from '../components/analytics/MonthlyAnalyticsView';
import Modal from '../components/Modal';
import { Button } from '@/components/ui/button';

function MonthlyAnalyticsPage() {
  return (
    <div className="p-4 relative min-h-screen pb-28">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/" aria-label="Back to dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <ChevronLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Monthly Analytics</h1>
            <p className="text-xs text-muted-foreground">Spending breakdowns & cash flow</p>
          </div>
        </div>

        <Link to="/transactions" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <History size={16} />
          <span className="hidden sm:inline">All Transactions</span>
        </Link>
      </div>

      {/* Main Analytics Content */}
      <MonthlyAnalyticsView />

      {/* Floating Add Expense Modal Button */}
      <Modal expense={true} />
    </div>
  );
}

export default MonthlyAnalyticsPage;
