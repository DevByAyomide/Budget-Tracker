import { useState } from 'react';
import { formatCurrency, formatPercentage } from '@/lib/utils';

function CategoryDonutChart({ categories = [], totalExpenses = 0, hoveredCategory, onHoverCategory }) {
  const [internalHovered, setInternalHovered] = useState(null);

  const activeCategory = hoveredCategory !== undefined ? hoveredCategory : internalHovered;
  const setActiveCategory = onHoverCategory || setInternalHovered;

  const size = 220;
  const center = size / 2;
  const radius = 72;
  const strokeWidth = 26;
  const circumference = 2 * Math.PI * radius;

  // If no expenses, render empty placeholder ring
  if (!categories || categories.length === 0 || totalExpenses === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-4">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/40"
          />
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-muted-foreground text-xs font-medium"
          >
            No spending
          </text>
        </svg>
      </div>
    );
  }

  // Calculate cumulative angles / offsets
  let accumulatedPercent = 0;
  const slices = categories.map((cat) => {
    const percent = cat.percentage;
    const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += percent;

    return {
      ...cat,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  const displayCategory = activeCategory
    ? categories.find((c) => c.category === activeCategory)
    : null;

  return (
    <div className="flex flex-col items-center justify-center relative py-2">
      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="mx-auto transform -rotate-90 origin-center"
        >
          {/* Base Background Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/30"
          />

          {/* Slices */}
          {slices.map((slice) => {
            const isHovered = activeCategory === slice.category;
            return (
              <circle
                key={slice.category}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth={isHovered ? strokeWidth + 6 : strokeWidth}
                strokeDasharray={slice.strokeDasharray}
                strokeDashoffset={slice.strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setActiveCategory(slice.category)}
                onMouseLeave={() => setActiveCategory(null)}
                style={{
                  filter: isHovered ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.25))' : 'none',
                }}
              />
            );
          })}
        </svg>

        {/* Center Text inside Donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
          {displayCategory ? (
            <div className="animate-in fade-in zoom-in-95 duration-150">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block truncate max-w-[110px]">
                {displayCategory.category}
              </span>
              <span className="text-base font-bold text-foreground block">
                {formatCurrency(displayCategory.amount)}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground inline-block mt-0.5">
                {formatPercentage(displayCategory.percentage)}
              </span>
            </div>
          ) : (
            <div>
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
                Total Expenses
              </span>
              <span className="text-lg font-bold text-foreground block tracking-tight">
                {formatCurrency(totalExpenses)}
              </span>
              <span className="text-[10px] text-muted-foreground block mt-0.5">
                {categories.length} {categories.length === 1 ? 'category' : 'categories'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryDonutChart;
