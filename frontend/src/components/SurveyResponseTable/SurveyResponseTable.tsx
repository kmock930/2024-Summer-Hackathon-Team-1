import {
  MRT_ColumnDef,
  useMantineReactTable,
  MRT_TableContainer,
} from 'mantine-react-table';
import * as React from 'react';
import Table from '../Table';
import { fetcher } from '@/utils';
import useSWR from 'swr';
import { Survey } from '@/types';

function SurveyResponseTable({ id }: { id: string }) {
  const { data: surveyData, isLoading: isSurveyDataLoading } = useSWR<Survey>(
    `course-registration?survey_id=${id}`,
    fetcher
  );
  const columns = React.useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorFn: (row: any) => {
          return `${row.student.firstname}${row.student.lastname} (${row.student.pronounce})`;
        },
        header: 'Name (Pronounce)',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'student.special_need',
        header: 'Special Need',
      },
      {
        header: 'Course Enrolled',
        accessorFn: (row: any) => {
          // return `${row.courses.course_name['en-us']}`;
          return row.courses.map((course: any, index: number) => {
            if (!(index === row.courses.length - 1)) {
              return `${course.course_name['en-us']}, `;
            } else {
              return `${course.course_name['en-us']}`;
            }
          });
        },
      },
      {
        accessorKey: 'careService',
        header: 'Care Service',
      },
      {
        accessorKey: 'timeApplied',
        header: 'Time Applied',
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: surveyData?.responses || [],
    enableRowSelection: true,
  });

  return (
    <div>
      <Table name='surveyResponse' isEnableTopBar={false} table={table} />
    </div>
  );
}

export default SurveyResponseTable;
