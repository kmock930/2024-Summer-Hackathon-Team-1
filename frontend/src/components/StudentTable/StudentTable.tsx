'use client';
import { type MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import * as React from 'react';
import Table from '../Table';
import useSWR from 'swr';
import { fetcher } from '@/utils';
import { Student } from '@/types';

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
  const { data } = useSWR<Student[]>('students', fetcher);

  const columns = React.useMemo<MRT_ColumnDef<Student>[]>(
    () => [
      {
        id: 'name',
        accessorFn: (row) => `${row.name}(${row.pronounce})`,
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
        accessorKey: 'specialNeeds',
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
    data: data ?? [],
    enableRowSelection: true,
  });

  return <Table name='student' table={table} />;
}

export default StudentTable;
