import CourseRegistrationForm from '@/components/CourseRegistrationForm';
import CourseRegistrationFormHeader from '@/components/CourseRegistrationFormHeader';
import Select from '@/components/Select';
import { css, styled } from '@pigment-css/react';
import React from 'react';

const Wrapper = styled.div`
  --padding: 24px;
  max-width: 1100px;
  width: 1100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(
    276.54deg,
    #135395 -9.35%,
    #688db4 27.11%,
    #2b72bc 77.45%
  );
  border-radius: 16px;
  border: 4px;
  padding: var(--padding);
  color: var(--color-text);
`;

const CenterWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <CenterWrapper>
      <Wrapper>
        <CourseRegistrationFormHeader surveyId={params.slug} />
        <CourseRegistrationForm surveyId={params.slug} />
      </Wrapper>
    </CenterWrapper>
  );
}
