import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllTransactions, calculateMonthlyAnalytics } from '@/data/accountSlice';

import MonthYearSelector from './MonthYearSelector';
import MonthlySummaryCards from './MonthlySummaryCards';
import MonthlySpendingCard from './MonthlySpendingCard';
import CategoryBreakdown from './CategoryBreakdown';
import MonthlyTransactionsList from './MonthlyTransactionsList';
import { getCategoryColor } from '@/lib/utils';

function MonthlyAnalyticsView({ initialDate }) {
  const transactions = useSelector(selectAllTransactions);
  const [selectedDate, setSelectedDate] = useState(() => initialDate || new Date());

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  // Compute analytics dynamically whenever transactions or selectedDate change
  const analytics = useMemo(() => {
    return calculateMonthlyAnalytics(transactions, year, month);
  }, [transactions, year, month]);

  // Find top spending category if any
  const topCategory = useMemo(() => {
    if (!analytics.categoryBreakdown || analytics.categoryBreakdown.length === 0) {
      return null;
    }
    const sorted = [...analytics.categoryBreakdown].sort((a, b) => b.amount - a.amount);
    const top = sorted[0];
    return {
      ...top,
      color: getCategoryColor(top.category),
    };
  }, [analytics.categoryBreakdown]);

  return (
    <div className="space-y-6">
      {/* 1. Month and Year Navigation */}
      <MonthYearSelector
        currentDate={selectedDate}
        onChange={setSelectedDate}
        transactionCount={analytics.monthTransactions.length}
      />

      {/* 2. Monthly Income, Expense, and Net Cash Flow Summary */}
      <MonthlySummaryCards
        totalIncome={analytics.totalIncome}
        totalExpenses={analytics.totalExpenses}
        netCashFlow={analytics.netCashFlow}
        incomeCount={analytics.incomeTransactions.length}
        expenseCount={analytics.expenseTransactions.length}
      />

      {/* 3. Monthly Spending Card */}
      <MonthlySpendingCard
        totalExpenses={analytics.totalExpenses}
        selectedDate={selectedDate}
        topCategory={topCategory}
        expenseCount={analytics.expenseTransactions.length}
      />

      {/* 4. Expense Breakdown by Category */}
      <CategoryBreakdown
        categories={analytics.categoryBreakdown}
        totalExpenses={analytics.totalExpenses}
        selectedDate={selectedDate}
      />

      {/* 5. Month's Transactions List */}
      <MonthlyTransactionsList
        transactions={analytics.monthTransactions}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default MonthlyAnalyticsView;
