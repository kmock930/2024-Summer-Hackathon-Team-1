import { MRT_TableInstance } from 'mantine-react-table';
import React from 'react';

export type CheckboxProps = {
  value?: string;
  label?: string;
  hideLabel?: boolean;
  children?: React.ReactNode;
  slot?: string;
};

export interface ICourse {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  daysOfWeek: string;
  startTime: string;
  endTime: string;
  weeks: string;
}

export interface ISurvey {
  surveyNameEN: string;
  surveyNameZhHant: string;
  surveyNameZhHans: string;
  CoursesEnabled: ICourse[];
  isCareEnabled: boolean;
  isCareOption: [];
}

export type SurveyFormProps = {
  survey?: ISurvey;
};

export type TableProps = {
  table: MRT_TableInstance;
  name: string;
  isEnableCreate?: boolean;
  isEnableTopBar?: boolean;
  isEnableGlobalFilter?: boolean;
  isEnableFilter?: boolean;
};
