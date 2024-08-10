import SurveyForm from '@/components/SurveyForm';
import Dashboard from '@/components/Dashboard';
import CourseForm from '@/components/CourseForm';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Dashboard>
      <CourseForm id={params.id} />
    </Dashboard>
  );
}
