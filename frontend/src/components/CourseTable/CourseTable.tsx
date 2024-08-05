'use client';
import { css, styled } from '@pigment-css/react';
import {
  MRT_GlobalFilterTextInput,
  MRT_TableContainer,
  MRT_ToggleFiltersButton,
  MRT_ToggleGlobalFilterButton,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import * as React from 'react';
import TopBar from '../TopBar';
import Link from '../Link';

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

  return (
    <Wrapper>
      <TopBar>
        <ToolWrapper>
          <MRT_GlobalFilterTextInput table={table} />
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
            href='/admin/courses/create'
          >
            Create New Course
          </Link>
        </ToolWrapper>
      </TopBar>

      <MRT_TableContainer table={table} />
    </Wrapper>
  );
}

export default CourseTable;
