import Dashboard from '@/components/Dashboard';
import Sidebar from '@/components/Sidebar';
import StudentForm from '@/components/StudentForm';
import { styled } from '@pigment-css/react';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export default function Page() {
  return (
    <Dashboard>
      <StudentForm />
    </Dashboard>
  );
}
