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
        id: 'paraent',
        // accessorKey: 'parent.parent_name',
        accessorFn: (row) => row.parent.map(p => p.parent_name).join(', '),
        header: 'Parent',
      },
      {
        accessorFn: (row) => row.parent.map(p => p.parent_rel).join(', '),
        header: 'Relationship',
      },
      {
        accessorFn: (row) => (
          row.registered_courses.length !== 0 ?
            row.registered_courses.map(c => c.course.course_name).join(', '):
            'N/A'
        ),
        header: 'Courses',
      },
      {
        accessorKey: 'account_credit',
        header: 'Account Credit',
      }
      // {
      //   accessorKey: 'specialNeeds',
      //   header: 'Special Needs',
      // },
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
