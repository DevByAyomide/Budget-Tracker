import { ArrowDownLeft, ArrowUpRight, Wallet, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

function MonthlySummaryCards({ totalIncome = 0, totalExpenses = 0, netCashFlow = 0, incomeCount = 0, expenseCount = 0 }) {
  const isSurplus = netCashFlow > 0;
  const isDeficit = netCashFlow < 0;
  const isBalanced = netCashFlow === 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* 1. Total Income Card */}
      <div className="bg-card border rounded-2xl p-4 shadow-xs flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Total Income
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ArrowDownLeft size={16} />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
            {formatCurrency(totalIncome)}
          </p>
          <p className="text-xs text-muted-foreground">
            {incomeCount} {incomeCount === 1 ? 'deposit' : 'deposits'}
          </p>
        </div>
      </div>

      {/* 2. Total Expenses Card */}
      <div className="bg-card border rounded-2xl p-4 shadow-xs flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Total Expenses
          </span>
          <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <ArrowUpRight size={16} />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-2xl font-bold tracking-tight text-rose-600 dark:text-rose-400">
            {formatCurrency(totalExpenses)}
          </p>
          <p className="text-xs text-muted-foreground">
            {expenseCount} {expenseCount === 1 ? 'expense' : 'expenses'}
          </p>
        </div>
      </div>

      {/* 3. Net Cash Flow Card */}
      <div
        className={`border rounded-2xl p-4 shadow-xs flex flex-col justify-between relative overflow-hidden ${
          isSurplus
            ? 'bg-emerald-500/5 border-emerald-500/30'
            : isDeficit
            ? 'bg-rose-500/5 border-rose-500/30'
            : 'bg-card'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Net Cash Flow
          </span>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isSurplus
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400'
                : isDeficit
                ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {isSurplus ? (
              <TrendingUp size={16} />
            ) : isDeficit ? (
              <TrendingDown size={16} />
            ) : (
              <Minus size={16} />
            )}
          </div>
        </div>

        <div className="space-y-1">
          <p
            className={`text-2xl font-bold tracking-tight ${
              isSurplus
                ? 'text-emerald-600 dark:text-emerald-400'
                : isDeficit
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-foreground'
            }`}
          >
            {isSurplus ? `+${formatCurrency(netCashFlow)}` : formatCurrency(netCashFlow)}
          </p>

          <div className="flex items-center gap-2">
            <Badge
              variant={isSurplus ? 'default' : isDeficit ? 'destructive' : 'secondary'}
              className="text-[10px] font-semibold px-2 py-0"
            >
              {isSurplus ? 'Surplus' : isDeficit ? 'Deficit' : 'Balanced'}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              Income − Expenses
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlySummaryCards;
