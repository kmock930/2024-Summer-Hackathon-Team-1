import CourseRegistrationForm from '@/components/CourseRegistrationForm';
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

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <CenterWrapper>
      <Wrapper>
        <HeadingWrapper>
          <h1>Course Registration Form: {params.slug}</h1>
          <Select
            placeholder='Select a Language'
            options={[
              { value: 'en', text: 'English' },
              { value: 'zh-Hans', text: '中文(简体)' },
              { value: 'zh-Hant', text: '中文(繁體)' },
            ]}
            defaultValue='en'
            className={css({
              position: 'absolute',
              right: '0',
            })}
          />
        </HeadingWrapper>
        <CourseRegistrationForm surveyId={params.slug} />
      </Wrapper>
    </CenterWrapper>
  );
}
