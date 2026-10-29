import { useSelector } from 'react-redux';
import { ChevronRight, PieChart, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lazy } from 'react';
import { formatCurrency } from '@/lib/utils';

const Modal = lazy(() => import('./Modal'));

function BudgetCard() {
  const balanceState = useSelector((state) => state.account.balance);
  const balance = formatCurrency(balanceState);

  return (
    <div className="flex flex-col gap-4 bg-card border rounded-2xl p-5 shadow-xs relative">
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-medium text-muted-foreground">Available Balance</span>
        <div className="flex items-center gap-3">
          <Link
            to="/analytics"
            className="flex items-center text-xs font-medium text-primary hover:underline gap-1"
          >
            <PieChart size={14} />
            <span>Monthly Analytics</span>
          </Link>
          <span className="text-muted-foreground/40">•</span>
          <Link
            to="/transactions"
            className="flex items-center text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <span>History</span>
            <ChevronRight className="ml-1" size={14} />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between w-full gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight truncate">{balance}</h2>
        <Modal expense={false} />
      </div>
    </div>
  );
}

export default BudgetCard;

