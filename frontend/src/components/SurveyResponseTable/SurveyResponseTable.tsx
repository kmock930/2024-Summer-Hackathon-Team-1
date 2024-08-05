import {
  MRT_ColumnDef,
  useMantineReactTable,
  MRT_TableContainer,
} from 'mantine-react-table';
import * as React from 'react';

const data = [
  {
    name: 'Chan Siu Man(He/Him)',
    age: '6',
    specialNeeds: 'No Mango, No Peanut Butter',
    courseEnrolled: `Kids Can Cook,
Nature Seekers Adventure,
Lego Lab,
Chaotic Concert Carnival,
Little Edison’s Laboratory,
My Camp’s Got Talent,
NASA Space Station,
The Sustainable You`,
    careService: 'Before Care (7:30am to 9:00am)',
    timeApplied: '12 Jun 2024 10:32:78',
  },
  {
    name: 'Chan Siu Man(He/Him)',
    age: '6',
    specialNeeds: 'No Mango, No Peanut Butter',
    courseEnrolled: `Kids Can Cook,
Nature Seekers Adventure,
Lego Lab,
Chaotic Concert Carnival,
Little Edison’s Laboratory,
My Camp’s Got Talent,
NASA Space Station,
The Sustainable You`,
    careService: 'Before Care (7:30am to 9:00am)',
    timeApplied: '12 Jun 2024 10:32:78',
  },
  {
    name: 'Chan Siu Man(He/Him)',
    age: '6',
    specialNeeds: 'No Mango, No Peanut Butter',
    courseEnrolled: `Kids Can Cook,
Nature Seekers Adventure,
Lego Lab,
Chaotic Concert Carnival,
Little Edison’s Laboratory,
My Camp’s Got Talent,
NASA Space Station,
The Sustainable You`,
    careService: 'Before Care (7:30am to 9:00am)',
    timeApplied: '12 Jun 2024 10:32:78',
  },
  {
    name: 'Chan Siu Man(He/Him)',
    age: '6',
    specialNeeds: 'No Mango, No Peanut Butter',
    courseEnrolled: `Kids Can Cook,
Nature Seekers Adventure,
Lego Lab,
Chaotic Concert Carnival,
Little Edison’s Laboratory,
My Camp’s Got Talent,
NASA Space Station,
The Sustainable You`,
    careService: 'Before Care (7:30am to 9:00am)',
    timeApplied: '12 Jun 2024 10:32:78',
  },
  {
    name: 'Chan Siu Man(He/Him)',
    age: '6',
    specialNeeds: 'No Mango, No Peanut Butter',
    courseEnrolled: `Kids Can Cook,
Nature Seekers Adventure,
Lego Lab,
Chaotic Concert Carnival,
Little Edison’s Laboratory,
My Camp’s Got Talent,
NASA Space Station,
The Sustainable You`,
    careService: 'Before Care (7:30am to 9:00am)',
    timeApplied: '12 Jun 2024 10:32:78',
  },
];

function SurveyResponseTable() {
  const columns = React.useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name (Pronounce)',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'specialNeeds',
        header: 'Special Need',
      },
      {
        accessorKey: 'courseEnrolled',
        header: 'Course Enrolled',
      },
      {
        accessorKey: 'careService',
        header: 'Care Service',
      },
      {
        accessorKey: 'timeApplied',
        header: 'Time Applied',
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
    <div>
      <MRT_TableContainer table={table} />
    </div>
  );
}

export default SurveyResponseTable;
