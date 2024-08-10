'use client';
import * as React from 'react';
import { useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import Table from '../Table';
import useSWR from 'swr';
import { fetcher } from '@/utils';
import { Survey } from '@/types';
import { useRouter } from 'next/navigation';

function ApplicationTable() {
  const { data, isLoading } = useSWR<Survey[]>('surveys', fetcher);
  const router = useRouter();

  const columns = React.useMemo<MRT_ColumnDef<Survey>[]>(
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
        accessorFn: (row) =>
          row.courses &&
          row.courses
            .map((course: any) => course.course_name['en-us'])
            .join(', '),
        header: 'Courses',
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
        router.push(`/admin/applications/${row.original.id}`);
      },
      sx: { cursor: 'pointer' },
    }),
    state: { isLoading: isLoading },
  });

  return <Table name='application' table={table} />;
}

export default ApplicationTable;
