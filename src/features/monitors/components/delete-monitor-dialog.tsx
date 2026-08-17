'use client';

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
} from '@/components/ui/dialog';

type DeleteMonitorDialogProps = {
  monitorName: string;
  isDeleting: boolean;
  onConfirmAction: () => void;
};

export default function DeleteMonitorDialog({
  monitorName,
  isDeleting,
  onConfirmAction,
}: DeleteMonitorDialogProps) {
  const [open, setOpen] = useState(false);

  function handleConfirm() {
    onConfirmAction();
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={isDeleting}
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete monitor?</DialogTitle>

            <DialogDescription>
              This will permanently delete{' '}
              <span className="text-foreground font-medium">{monitorName}</span>. This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={isDeleting}>
                  Cancel
                </Button>
              }
            />

            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting…' : 'Delete monitor'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
