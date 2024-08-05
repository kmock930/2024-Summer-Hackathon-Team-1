'use client';
import { css, styled } from '@pigment-css/react';
import * as React from 'react';
import {
  MantineReactTable,
  MRT_TableContainer,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleGlobalFilterButton,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { Link } from 'react-aria-components';
import TopBar from '../TopBar';

const Wrapper = styled.div`
  padding: 36px;
  width: 100%;
  background-color: hsla(210, 100%, 95%, 1);
`;

const ToolWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
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
    data,
    enableEditing: true,
    enableRowSelection: true,
    renderToolbarInternalActions: ({ table }) => {
      return (
        <>
          <MRT_ToggleGlobalFilterButton table={table} />
          <MRT_ToggleFiltersButton table={table} />
          <MRT_ToggleFullScreenButton table={table} />
          <Link href='/admin/applications/create'>Create New Survey</Link>
        </>
      );
    },
  });

  return (
    <Wrapper>
      <TopBar>
        <ToolWrapper>
          <MRT_ToggleGlobalFilterButton
            table={table}
            className={css({
              color: 'hsla(210, 77%, 33%, 1)',
            })}
          />
          <MRT_ToggleFiltersButton
            table={table}
            className={css({
              color: 'hsla(210, 77%, 33%, 1)',
            })}
          />
          <Link
            className={css({
              background: 'hsla(0, 0%, 100%, 1)',
              border: '2px solid hsla(210, 77%, 33%, 1)',
              width: '160px',
              height: '32px',
              color: 'hsla(210, 77%, 33%, 1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
              borderRadius: '4px',
            })}
            href='/admin/applications/create'
          >
            Create New Survey
          </Link>
        </ToolWrapper>
      </TopBar>

      <MRT_TableContainer table={table} />
    </Wrapper>
  );
}

export default ApplicationTable;
