import { IconEyeOff, IconEye } from '@tabler/icons-react';
import type { Route } from 'next';
import Link from 'next/link';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface PasswordFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  visible: boolean;
  onToggle: () => void;
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'];
  forgotPasswordHref?: Route;
  trailingAction?: React.ReactNode;
}

export default function PasswordField<TFieldValues extends FieldValues>({
  name,
  label,
  control,
  visible,
  onToggle,
  autoComplete,
  trailingAction,
  forgotPasswordHref,
}: PasswordFieldProps<TFieldValues>) {
  const inputId = `${name}-password`;

  let rightElement: React.ReactNode = null;

  if (forgotPasswordHref !== undefined) {
    rightElement = (
      <Link href={forgotPasswordHref} className="text-primary text-xs hover:underline">
        Forgot password?
      </Link>
    );
  } else {
    rightElement = trailingAction;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={inputId} className="justify-between">
            <span>{label}</span>
            {rightElement}
          </FieldLabel>

          <div className="relative">
            <Input
              {...field}
              id={inputId}
              type={visible ? 'text' : 'password'}
              aria-invalid={fieldState.invalid}
              aria-describedby={fieldState.invalid ? `${inputId}-error` : undefined}
              autoComplete={autoComplete}
              className="pr-9"
            />

            <Button
              size="icon"
              variant="ghost"
              type="button"
              className="absolute top-0 right-0 hover:bg-transparent dark:hover:bg-transparent"
              onClick={onToggle}
              aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            >
              {visible ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
            </Button>
          </div>

          {fieldState.invalid && <FieldError id={`${inputId}-error`} errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
