import { css, styled } from '@pigment-css/react';
import * as React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { FieldProps, useField } from '@formiz/core';
import { CheckboxProps } from '@/types';

function Checkbox({ id, label, children, ...delegated }: CheckboxProps) {
  const { value, setValue, errorMessage, isValid, isSubmitted } = useField({
    defaultValue: false,
    ...delegated,
  });
  return (
    <Wrapper>
      <RadixCheckboxRoot
        id={id}
        style={
          {
            '--border-color': !isValid && isSubmitted && 'red',
          } as React.CSSProperties
        }
        checked={value ?? undefined}
        onCheckedChange={setValue}
      >
        <RadixCheckbox.Indicator>
          <CheckIcon
            className={css({
              transform: 'scale(2)',
            })}
          />
        </RadixCheckbox.Indicator>
      </RadixCheckboxRoot>
      <label
        className={css({
          '&:hover': {
            cursor: 'pointer',
          },
        })}
        htmlFor={id}
      >
        {label}
        {children}
      </label>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RadixCheckboxRoot = styled(RadixCheckbox.Root)`
  background-color: white;
  border-color: var(--border-color);
  width: 25px;
  height: 25px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px var(--black-a7);
  padding: 0;

  &:hover {
    cursor: pointer;
  }

  &:focus-visible {
    outline: lightgreen solid 3px;
  }
`;

export default Checkbox;
