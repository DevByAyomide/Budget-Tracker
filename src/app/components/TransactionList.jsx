import { useSelector } from 'react-redux';
import { ReceiptText } from 'lucide-react';
import TransactionListItem from './TransactionListItem';

function TransactionList() {
  const transactions = useSelector((state) => state.account.data);

  if (transactions.length === 0) {
    return (
      <div className="py-12 px-4 text-center rounded-2xl bg-card border border-dashed border-border flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          <ReceiptText size={22} />
        </div>
        <p className="font-semibold text-base">No transactions yet</p>
        <p className="text-xs text-muted-foreground max-w-xs">
          Your transactions will appear here once you record your income or expenses.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base">Recent Transactions</h3>
        <span className="text-xs text-muted-foreground">{transactions.length} total</span>
      </div>

      <ul className="space-y-1 divide-y divide-border/60">
        {transactions.map((transaction) => (
          <TransactionListItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;

