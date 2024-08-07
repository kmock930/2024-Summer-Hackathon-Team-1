import { FieldProps } from '@formiz/core';
import { InputProps as HeadlessUIInputProps } from '@headlessui/react';
import { MRT_TableInstance } from 'mantine-react-table';
import React from 'react';

export interface Course {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  daysOfWeek: string;
  startTime: string;
  endTime: string;
  weeks: string;
}

export interface Student {
  name: string;
  pronounce: string;
}

export interface Survey {
  surveyNameEN: string;
  surveyNameZhHant: string;
  surveyNameZhHans: string;
  CoursesEnabled: Course[];
  isCareEnabled: boolean;
  isCareOption: [];
}

export type SurveyFormProps = {
  survey?: Survey;
};

export type TableProps<TData extends Record<string, any> = any> = {
  table: MRT_TableInstance<TData>;
  name: string;
  isEnableCreate?: boolean;
  isEnableTopBar?: boolean;
  isEnableGlobalFilter?: boolean;
  isEnableFilter?: boolean;
};

export type DashboardFormProps = {
  actions?: React.ReactNode;
  name?: string;
  children?: React.ReactNode;
};

export type InputProps<FormattedValue> = FieldProps<string, FormattedValue> & {
  label: string;
  description?: string;
  isHideLabel?: boolean;
  type?: string;
  name: string;
} & HeadlessUIInputProps;

export type CheckboxProps<FormattedValue> = FieldProps<
  boolean,
  FormattedValue
> & {
  value?: string;
  label?: string;
  hideLabel?: boolean;
  children?: React.ReactNode;
  slot?: string;
};

export interface SelectOptionProps {
  value: string;
  text: string;
}

export type SelectProps = {
  options: SelectOptionProps[];
  placeholder: string;
  className?: string;
  label?: string;
  value?: SelectOptionProps['value'];
  defaultValue?: SelectOptionProps['value'];
  setValue?: (fieldValue: string) => void;
};

export type FormizSelectProps<FormattedValue> = FieldProps<
  SelectOptionProps['value'],
  FormattedValue
> &
  SelectProps;
