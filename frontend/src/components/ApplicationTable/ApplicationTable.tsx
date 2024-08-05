'use client';
import * as React from 'react';
import { useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import Table from '../Table';

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
  const columns = React.useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'ageGroup',
        header: 'Age Group',
      },
      {
        accessorKey: 'time',
        header: 'Time',
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

  return <Table name='application' table={table} />;
}

export default ApplicationTable;
