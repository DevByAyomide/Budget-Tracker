import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, RotateCcw } from 'lucide-react';
import { format, addMonths, subMonths, isSameMonth } from 'date-fns';
import { Button } from '@/components/ui/button';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function MonthYearSelector({ currentDate, onChange, transactionCount = 0 }) {
  const isCurrent = isSameMonth(currentDate, new Date());

  const handlePrev = () => {
    onChange(subMonths(currentDate, 1));
  };

  const handleNext = () => {
    onChange(addMonths(currentDate, 1));
  };

  const handleResetToCurrent = () => {
    onChange(new Date());
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    const updated = new Date(currentDate);
    updated.setMonth(newMonth);
    onChange(updated);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    const updated = new Date(currentDate);
    updated.setFullYear(newYear);
    onChange(updated);
  };

  // Generate selectable years: 5 years back to 3 years ahead
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear - 5; y <= currentYear + 3; y++) {
    years.push(y);
  }

  return (
    <div className="bg-card border rounded-2xl p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between gap-2">
        {/* Previous Month button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          aria-label="Previous month"
          className="h-9 w-9 rounded-full shrink-0"
        >
          <ChevronLeft size={18} />
        </Button>

        {/* Month & Year Title / Dropdowns */}
        <div className="flex items-center gap-2 font-semibold text-lg text-center">
          <CalendarIcon size={18} className="text-muted-foreground shrink-0 hidden sm:inline" />
          
          <div className="flex items-center gap-1.5">
            <select
              value={currentDate.getMonth()}
              onChange={handleMonthChange}
              aria-label="Select month"
              className="bg-transparent font-semibold text-base sm:text-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring rounded-md py-0.5 px-1 hover:bg-muted"
            >
              {MONTHS.map((m, idx) => (
                <option key={m} value={idx} className="bg-popover text-popover-foreground">
                  {m}
                </option>
              ))}
            </select>

            <select
              value={currentDate.getFullYear()}
              onChange={handleYearChange}
              aria-label="Select year"
              className="bg-transparent font-semibold text-base sm:text-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring rounded-md py-0.5 px-1 hover:bg-muted text-muted-foreground"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-popover text-popover-foreground">
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Next Month button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          aria-label="Next month"
          className="h-9 w-9 rounded-full shrink-0"
        >
          <ChevronRight size={18} />
        </Button>
      </div>

      {/* Sub-bar with transaction counter and "Current Month" quick jump */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/50">
        <span>
          {transactionCount} {transactionCount === 1 ? 'transaction' : 'transactions'} in {format(currentDate, 'MMM yyyy')}
        </span>

        {!isCurrent && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetToCurrent}
            className="h-6 px-2 text-xs flex items-center gap-1 text-primary hover:text-primary"
          >
            <RotateCcw size={12} />
            <span>This Month</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default MonthYearSelector;
