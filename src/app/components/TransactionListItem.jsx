import { useState } from 'react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, getCategoryColor } from '@/lib/utils';
import EditTransactionModal from './EditTransactionModal';

function TransactionListItem({ transaction }) {
  const [openEdit, setOpenEdit] = useState(false);

  const isIncome = transaction.category === 'Income';
  const formattedAmount = formatCurrency(Math.abs(transaction.amount));

  let formattedDate = transaction.date;
  try {
    const d = new Date(transaction.date);
    if (!isNaN(d.getTime())) {
      formattedDate = format(d, 'MMM d, yyyy');
    }
  } catch {
    // fallback to original date string
  }

  const categoryColor = getCategoryColor(transaction.category);

  return (
    <>
      <li
        onClick={() => setOpenEdit(true)}
        className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-muted/80 cursor-pointer transition-colors group"
      >
        <Avatar className="w-11 h-11 shrink-0">
          <AvatarImage />
          <AvatarFallback
            className={
              isIncome
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold'
                : 'bg-muted text-foreground font-semibold'
            }
          >
            {transaction.avatarFallback || (isIncome ? 'CR' : 'DR')}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col w-full min-w-0 gap-1">
          <div className="flex justify-between items-center gap-2">
            <h3 className="font-medium text-sm truncate">{transaction.description}</h3>
            <span
              className={`font-semibold text-sm shrink-0 ${
                isIncome
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-foreground'
              }`}
            >
              {isIncome ? `+${formattedAmount}` : `-${formattedAmount}`}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{formattedDate}</span>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full inline-block shrink-0"
                style={{ backgroundColor: categoryColor }}
              />
              <Badge variant="secondary" className="font-normal text-[11px] px-2 py-0">
                {transaction.category}
              </Badge>
            </div>
          </div>
        </div>
      </li>

      {openEdit && (
        <EditTransactionModal
          transaction={transaction}
          open={openEdit}
          setOpen={setOpenEdit}
        />
      )}
    </>
  );
}

export default TransactionListItem;

