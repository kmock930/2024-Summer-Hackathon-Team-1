import {
  Input as HeadlessInput,
  Description,
  Field,
  Label,
} from '@headlessui/react';
import * as React from 'react';
import CourseRegistrationForm from '../CourseRegistrationForm';
import { css } from '@pigment-css/react';
import { useVisuallyHidden } from 'react-aria';
import { useField } from '@formiz/core';
import { InputProps } from '@/types';

function Input<FormattedValue = string>(props: InputProps<FormattedValue>) {
  const { value, setValue, otherProps } = useField(props);
  const { isHideLabel, ...delegated } = otherProps;
  const { visuallyHiddenProps } = useVisuallyHidden();
  return (
    <div
      className={css({
        margin: '4px 0',
      })}
    >
      <Field>
        {isHideLabel ? (
          <Label {...visuallyHiddenProps}>{props.label}</Label>
        ) : (
          <Label>{props.label}</Label>
        )}
        <Description>{props.description}</Description>
        <HeadlessInput
          className={css({
            [`${CourseRegistrationForm} &`]: {
              width: '100%',
              border: 'solid 2px hsla(0, 0%, 24%, 1)',
              borderRadius: '4px',
            },
          })}
          type={props.type}
          value={value ?? ''}
          onChange={(event) => setValue(event.target.value)}
          {...delegated}
        />
      </Field>
    </div>
  );
}

export default Input;
