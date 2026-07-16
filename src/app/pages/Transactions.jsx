import { useSelector } from 'react-redux';

import TransactionListItem from '../components/TransactionListItem';
// import { filters } from '@/lib/constants';
import { ChevronLeft, FilterIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { filteredTransaction } from '@/data/accountSlice';
import FilterModal from '../components/FilterModal';
import { useState } from 'react';

function Transactions() {
  const transactions = useSelector(filteredTransaction);
  console.log(transactions);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  return (
    <div className="p-4 relative h-screen ">
      <div className="flex gap-4 justify-between mb-6 items-center">
        <div className="flex items-center justify-center">
          <Link to="/">
            <ChevronLeft size={20} className="cursor-pointer mr-2" />
          </Link>
          <h2 className="text-2xl font-semibold">Transaction History</h2>
        </div>
        <FilterIcon size={20} className="cursor-pointer" onClick={() => setOpenFilterModal((prev) => !prev)} />
      </div>
      {transactions.length === 0 ? (
        <h3>No transactions found.</h3>
      ) : (
        <ul className="space-y-6">
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
