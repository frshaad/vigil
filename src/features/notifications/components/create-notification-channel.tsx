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

type ChannelType = 'EMAIL' | 'TELEGRAM' | 'IN_APP';

export default function CreateNotificationChannel() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ChannelType>('EMAIL');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const resetForm = () => {
    setType('EMAIL');
    setName('');
    setEmail('');
    setBotToken('');
    setChatId('');
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
      const result =
        type === 'EMAIL'
          ? await createNotificationChannel({
              type: 'EMAIL',
              name,
              config: {
                email,
              },
            })
          : type === 'TELEGRAM'
            ? await createNotificationChannel({
                type: 'TELEGRAM',
                name,
                config: {
                  botToken,
                  chatId,
                },
              })
            : await createNotificationChannel({
                type: 'IN_APP',
                name,
                config: {},
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
            Add channel
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add notification channel</DialogTitle>

          <DialogDescription>Choose how Vigil should deliver monitor alerts.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Type</Label>

            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={type === 'EMAIL' ? 'default' : 'outline'}
                onClick={() => setType('EMAIL')}
              >
                Email
              </Button>

              <Button
                type="button"
                variant={type === 'TELEGRAM' ? 'default' : 'outline'}
                onClick={() => setType('TELEGRAM')}
              >
                Telegram
              </Button>

              <Button
                type="button"
                variant={type === 'IN_APP' ? 'default' : 'outline'}
                onClick={() => setType('IN_APP')}
              >
                In-app
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="channel-name">Name</Label>

            <Input
              id="channel-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Production alerts"
            />
          </div>

          {type === 'EMAIL' && (
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
          )}

          {type === 'TELEGRAM' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="telegram-bot-token">Bot token</Label>

                <Input
                  id="telegram-bot-token"
                  type="password"
                  value={botToken}
                  onChange={(event) => setBotToken(event.target.value)}
                  placeholder="Telegram bot token"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telegram-chat-id">Chat ID</Label>

                <Input
                  id="telegram-chat-id"
                  value={chatId}
                  onChange={(event) => setChatId(event.target.value)}
                  placeholder="123456789"
                />
              </div>
            </div>
          )}

          {type === 'IN_APP' && (
            <p className="text-muted-foreground text-sm">
              In-app notifications are delivered directly inside Vigil.
            </p>
          )}

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button className="w-full" disabled={isPending} onClick={handleCreate}>
            {isPending ? 'Adding…' : 'Add channel'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
