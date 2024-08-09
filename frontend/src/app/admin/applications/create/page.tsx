import SurveyForm from '@/components/SurveyForm';
import Sidebar from '@/components/Sidebar';
import { styled } from '@pigment-css/react';
import Dashboard from '@/components/Dashboard';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export default function Page() {
  return (
    <Dashboard>
      <SurveyForm />
    </Dashboard>
  );
}
