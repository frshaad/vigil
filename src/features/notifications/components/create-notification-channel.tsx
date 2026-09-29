'use client';

import { IconPlus } from '@tabler/icons-react';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { createNotificationChannel } from '../actions/create-notification-channel';

export default function CreateNotificationChannel() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const resetForm = () => {
    setName('');
    setEmail('');
    setError(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      resetForm();
    }
  };

  const handleCreate = () => {
    setError(null);

    startTransition(async () => {
      const result = await createNotificationChannel({
        name,
        config: {
          email,
        },
      });

      if (result.serverError) {
        setError(result.serverError);
        return;
      }

      if (result.validationErrors) {
        setError('Please check the entered values.');
        return;
      }

      setOpen(false);
      window.location.reload();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button>
            <IconPlus />
            Add email
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add email notification</DialogTitle>

          <DialogDescription>Receive monitor alerts by email.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="channel-name">Name</Label>

            <Input
              id="channel-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Production alerts"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="channel-email">Email address</Label>

            <Input
              id="channel-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button className="w-full" disabled={isPending} onClick={handleCreate}>
            {isPending ? 'Adding…' : 'Add email'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
