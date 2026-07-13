import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Modal from './Modal';

function BudgetCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg">
      <div className="flex items-center justify-between w-full">
        <p>Available Balance</p>
        <Link to="/transactions" className="flex items-center">
          <span>Transaction History</span>
          <ChevronRight className="ml-2" size={16} />
        </Link>
      </div>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-bold">$0.00</h2>
        <Modal />
      </div>
    </div>
  );
}

export default BudgetCard;
