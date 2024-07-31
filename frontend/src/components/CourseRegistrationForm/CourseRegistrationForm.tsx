'use client';
import * as React from 'react';
import { Formiz, FormizStep, useForm } from '@formiz/core';
import useSWR from 'swr';
import { styled } from '@pigment-css/react';
import FormStepper from '../FormStepper';
import { fetcher } from '@/utils';

const Wrapper = styled.div`
  max-width: 1100px;
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
  padding: 24px 40px;
  color: var(--color-text);
`;

export interface Title {
  name: string;
}

function CourseRegistrationForm() {
  const form = useForm();

  const {
    data: courseData,
    error,
    isLoading,
  } = useSWR('http://localhost:3001/courses', fetcher);
  console.log(courseData);

  const { data: formTitle } = useSWR<Title>(
    'http://localhost:3001/title',
    fetcher
  );

  return (
    <Wrapper>
      <h1>{JSON.stringify(formTitle?.name)}</h1>
      <Formiz connect={form}>
        <FormStepper />

        <FormizStep name='course-information' label='Course Information'>
          {JSON.stringify(courseData)}
        </FormizStep>
        <FormizStep
          name='personal-information'
          label='Personal Information'
        ></FormizStep>
        <FormizStep
          name='one-time-password'
          label='One-time Password'
        ></FormizStep>
        <FormizStep name='account-setting' label='Account Setting'></FormizStep>
        <FormizStep
          name='emergency-contact'
          label='Emergency Contact'
        ></FormizStep>
        <FormizStep name='consent' label='Consent'></FormizStep>
        <FormizStep
          name='application-confirm'
          label='Application Confirm'
        ></FormizStep>
      </Formiz>
    </Wrapper>
  );
}

export default CourseRegistrationForm;
