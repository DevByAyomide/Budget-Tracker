import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { filters } from '@/lib/constants';
import Date from './Date';
import { differenceInDays } from 'date-fns';
import { useContext } from 'react';
import { CategoryFilterContext, FilterDateContext } from '@/context/accountContext';

function CategorySheet({ dateModal }) {
  const { category, open, setOpen, onSelectCategory } = useContext(CategoryFilterContext);
  const { dateRange, period } = useContext(FilterDateContext);

  const displayDate = period
    ? `${period} Days`
    : dateRange?.startDate && dateRange?.endDate
      ? `${differenceInDays(dateRange.endDate, dateRange.startDate)} Days`
      : 'Select';
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="lg" className="w-full justify-between">
            <span className="font-semibold">{dateModal ? 'Date' : 'Category'}</span>
            <div className=" text-muted-foreground flex items-center gap-1">
              <span className="font-medium">{dateModal ? displayDate : category}</span>
              <ChevronRight size={16} />
            </div>
          </Button>
        }
      />

      <DialogContent className="sm:max-w-sm w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {dateModal ? 'Select Time Frame' : 'Select Category'}
          </DialogTitle>
        </DialogHeader>
        {!dateModal ? (
          filters.map((item) => (
            <Button key={item.value} variant="ghost" onClick={(e) => onSelectCategory(e, item.label)}>
              {item.label}
            </Button>
          ))
        ) : (
          <Date />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CategorySheet;
