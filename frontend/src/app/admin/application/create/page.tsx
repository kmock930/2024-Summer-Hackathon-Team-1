import CreateSurveyForm from '@/components/CreateSurveyForm';
import Sidebar from '@/components/Sidebar';
import { styled } from '@pigment-css/react';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export default function Page() {
  return (
    <Wrapper>
      <Sidebar />

      <CreateSurveyForm />
    </Wrapper>
  );
}
