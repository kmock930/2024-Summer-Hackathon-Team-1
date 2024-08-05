import SurveyForm from '@/components/SurveyForm';
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

      <SurveyForm />
    </Wrapper>
  );
}
