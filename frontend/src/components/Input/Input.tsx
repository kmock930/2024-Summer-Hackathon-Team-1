import {
  Input as HeadlessInput,
  Description,
  Field,
  Label,
} from '@headlessui/react';
import * as React from 'react';
import CourseRegistrationForm from '../CourseRegistrationForm';
import { css } from '@pigment-css/react';

function Input({
  label,
  description,
  type,
  name,
}: {
  label: string;
  description?: string;
  type: string;
  name: string;
}) {
  return (
    <div
      className={css({
        [`${CourseRegistrationForm} &`]: {
          display: 'flex',
        },
      })}
    >
      <Field>
        <Label>{label}</Label>
        <Description>{description}</Description>
        <HeadlessInput name={name} type={type} />
      </Field>
    </div>
  );
}

export default Input;
