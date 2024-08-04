'use client';
import { styled } from '@pigment-css/react';
import * as React from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';

const Wrapper = styled.div`
  padding: 36px;
  width: 100%;
`;

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
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
      },
      {
        accessorKey: 'ageGroup',
        header: 'Age Group',
      },
      {
        accessorKey: 'time', //normal accessorKey
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
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableEditing: true,
  });

  return (
    <Wrapper>
      <MantineReactTable table={table} />
    </Wrapper>
  );
}

export default ApplicationTable;
