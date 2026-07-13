import { transactionData } from '@/lib/constants';
import TransactionListItem from './TransactionListItem';

function TransactionList() {
  return (
    <ul className="space-y-6">
      {transactionData.map((transaction) => (
        <TransactionListItem key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  );
}

export default TransactionList;
