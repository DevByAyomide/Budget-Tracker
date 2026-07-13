import TransactionListItem from './TransactionListItem';
import { useSelector } from 'react-redux';

function TransactionList() {
  const transactions = useSelector((state) => state.account.data);
  return (
    <ul className="space-y-6">
      {transactions.map((transaction) => (
        <TransactionListItem key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  );
}

export default TransactionList;
