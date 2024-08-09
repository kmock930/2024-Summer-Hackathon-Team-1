import { styled } from '@pigment-css/react';
import * as React from 'react';
import { Label, Checkbox as ReactAriaCheckbox } from 'react-aria-components';
import { CheckboxProps } from '@/types';
import { useField } from '@formiz/core';

const AriaCheckbox = styled(ReactAriaCheckbox)({
  '--selected-color': '#6f46ed',
  '--selected-color-pressed': '#522acd',
  '--checkmark-color': 'white',
  '--border-color': 'black',
  display: 'flex',
  alignItems: 'center',
  gap: '0.571rem',
  color: 'var(--text-color)',
  forcedColorAdjust: 'none',
} as React.CSSProperties);

const CheckboxIndicator = styled('div')({
  width: '1.143rem',
  height: '1.143rem',
  border: '2px solid var(--border-color)',
  borderRadius: '4px',
  transition: 'all 200ms',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [`${AriaCheckbox}[data-pressed] &`]: {
    borderColor: 'var(--border-color-pressed)',
  },

  [`${AriaCheckbox}[data-focus-visible] &`]: {
    outline: '2px solid var(--focus-ring-color)',
    outlineOffset: '2px',
  },
  [`${AriaCheckbox}[data-selected] &`]: {
    borderColor: 'var(--selected-color)',
    background: 'var(--selected-color)',
  },
  [`${AriaCheckbox}[data-indeterminate] &`]: {
    borderColor: 'var(--selected-color)',
    background: 'var(--selected-color)',
  },
  [`${AriaCheckbox}[data-selected] ${AriaCheckbox}[data-pressed] &`]: {
    borderColor: 'var(--selected-color-pressed)',
    background: 'var(--selected-color-pressed)',
  },
});

const CheckedIcon = styled('svg')({
  width: '1rem',
  height: '1rem',
  fill: 'none',
  stroke: 'var(--checkmark-color)',
  strokeWidth: '3px',
  strokeDasharray: '22px',
  strokeDashoffset: 66,
  transition: 'all 200ms',
  [`${AriaCheckbox}[data-indeterminate] &`]: {
    strokeDashoffset: 44,
  },

  [`${AriaCheckbox}[data-selected] &`]: {
    strokeDashoffset: 44,
  },

  [`${AriaCheckbox}[data-indeterminate] ${AriaCheckbox} &`]: {
    stroke: 'none',
    fill: 'var(--checkmark-color)',
  },
});

function Checkbox<FormattedValue = boolean>(
  props: CheckboxProps<FormattedValue>
) {
  const { value: isSelected, setValue: setIsSelected } = useField(props);
  return (
    <AriaCheckbox
      value={props.value}
      isSelected={isSelected ?? false}
      onChange={setIsSelected}
      {...props}
    >
      <CheckboxIndicator>
        <CheckedIcon viewBox='0 0 18 18' aria-hidden='true'>
          <polyline points='1 9 7 14 15 4' />
        </CheckedIcon>
      </CheckboxIndicator>
      <div>
        <Label>{props.label}</Label>
        {props.children}
      </div>
    </AriaCheckbox>
  );
}

export default Checkbox;
