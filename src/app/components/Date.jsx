import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

function Date({ dateRange, setDateRange, setPeriod }) {
  const [custom, setCustom] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => {
            setPeriod(7);
            setDateRange({ startDate: null, endDate: null });
          }}
        >
          7 Days
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setPeriod(14);
            setDateRange({ startDate: null, endDate: null });
          }}
        >
          14 Days
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setPeriod(30);
            setDateRange({ startDate: null, endDate: null });
          }}
        >
          A Month
        </Button>
        <Button variant="secondary" onClick={() => setCustom((prev) => !prev)}>
          Custom
        </Button>
      </div>

      {custom && (
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant={'outline'}
                  data-empty={!dateRange}
                  className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground flex-1"
                >
                  {dateRange.startDate ? format(dateRange.startDate, 'PPP') : <span>Start Date</span>}
                  <ChevronDownIcon data-icon="inline-end" />
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.startDate}
                onSelect={(selectedDate) => {
                  setDateRange((prev) => ({ ...prev, startDate: selectedDate.toISOString() }));
                }}
                defaultMonth={dateRange.startDate}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant={'outline'}
                  data-empty={!dateRange}
                  className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground flex-1"
                >
                  {dateRange.endDate ? format(dateRange.endDate, 'PPP') : <span>End Date</span>}
                  <ChevronDownIcon data-icon="inline-end" />
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.endDate}
                onSelect={(selectedDate) =>
                  setDateRange((prev) => ({
                    ...prev,
                    endDate: selectedDate.toISOString(),
                  }))
                }
                defaultMonth={dateRange.endDate}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}

export default Date;
