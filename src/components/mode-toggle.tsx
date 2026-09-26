'use client';

import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { use } from 'react';
import { browser } from 'react-dom';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';

type Theme = 'light' | 'dark' | 'system';

const themes: Array<{
  value: Theme;
  label: string;
}> = [
  {
    value: 'light',
    label: 'Light',
  },
  {
    value: 'dark',
    label: 'Dark',
  },
  {
    value: 'system',
    label: 'System',
  },
];

export default function ModeToggle() {
  use(browser('Theme selection requires browser state.'));

  const { theme, setTheme } = useTheme();

  const currentTheme: Theme =
    theme === 'light' || theme === 'dark' || theme === 'system' ? theme : 'system';

  return (
    <div className="flex items-center gap-4 px-2 py-1.5">
      <DropdownMenuLabel className="px-0 pb-2">Theme</DropdownMenuLabel>

      <ButtonGroup aria-label="Appearance" className="w-full">
        {themes.map((item) => {
          const isSelected = currentTheme === item.value;

          return (
            <Button
              key={item.value}
              type="button"
              variant={isSelected ? 'secondary' : 'outline'}
              size="icon-sm"
              aria-label={item.label}
              aria-pressed={isSelected}
              title={item.label}
              className={[
                'relative flex-1',
                'transition-colors duration-150',
                isSelected && 'shadow-xs',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                setTheme(item.value);
              }}
            >
              {item.value === 'light' && (
                <IconSun size={16} stroke={1.75} className="transition-transform duration-150" />
              )}

              {item.value === 'dark' && (
                <IconMoon size={16} stroke={1.75} className="transition-transform duration-150" />
              )}

              {item.value === 'system' && (
                <IconDeviceDesktop
                  size={16}
                  stroke={1.75}
                  className="transition-transform duration-150"
                />
              )}

              <span className="sr-only">{item.label}</span>

              {isSelected && (
                <span
                  aria-hidden="true"
                  className="bg-foreground/70 absolute inset-x-2 bottom-0 h-0.5"
                />
              )}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}
