import { useSelector } from 'react-redux';
import { lazy, useState } from 'react';
import { Link } from 'react-router-dom';

import { ChevronLeft, FilterIcon, PieChart, ReceiptText } from 'lucide-react';

import TransactionListItem from '../components/TransactionListItem';
const FilterModal = lazy(() => import('../components/FilterModal'));

import { filteredTransaction } from '@/data/accountSlice';

function Transactions() {
  const transactions = useSelector(filteredTransaction);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  return (
    <div className="p-4 relative min-h-screen pb-24">
      <div className="flex gap-4 justify-between mb-6 items-center">
        <div className="flex items-center">
          <Link to="/" aria-label="Back to home">
            <ChevronLeft size={20} className="cursor-pointer mr-2 hover:opacity-75 transition-opacity" />
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">Transaction History</h2>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/analytics"
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            title="Monthly Analytics"
          >
            <PieChart size={20} />
          </Link>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer"
            onClick={() => setOpenFilterModal((prev) => !prev)}
            aria-label="Filter transactions"
          >
            <FilterIcon size={20} />
          </button>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-muted/30 border border-dashed border-border flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <ReceiptText size={22} />
          </div>
          <p className="font-semibold text-base">No transactions found</p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Try adjusting your active filters or add new transactions from the home page.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {transactions.map((transaction) => (
            <TransactionListItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}

      {openFilterModal && <FilterModal setOpenFilterModal={setOpenFilterModal} />}
    </div>
  );
}

export default Transactions;

