'use client';

import { Controller } from 'react-hook-form';

import ErrorCard from '@/components/error-card';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { methods } from '../constants';
import { useUpdateMonitor } from '../hooks/use-update-monitor';
import type { MonitorSettings } from '../types';

interface UpdateMonitorFormProps {
  monitor: MonitorSettings;
}

export default function UpdateMonitorForm({ monitor }: UpdateMonitorFormProps) {
  const { form, handleSubmit, isPending, serverError } = useUpdateMonitor(monitor);

  const isDisabled = isPending || !form.formState.isDirty;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(e);
      }}
    >
      {serverError !== undefined && <ErrorCard message={serverError} />}

      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="update-monitor-name">Monitor name</FieldLabel>

              <Input
                {...field}
                id="update-monitor-name"
                aria-invalid={fieldState.invalid}
                placeholder="Production API"
                autoComplete="off"
                disabled={isPending}
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="update-monitor-url">URL</FieldLabel>

              <Input
                {...field}
                id="update-monitor-url"
                type="url"
                inputMode="url"
                aria-invalid={fieldState.invalid}
                placeholder="https://api.example.com/health"
                autoComplete="url"
                spellCheck={false}
                disabled={isPending}
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="method"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="update-monitor-method">HTTP method</FieldLabel>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </FieldContent>

              <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                <SelectTrigger
                  id="update-monitor-method"
                  aria-invalid={fieldState.invalid}
                  className="min-w-30"
                >
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>

                <SelectContent>
                  {methods.map((method) => (
                    <SelectItem key={method.value} value={method.value} disabled={method.disabled}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={isDisabled}>
          {isPending ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
}
