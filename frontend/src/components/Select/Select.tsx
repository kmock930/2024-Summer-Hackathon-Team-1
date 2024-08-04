import * as React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { CheckIcon } from '@radix-ui/react-icons';
import { css } from '@pigment-css/react';

interface SelectOptionProps {
  value: string;
  text: string;
}

function Select({
  options,
  placeholder,
}: {
  options: SelectOptionProps[];
  placeholder: string;
}) {
  return (
    <RadixSelect.Root>
      <RadixSelect.Trigger
        className={css({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          padding: '0 15px',
          fontSize: '13px',
          lineHeight: 1,
          height: '35px',
          gap: '5px',
          backgroundColor: 'white',
        })}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon />
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={css({
            overflow: 'hidden',
            backgroundColor: 'white',
            borderRadius: '6px',
            boxShadow:
              '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
          })}
        >
          <RadixSelect.ScrollUpButton />
          <RadixSelect.Viewport>
            {options.map((option) => {
              return (
                <SelectItem value={option.value} key={option.value}>
                  {option.text}
                </SelectItem>
              );
            })}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton />
          <RadixSelect.Arrow />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

const SelectItem = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; value: string }
>(({ children, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Item
      {...props}
      ref={forwardedRef}
      className={css({
        fontSize: '13px',
        lineHeight: 1,
        color: 'var(--violet-11)',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        height: '25px',
        padding: '0 35px 0 25px',
        position: 'relative',
        userSelect: 'none',
      })}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator
        className={css({
          position: 'absolute',
          left: '0',
          width: '25px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <CheckIcon />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});

SelectItem.displayName = 'SelectItem';

export default Select;
