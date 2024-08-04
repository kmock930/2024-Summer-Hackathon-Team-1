import { FieldProps } from '@formiz/core';
import * as RadixCheckbox from '@radix-ui/react-checkbox';

export type CheckboxProps = {
  id: string;
  label: string;
  children?: React.ReactNode;
} & FieldProps<RadixCheckbox.CheckedState>;
