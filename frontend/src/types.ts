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
