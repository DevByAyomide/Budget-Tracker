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
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addAccount } from '@/data/accountSlice';
import { useDispatch } from 'react-redux';

function Modal() {
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const description = formData.get('description');
    const amount = parseFloat(formData.get('amount'));
    dispatch(addAccount({ description, amount }));
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="default" size="lg" className="rounded-full">
            Add Money
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
