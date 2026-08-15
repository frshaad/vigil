'use client';

import { Controller } from 'react-hook-form';

import ErrorCard from '@/components/error-card';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { methods } from '../constants';
import { useCreateMonitor } from '../hooks/use-create-monitor';

export default function CreateMonitorForm() {
  const { form, handleSubmit, isPending, serverError } = useCreateMonitor();

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
              <FieldLabel htmlFor="create-monitor-name">Monitor name</FieldLabel>

              <FieldDescription>A name to help you identify this monitor.</FieldDescription>

              <Input
                {...field}
                id="create-monitor-name"
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.error ? 'create-monitor-name-error' : undefined}
                placeholder="Production API"
                autoComplete="off"
                disabled={isPending}
              />

              {fieldState.invalid && (
                <FieldError id="create-monitor-name-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-monitor-url">URL</FieldLabel>

              <FieldDescription>The HTTP or HTTPS endpoint Vigil should monitor.</FieldDescription>

              <Input
                {...field}
                id="create-monitor-url"
                type="url"
                inputMode="url"
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.error ? 'create-monitor-url-error' : undefined}
                placeholder="https://api.example.com/health"
                autoComplete="url"
                spellCheck={false}
                disabled={isPending}
              />

              {fieldState.error && (
                <FieldError id="create-monitor-url-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="method"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="create-monitor-method">HTTP method</FieldLabel>

                <FieldDescription>
                  The HTTP method used when checking the endpoint.
                </FieldDescription>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </FieldContent>

              <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                <SelectTrigger
                  id="create-monitor-method"
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
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating…' : 'Create monitor'}
        </Button>
      </div>
    </form>
  );
}
