'use client';
import { useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import * as React from 'react';
import Table from '../Table';
import useSWR from 'swr';
import { fetcher } from '@/utils';
import { Course } from '@/types';
import { useRouter } from 'next/navigation';

function CourseTable() {
  const router = useRouter();
  const { data } = useSWR<Course[]>('courses', fetcher);

  const columns = React.useMemo<MRT_ColumnDef<Course>[]>(
    () => [
      {
        accessorKey: 'course_name.en-us',
        header: 'Name',
      },
      // {
      //   accessorFn: (row) => (
      //     row.surveys.map((survey: any) => survey.survey_name['en-us']).join(', ')
      //   ),
      //   header: 'Survey',
      // },
      {
        accessorKey: 'age_group',
        header: 'Age Group',
      },
      {
        accessorKey: 'created_by',
        header: 'Owner',
      },
      {
        accessorFn: (row) => new Date(row.modified_dt || 0).toLocaleString(),
        header: 'Last Edit',
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: data ?? [],
    enableRowSelection: true,
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        router.push(`/admin/courses/${row.original.id}`);
      },
      sx: { cursor: 'pointer' },
    }),
  });

  return (
    <>
      <Table name='course' table={table} />
    </>
  );
}

export default CourseTable;
