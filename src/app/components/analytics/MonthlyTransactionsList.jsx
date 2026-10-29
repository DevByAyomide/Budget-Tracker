import { useState } from 'react';
import { format } from 'date-fns';
import { ReceiptText, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TransactionListItem from '../TransactionListItem';
import Modal from '../Modal';

function MonthlyTransactionsList({ transactions = [], selectedDate }) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'expense' | 'income'

  const filteredTransactions = transactions.filter((t) => {
    if (filterType === 'expense') return t.category !== 'Income';
    if (filterType === 'income') return t.category === 'Income';
    return true;
  });

  const monthName = format(selectedDate, 'MMMM yyyy');

  return (
    <div className="bg-card border rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <ReceiptText size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-base">Transactions in {format(selectedDate, 'MMM yyyy')}</h3>
            <p className="text-xs text-muted-foreground">
              {transactions.length} total • click any to edit or delete
            </p>
          </div>
        </div>

        {transactions.length > 0 && (
          <div className="flex items-center gap-1 bg-muted p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                filterType === 'all'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All ({transactions.length})
            </button>
            <button
              onClick={() => setFilterType('expense')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                filterType === 'expense'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Expenses
            </button>
            <button
              onClick={() => setFilterType('income')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                filterType === 'income'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Income
            </button>
          </div>
        )}
      </div>

      {filteredTransactions.length > 0 ? (
        <ul className="space-y-1 divide-y divide-border/60">
          {filteredTransactions.map((transaction) => (
            <TransactionListItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      ) : (
        <div className="py-6 px-4 text-center rounded-xl bg-muted/30 border border-dashed border-border flex flex-col items-center justify-center gap-2">
          <p className="font-medium text-sm">
            {transactions.length === 0
              ? `No transactions recorded in ${monthName}`
              : `No ${filterType} transactions found`}
          </p>
          <p className="text-xs text-muted-foreground max-w-xs">
            {transactions.length === 0
              ? 'Add an income or expense transaction to see it here.'
              : `There are no ${filterType} transactions in this month.`}
          </p>

          <div className="flex gap-2 mt-2">
            <Modal
              expense={true}
              defaultDate={selectedDate}
              trigger={
                <Button size="sm" variant="outline" className="text-xs h-8 rounded-full">
                  + Add Expense
                </Button>
              }
            />
            <Modal
              expense={false}
              defaultDate={selectedDate}
              trigger={
                <Button size="sm" variant="outline" className="text-xs h-8 rounded-full">
                  + Add Income
                </Button>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthlyTransactionsList;
