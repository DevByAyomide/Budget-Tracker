import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Trash2 } from 'lucide-react';
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

import { editTransaction, deleteTransaction } from '@/data/accountSlice';
import { tags } from '@/lib/constants';

function EditTransactionModal({ transaction, open, setOpen }) {
  const dispatch = useDispatch();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!transaction) return null;

  const isIncome = transaction.category === 'Income';
  let defaultDateStr = '';
  try {
    const d = new Date(transaction.date);
    defaultDateStr = format(d, 'yyyy-MM-dd');
  } catch {
    defaultDateStr = format(new Date(), 'yyyy-MM-dd');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const description = formData.get('description');
    const category = formData.get('category') || transaction.category;
    const amount = parseFloat(formData.get('amount'));
    const dateInput = formData.get('date');
    let date = transaction.date;
    if (dateInput) {
      const parts = dateInput.split('-');
      if (parts.length === 3) {
        date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 12, 0, 0).toISOString();
      } else {
        date = new Date(dateInput).toISOString();
      }
    }

    dispatch(
      editTransaction({
        id: transaction.id,
        description,
        category,
        amount,
        date,
      })
    );
    setOpen(false);
  }


  function handleDelete() {
    dispatch(deleteTransaction(transaction.id));
    setShowConfirmDelete(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>Modify the transaction details or delete it.</DialogDescription>
        </DialogHeader>

        {showConfirmDelete ? (
          <div className="py-4 space-y-4">
            <p className="text-sm text-destructive font-medium">
              Are you sure you want to delete this transaction ({transaction.description})? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" type="button" onClick={() => setShowConfirmDelete(false)}>
                Cancel
              </Button>
              <Button variant="destructive" type="button" onClick={handleDelete}>
                Yes, Delete
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldGroup>
              <Field>
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  name="description"
                  defaultValue={transaction.description}
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="edit-amount">Amount</Label>
                <Input
                  id="edit-amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  defaultValue={Math.abs(transaction.amount)}
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  name="date"
                  type="date"
                  defaultValue={defaultDateStr}
                  required
                />
              </Field>

              {!isIncome && (
                <Field>
                  <Label>Category</Label>
                  <Select name="category" defaultValue={transaction.category} className="w-full">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tags</SelectLabel>
                        {tags
                          .filter((item) => item.value !== 'Income')
                          .map((item) => (
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

            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2 mt-6">
              <Button
                variant="destructive"
                type="button"
                className="flex items-center gap-1.5"
                onClick={() => setShowConfirmDelete(true)}
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </Button>

              <div className="flex gap-2">
                <DialogClose render={<Button variant="outline">Cancel</Button>} />
                <Button type="submit">Save Changes</Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditTransactionModal;
