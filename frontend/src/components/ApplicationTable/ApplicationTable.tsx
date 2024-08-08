'use client';
import * as React from 'react';
import { useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import Table from '../Table';
import useSWR from 'swr';
import { fetcher } from '@/utils';
import { Survey } from '@/types';

const data = [
  {
    name: 'Summer 2024  S.T.E.A.M. Camp',
    ageGroup: '3-6',
    time: '2 Jul to 23 Aug',
    owner: 'User 103594923',
    lastEdit: '12 Jun 2024 10:32:78',
  },
  {
    name: 'Summer 2025 S.T.E.A.M. Camp',
    ageGroup: '3-6',
    time: '2 Jul to 23 Aug',
    owner: 'User 103594923',
    lastEdit: '12 Jun 2024 10:32:78',
  },
  {
    name: 'Summer 2024  S.T.E.A.M. Camp',
    ageGroup: '3-6',
    time: '2 Jul to 23 Aug',
    owner: 'User 103594923',
    lastEdit: '12 Jun 2024 10:32:78',
  },
  {
    name: 'Summer 2024  S.T.E.A.M. Camp',
    ageGroup: '3-6',
    time: '2 Jul to 23 Aug',
    owner: 'User 103594923',
    lastEdit: '12 Jun 2024 10:32:78',
  },
];

function ApplicationTable() {
  const { data } = useSWR<{ surveys: Survey[] }>('surveys', fetcher);
  const columns = React.useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: 'survey_name.en-us',
        header: 'Name',
      },
      {
        accessorKey: 'age_group',
        header: 'Age Group',
      },
      {
        accessorKey: 'period',
        header: 'Period',
      },
      {
        accessorKey: 'created_by',
        header: 'Owner',
      },
      {
        accessorFn: (row) => (
          row.courses.map((course: any) => course.course_name['en-us']).join(', ')
        ),
        header: 'Courses',
      }
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: data ?? [],
    enableRowSelection: true,
  });

  return <Table name='application' table={table} />;
}

export default ApplicationTable;
