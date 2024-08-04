export type CheckboxProps = {
  value: string;
  label?: string;
  children?: React.ReactNode;
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
