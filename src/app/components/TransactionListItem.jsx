import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

function TransactionListItem({ transaction }) {
  const amount = transaction.amount.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });
  return (
    <li className="flex items-center gap-4 hover:bg-muted">
      <Avatar className="w-12 h-12">
        <AvatarImage />
        <AvatarFallback>{transaction.avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full gap-1">
        <div className="flex justify-between">
          <h3>{transaction.description}</h3>
          <p>{amount}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">{transaction.date}</p>
          <Badge variant="secondary" className="font-normal">
            {transaction.category}
          </Badge>
        </div>
      </div>
    </li>
  );
}

export default TransactionListItem;
