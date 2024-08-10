import SurveyForm from '@/components/SurveyForm';
import Sidebar from '@/components/Sidebar';
import { styled } from '@pigment-css/react';
import Dashboard from '@/components/Dashboard';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Dashboard>
      <SurveyForm id={params.id} />
    </Dashboard>
  );
}
