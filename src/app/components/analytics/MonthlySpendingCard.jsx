import { CreditCard, ShoppingBag, Plus, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import Modal from '../Modal';

function MonthlySpendingCard({ totalExpenses = 0, selectedDate, topCategory, expenseCount = 0 }) {
  const monthName = format(selectedDate, 'MMMM yyyy');
  const hasExpenses = totalExpenses > 0;

  return (
    <div className="bg-card border rounded-2xl p-5 shadow-xs relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <CreditCard size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-base">Monthly Spending</h3>
            <p className="text-xs text-muted-foreground">{monthName}</p>
          </div>
        </div>

        {hasExpenses && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-muted font-medium text-muted-foreground">
            {expenseCount} {expenseCount === 1 ? 'transaction' : 'transactions'}
          </span>
        )}
      </div>

      {hasExpenses ? (
        <div className="space-y-4">
          <div>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Total Spent
            </span>
            <div className="text-3xl font-extrabold tracking-tight mt-0.5">
              {formatCurrency(totalExpenses)}
            </div>
          </div>

          {topCategory && (
            <div className="pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
              <span>Top Category</span>
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: topCategory.color }}
                />
                {topCategory.category} ({formatCurrency(topCategory.amount)})
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="py-6 px-4 text-center rounded-xl bg-muted/40 border border-dashed border-border flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <ShoppingBag size={22} />
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-sm">No expenses for {monthName}</p>
            <p className="text-xs text-muted-foreground max-w-xs">
              You haven't recorded any spending in this month yet.
            </p>
          </div>

          <Modal
            expense={true}
            defaultDate={selectedDate}
            trigger={
              <Button size="sm" variant="outline" className="mt-1 flex items-center gap-1.5 rounded-full">
                <Plus size={14} />
                <span>Add Expense for {format(selectedDate, 'MMM')}</span>
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}

export default MonthlySpendingCard;
