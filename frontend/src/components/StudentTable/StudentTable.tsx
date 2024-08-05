'use client';
import { css, styled } from '@pigment-css/react';
import {
  type MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_TableContainer,
  MRT_ToggleFiltersButton,
  MRT_ToggleGlobalFilterButton,
  useMantineReactTable,
} from 'mantine-react-table';
import * as React from 'react';
import TopBar from '../TopBar';
import Link from '../Link';

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
    name: 'Chan Siu Man(He/Him)',
    age: '6',
    parent: 'Chan Tai Man(Father)',
    specialNeeds: 'No Mango, No Peanut Butter',
    courseEnrolled: `Kids Can Cook,
Nature Seekers Adventure,
Lego Lab,
Chaotic Concert Carnival,
Little Edison’s Laboratory,
My Camp’s Got Talent,
NASA Space Station,
The Sustainable You`,
  },
];

function StudentTable() {
  const columns = React.useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'parent',
        header: 'Parent',
      },
      {
        accessorKey: 'specialNeeds', //normal accessorKey
        header: 'Special Needs',
      },
      {
        accessorKey: 'courseEnrolled',
        header: 'Course Enrolled',
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
            href='/admin/students/create'
          >
            Create New Student
          </Link>
        </ToolWrapper>
      </TopBar>

      <MRT_TableContainer table={table} />
    </Wrapper>
  );
}

export default StudentTable;
