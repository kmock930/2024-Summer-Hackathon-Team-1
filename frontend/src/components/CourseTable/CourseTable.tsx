'use client';
import { useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import * as React from 'react';
import Table from '../Table';

const data = [
  {
    name: 'Kids Can Cook',
    survey: 'Summer 2024 S.T.E.A.M. Camp',
    ageGroup: '3-6',
    time: 'July 2 to 5 (Tue- Fri) 9am-3pm',
    owner: 'User 103594923',
    lastEdit: '12 Jun 2024 10:32:78',
  },
];

function CourseTable() {
  const columns = React.useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'survey',
        header: 'Survey',
      },
      {
        accessorKey: 'ageGroup',
        header: 'Age Group',
      },
      {
        accessorKey: 'owner',
        header: 'Owner',
      },
      {
        accessorKey: 'lastEdit',
        header: 'Last Edit',
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
  });

  return <Table name='course' table={table} />;
}

export default CourseTable;
