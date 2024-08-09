import { FormizSelectProps, SelectOptionProps } from '@/types';
import { useField } from '@formiz/core';
import * as React from 'react';
import Select from '../Select';

function FormizSelect<FormattedValue = SelectOptionProps['value']>(
  props: FormizSelectProps<FormattedValue>
) {
  const { value, setValue } = useField(props);
  return (
    <Select
      label={props.label}
      options={props.options}
      value={value ?? ''}
      setValue={setValue}
      placeholder=''
      defaultValue={value ?? ''}
    />
  );
}

export default FormizSelect;
