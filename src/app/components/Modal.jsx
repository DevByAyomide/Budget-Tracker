import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { addTransaction } from '@/data/accountSlice';
import { tags } from '@/lib/constants';


function Modal({ expense = true, defaultDate, trigger, open: controlledOpen, onOpenChange: setControlledOpen }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? setControlledOpen : setInternalOpen;

  const dispatch = useDispatch();

  const expenseCategories = tags.filter((item) => item.value !== 'Income');
  const defaultDateStr = defaultDate
    ? format(new Date(defaultDate), 'yyyy-MM-dd')
    : format(new Date(), 'yyyy-MM-dd');

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const description = formData.get('description');
    const category = expense ? (formData.get('category') || 'Food') : 'Income';
    const amount = parseFloat(formData.get('amount'));
    const dateInput = formData.get('date');
    let date = new Date().toISOString();
    if (dateInput) {
      const parts = dateInput.split('-');
      if (parts.length === 3) {
        date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 12, 0, 0).toISOString();
      } else {
        date = new Date(dateInput).toISOString();
      }
    }

    if (isNaN(amount) || amount <= 0) {
      return;
    }

    dispatch(addTransaction({ description, category, amount, date }));
    setOpen(false);

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger render={trigger} />
      ) : (
        <DialogTrigger
          render={
            <Button
              variant="default"
              size="lg"
              className={`${expense ? 'fixed sm:absolute bottom-6 -translate-x-1/2 left-1/2 h-12 shadow-lg z-30' : ''} rounded-full`}
              onClick={() => setOpen(true)}
            >
              {expense ? '+ Add Expense' : '+ Add Income'}
            </Button>
          }
        />
      )}
      <DialogContent className="sm:max-w-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{expense ? 'Add Expense' : 'Add Income'}</DialogTitle>
            <DialogDescription>
              {expense
                ? 'Enter the details of your new expense transaction.'
                : 'Enter the details of your new income transaction.'}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="tx-description">Description</Label>
              <Input
                id="tx-description"
                name="description"
                placeholder={expense ? 'e.g. Grocery Shopping, Coffee' : 'e.g. Salary, Freelance'}
                defaultValue={expense ? 'Grocery Shopping' : 'Salary'}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="tx-amount">Amount (₦)</Label>
              <Input
                id="tx-amount"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                defaultValue={expense ? '2500' : '50000'}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="tx-date">Date</Label>
              <Input
                id="tx-date"
                name="date"
                type="date"
                defaultValue={defaultDateStr}
                required
              />
            </Field>

            {expense && (
              <Field>
                <Label>Category</Label>
                <Select name="category" defaultValue={expenseCategories[0]?.value || 'Food'} className="w-full">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Expense Category</SelectLabel>
                      {expenseCategories.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save Transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;

