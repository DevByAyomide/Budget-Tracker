import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  const numericAmount = typeof amount === 'number' && !isNaN(amount) ? amount : Number(amount) || 0;
  return numericAmount.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPercentage(value) {
  const num = typeof value === 'number' && !isNaN(value) ? value : Number(value) || 0;
  return `${num.toFixed(1)}%`;
}

export const CATEGORY_COLORS = {
  Food: '#F59E0B',
  Utilities: '#0284C7',
  Entertainment: '#8B5CF6',
  Transportation: '#3B82F6',
  Health: '#EC4899',
  Lending: '#10B981',
  Investment: '#6366F1',
  Education: '#14B8A6',
  Debt: '#F97316',
  Miscellaneous: '#64748B',
  Income: '#22C55E',
};

export function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || '#94A3B8';
}

