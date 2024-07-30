'use client';
import * as React from 'react';
import { Formiz, FormizStep, useForm } from '@formiz/core';
import useSWR from 'swr';
import { fetcher } from '@/utils';
import { styled } from '@pigment-css/react';

const Wrapper = styled.div`
  max-width: 1100px;
`;

function CourseRegistrationForm() {
  const form = useForm();

  const {
    data: courseData,
    error,
    isLoading,
  } = useSWR('http://localhost:3001/courses', fetcher);
  console.log(courseData);

  return (
    <Wrapper>
      <Formiz connect={form}>
        <div>Current Step: {form?.currentStep?.index ?? 0 + 1}</div>
        <div>Total Step: {form?.steps?.length}</div>
        <FormizStep name='step1'>{JSON.stringify(courseData)}</FormizStep>
        <FormizStep name='step2'></FormizStep>
        <FormizStep name='step3'></FormizStep>
        <FormizStep name='step4'></FormizStep>
        <FormizStep name='step5'></FormizStep>
        <FormizStep name='step6'></FormizStep>
        <FormizStep name='step7'></FormizStep>
      </Formiz>
    </Wrapper>
  );
}

export default CourseRegistrationForm;
