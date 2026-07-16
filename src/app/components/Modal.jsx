import { useDispatch } from 'react-redux';
import { useState } from 'react';

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

function Modal({ expense }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const description = formData.get('description');
    const category = formData.get('category');
    const amount = parseFloat(formData.get('amount'));
    dispatch(addTransaction({ description, category, amount }));
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="default"
            size="lg"
            className={`${expense && 'absolute bottom-8 -translate-x-1/2 left-1/2 h-12'} rounded-full`}
            onClick={() => setOpen(true)}
          >
            {expense ? 'Add Expense' : 'Add Income'}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md p-6">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>Enter the details of your new transaction.</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="description-1">Description</Label>
              <Input id="description-1" name="description" defaultValue="Grocery Shopping" />
            </Field>
            <Field>
              <Label htmlFor="amount-1">Amount</Label>
              <Input id="amount-1" name="amount" defaultValue="2500" />
            </Field>
            {expense && (
              <Field>
                <Select name="category" defaultValue={tags[0]} className="w-full">
                  <SelectTrigger className="w-full" size="9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tags</SelectLabel>
                      {tags.map((item) => (
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
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default Modal;
