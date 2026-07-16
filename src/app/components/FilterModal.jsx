import { Button } from '@/components/ui/button';
import FilterModalItem from './FilterModalItem';
import { useState } from 'react';
import CategorySheet from './CategorySheet';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setFilter } from '@/data/accountSlice';

function FilterModal({ setOpenFilterModal }) {
  const activeFilter = useSelector((state) => state.account.activeFilter);

  const [category, setCategory] = useState(activeFilter.category ?? 'All');
  const [range, setRange] = useState([activeFilter.range?.min ?? 0, activeFilter.range?.max ?? 100000]);
  const [period, setPeriod] = useState(activeFilter.period ?? null);
  const [dateRange, setDateRange] = useState(
    activeFilter.dateRange ?? {
      startDate: undefined,
      endDate: undefined,
    },
  );

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  function handleToggle(e, value) {
    e.preventDefault();
    setCategory(value);
    setOpen(false);
  }

  function handleFilter() {
    const filter = {};
    if (category !== 'All') {
      filter.category = category;
    }

    if (range[0] !== 0 || range[1] !== 100000) {
      filter.range = {
        min: range[0],
        max: range[1],
      };
    }

    if (period) {
      filter.period = period;
    }

    if (dateRange.startDate && dateRange.endDate) {
      filter.dateRange = dateRange;
    }
    dispatch(setFilter(filter));
    setOpenFilterModal(false);
  }
  return (
    <div className="w-full bg-secondary rounded-xl p-4 absolute bottom-0 left-1/2 -translate-x-1/2">
      <h2 className="text-xl font-semibold text-center mb-4">Filter</h2>
      <form className="space-y-4">
        <CategorySheet onClick={handleToggle} open={open} setOpen={setOpen} category={category} />
        <FilterModalItem range={range} setRange={setRange} />
        <CategorySheet
          dateRange={dateRange}
          setDateRange={setDateRange}
          dateModal={true}
          period={period}
          setPeriod={setPeriod}
        />
        <div className="flex justify-between gap-4">
          <Button
            className="flex-1"
            size="lg"
            type="button"
            onClick={() => {
              dispatch(clearFilter());
              setOpenFilterModal(false);
            }}
          >
            Clear
          </Button>
          <Button className="flex-1" size="lg" type="button" onClick={handleFilter}>
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FilterModal;
