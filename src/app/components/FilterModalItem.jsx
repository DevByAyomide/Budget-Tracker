import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

function FilterModalItem({ range, setRange }) {
  function handleRange(value) {
    setRange(value);
  }

  function handleMinRange(e) {
    const value = Number(e.target.value);
    setRange([Math.min(value, range[1]), range[1]]);
  }
  function handleMaxRange(e) {
    const value = Number(e.target.value);
    setRange([range[0], Math.max(value, range[0])]);
  }
  return (
    <div className="p-4 flex flex-col bg-white rounded-lg">
      <span className="font-semibold mb-8">Price</span>
      <div>
        <Slider value={range} max={100000} step={1000} onValueChange={handleRange} className="w-full mb-8" />
        <div className="flex justify-between items-center gap-4">
          <Input type="number" placeholder="0" value={range[0]} onChange={handleMinRange} />
          <span>-</span>
          <Input type="number" placeholder="100,000" value={range[1]} onChange={handleMaxRange} />
        </div>
      </div>
    </div>
  );
}

export default FilterModalItem;
