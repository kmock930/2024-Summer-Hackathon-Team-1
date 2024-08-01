'use client';
import * as React from 'react';
import { Formiz, FormizStep, useForm } from '@formiz/core';
import useSWR from 'swr';
import { css, styled } from '@pigment-css/react';
import FormStepper from '../FormStepper';
import { fetcher } from '@/utils';
import Checkbox from '../Checkbox';
import Select from '../Select';

interface Title {
  name: string;
}

interface Course {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  daysOfWeek: string;
  startTime: string;
  endTime: string;
  weeks: string;
}

function CourseRegistrationForm() {
  const form = useForm();

  const {
    data: courseData,
    error,
    isLoading,
  } = useSWR<Course[]>('http://localhost:3001/courses', fetcher);
  console.log(courseData);

  const { data: formTitle } = useSWR<Title>(
    'http://localhost:3001/title',
    fetcher
  );

  return (
    <Wrapper>
      <div
        className={css({
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        })}
      >
        <h1>{JSON.stringify(formTitle?.name)}</h1>
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
      </div>
      <FormWrapper>
        <Formiz connect={form} autoForm='step'>
          <FormStepper />

          <FormStepContent>
            <FormizStep name='course-information' label='Course Information'>
              <h2>Course Selection</h2>
              <h3>
                1. Please choose the camp(s) for which you are registering:
              </h3>
              <CheckboxWrapper>
                {courseData?.map((course) => {
                  return (
                    <React.Fragment key={course.id}>
                      <Checkbox
                        id={course.id}
                        key={course.id}
                        label={course.name}
                      >
                        <div>
                          {course.startDate} to {course.endDate} (
                          {course.daysOfWeek})
                        </div>
                        <div>
                          {course.startTime} - {course.endTime}
                        </div>
                      </Checkbox>
                    </React.Fragment>
                  );
                })}
              </CheckboxWrapper>
              <h3>2. Before and/or After Camp Option.</h3>
              <Select
                placeholder='Select a Before and/or After Camp Option'
                options={[
                  { value: 'dummy1', text: 'Before Care (7:30am to 9:00am)' },
                  { value: 'dummy2', text: 'After Care' },
                ]}
              />
            </FormizStep>
            <FormizStep
              name='personal-information'
              label='Personal Information'
            ></FormizStep>
            <FormizStep
              name='one-time-password'
              label='One-time Password'
            ></FormizStep>
            <FormizStep
              name='account-setting'
              label='Account Setting'
            ></FormizStep>
            <FormizStep
              name='emergency-contact'
              label='Emergency Contact'
            ></FormizStep>
            <FormizStep name='consent' label='Consent'></FormizStep>
            <FormizStep
              name='application-confirm'
              label='Application Confirm'
            ></FormizStep>
            <Button type='submit'>
              {form.steps && form.currentStep?.index === form.steps?.length - 1
                ? 'Submit'
                : 'Next'}
            </Button>
          </FormStepContent>
        </Formiz>
      </FormWrapper>
    </Wrapper>
  );
}

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

const FormWrapper = styled.div`
  width: 100%;
`;

const FormStepContent = styled.div`
  background-color: hsla(210, 100%, 95%, 1);
  border-radius: 0 0 16px 16px;
  color: black;
  margin: calc((var(--padding) * -1) + 4px);
  padding: var(--padding);
`;

const CheckboxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const Button = styled.button`
  background-color: var(--color-blue);
  color: var(--color-text);
  border: 0;
  border-radius: 8px;
  width: 272px;
  height: 48px;
  margin: auto;
  margin-top: 20px;
  display: block;

  &:hover {
    cursor: pointer;
  }
`;

export default CourseRegistrationForm;
