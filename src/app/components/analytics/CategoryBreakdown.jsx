import { useState } from 'react';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, PieChart, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercentage, getCategoryColor } from '@/lib/utils';
import CategoryDonutChart from './CategoryDonutChart';

function CategoryBreakdown({ categories = [], totalExpenses = 0, selectedDate }) {
  // Sort order: 'desc' (highest first, default) or 'asc' (lowest first)
  const [sortOrder, setSortOrder] = useState('desc');
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Filter & enrich categories with colors
  const enrichedCategories = categories.map((cat) => ({
    ...cat,
    color: getCategoryColor(cat.category),
  }));

  // Sort categories based on sortOrder
  const sortedCategories = [...enrichedCategories].sort((a, b) => {
    if (sortOrder === 'desc') {
      return b.amount - a.amount;
    }
    return a.amount - b.amount;
  });

  const hasExpenses = enrichedCategories.length > 0 && totalExpenses > 0;

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <div className="bg-card border rounded-2xl p-5 shadow-xs space-y-5">
      {/* Header with Title and Sort Controls */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <PieChart size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-base">Expense Breakdown</h3>
            <p className="text-xs text-muted-foreground">Spending distribution by category</p>
          </div>
        </div>

        {hasExpenses && (
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSortOrder}
            className="h-8 text-xs flex items-center gap-1.5"
            aria-label="Toggle sort order"
          >
            {sortOrder === 'desc' ? (
              <>
                <ArrowDownWideNarrow size={14} />
                <span>Highest First</span>
              </>
            ) : (
              <>
                <ArrowUpNarrowWide size={14} />
                <span>Lowest First</span>
              </>
            )}
          </Button>
        )}
      </div>

      {hasExpenses ? (
        <div className="space-y-6">
          {/* Donut Chart Visualization */}
          <CategoryDonutChart
            categories={enrichedCategories}
            totalExpenses={totalExpenses}
            hoveredCategory={hoveredCategory}
            onHoverCategory={setHoveredCategory}
          />

          {/* Category List with Progress Bars */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider px-1">
              <span>Category</span>
              <span>Amount & Percentage</span>
            </div>

            <div className="space-y-2.5">
              {sortedCategories.map((item) => {
                const isHovered = hoveredCategory === item.category;

                return (
                  <div
                    key={item.category}
                    onMouseEnter={() => setHoveredCategory(item.category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`p-3 rounded-xl border transition-all duration-150 cursor-pointer ${
                      isHovered
                        ? 'bg-muted border-foreground/20 shadow-xs'
                        : 'bg-card border-border hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-semibold text-sm truncate">{item.category}</span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          ({item.count} {item.count === 1 ? 'tx' : 'txs'})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-bold text-sm">{formatCurrency(item.amount)}</span>
                        <Badge variant="secondary" className="text-xs font-semibold px-2 py-0">
                          {formatPercentage(item.percentage)}
                        </Badge>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.max(item.percentage, 2)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 px-4 text-center rounded-xl bg-muted/30 border border-dashed border-border flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <Layers size={20} />
          </div>
          <p className="font-medium text-sm">No Category Data</p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Expenses will be grouped and visualized here once you add expense transactions for this month.
          </p>
        </div>
      )}
    </div>
  );
}

export default CategoryBreakdown;
