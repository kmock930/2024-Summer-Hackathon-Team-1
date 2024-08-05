import {
  Input as HeadlessInput,
  Description,
  Field,
  Label,
  InputProps,
} from '@headlessui/react';
import * as React from 'react';
import CourseRegistrationForm from '../CourseRegistrationForm';
import { css } from '@pigment-css/react';
import { useVisuallyHidden } from 'react-aria';

function Input({
  label,
  description,
  type,
  name,
  isHideLabel,
  ...delegated
}: {
  label: string;
  description?: string;
  isHideLabel?: boolean;
  type?: string;
  name: string;
} & InputProps) {
  const { visuallyHiddenProps } = useVisuallyHidden();
  return (
    <div>
      <Field>
        {isHideLabel ? (
          <Label {...visuallyHiddenProps}>{label}</Label>
        ) : (
          <Label>{label}</Label>
        )}
        <Description>{description}</Description>
        <HeadlessInput
          className={css({
            [`${CourseRegistrationForm} &`]: {
              width: '100%',
              border: 'solid 2px hsla(0, 0%, 24%, 1)',
              borderRadius: '4px',
            },
          })}
          name={name}
          type={type}
          {...delegated}
        />
      </Field>
    </div>
  );
}

export default Input;
