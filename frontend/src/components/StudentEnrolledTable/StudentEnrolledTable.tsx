import { fetcher } from '@/utils';
import { MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import * as React from 'react';
import useSWR from 'swr';
import Table from '../Table';

function StudentEnrolledTable({ id }: { id: string }) {
  const { data: studentEnrolledData, isLoading: isSurveyDataLoading } =
    useSWR<any>(`course-registration?course_id=${id}`, fetcher);

  const columns = React.useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorFn: (row: any) => {
          return `${row.firstname} ${row.lastname} (${row.pronounce})`;
        },
        header: 'Name (Pronounce)',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'student.special_need',
        header: 'Special Need',
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: studentEnrolledData?.student,
    enableRowSelection: true,
  });

  return (
    <div>
      <Table name='studentEnrolled' isEnableTopBar={false} table={table} />
    </div>
  );
}

export default StudentEnrolledTable;
