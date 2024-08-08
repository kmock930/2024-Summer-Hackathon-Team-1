import { FieldProps } from '@formiz/core';
import { InputProps as HeadlessUIInputProps } from '@headlessui/react';
import { MRT_TableInstance } from 'mantine-react-table';
import React from 'react';

interface BaseModel {
  id: string;
  creeated_at: string | null;
  created_by: string | null;
  modified_at: string | null;
  modified_by: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
  is_active: boolean;
}

export interface ThreeLangString {
  'en-us': string;
  'zh-hk': string;
  'zh-cn': string;
}

export interface Student {
  name: string;
  pronounce: string;
}

export interface Course extends BaseModel{
  course_name: ThreeLangString;
  quota: number;
  age_group: string;
  time: string;
  course_language: string;
  admin_in_charge: string[];
}

export interface Survey extends BaseModel{
  survey_name: ThreeLangString;
  survey_link: string;
  course_question: ThreeLangString;
  be_camp_question: ThreeLangString;
  be_camp_answers: ThreeLangString[];
  age_group: string;
  course_ids: number[];
  courses: {
    id: number;
    course_name: ThreeLangString;
  }[];
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
