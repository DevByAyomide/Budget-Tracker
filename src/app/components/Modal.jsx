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
import { tags } from '../../lib/constants';

function Modal() {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button variant="default" size="lg" className="rounded-full">
              Add Money
            </Button>
          }
        />
        <DialogContent className="sm:max-w-md p-6">
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
            <Field>
              <Select name="tag" defaultValue={tags[0]} className="w-full">
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
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
export default Modal;
