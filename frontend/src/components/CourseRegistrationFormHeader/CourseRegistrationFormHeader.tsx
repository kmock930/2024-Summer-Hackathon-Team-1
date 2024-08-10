'use client';
import { css, styled } from '@pigment-css/react';
import * as React from 'react';
import Select from '../Select';
import { fetcher } from '@/utils';
import { Survey } from '@/types';
import useSWR from 'swr';

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

function CourseRegistrationFormHeader({ surveyId }: { surveyId: string }) {
  const { data: surveyData, isLoading: isSurveyDataLoading } = useSWR<Survey[]>(
    `surveys?id=${surveyId}`,
    fetcher
  );

  return (
    <HeadingWrapper>
      <h1>
        {isSurveyDataLoading
          ? 'Loading...'
          : `${surveyData?.[0].survey_name?.['en-us']}`}
      </h1>
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
  );
}

export default CourseRegistrationFormHeader;
