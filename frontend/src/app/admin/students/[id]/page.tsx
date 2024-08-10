import StudentForm from '@/components/StudentForm';
import Dashboard from '@/components/Dashboard';
import CourseForm from '@/components/CourseForm';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Dashboard>
      <StudentForm id={params.id} />
    </Dashboard>
  );
}
