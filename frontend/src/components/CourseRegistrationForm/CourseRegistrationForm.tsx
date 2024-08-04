'use client';
import * as React from 'react';
import { Formiz, FormizStep, useForm } from '@formiz/core';
import useSWR from 'swr';
import { css, styled } from '@pigment-css/react';
import FormStepper from '../FormStepper';
import { fetcher, range } from '@/utils';
import Checkbox from '../Checkbox';
import Select from '../Select';
import Input from '../Input';
import OTPInput from '../OTPInput';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { randomUUID } from 'crypto';

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
  height: 660px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    opacity: 0.8;
  }
`;

function CourseRegistrationForm() {
  const form = useForm();
  const newChildrenForm = useForm();
  const [isDisplayNewChildrenForm, setIsDisplayNewChildrenForm] =
    React.useState(false);

  const toggleNewChildrenForm = () =>
    setIsDisplayNewChildrenForm(!isDisplayNewChildrenForm);

  const {
    data: courseData,
    error,
    isLoading,
  } = useSWR<Course[]>('http://localhost:3001/courses', fetcher);

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
              <h3>Please choose the camp(s) for which you are registering:</h3>
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
              <Select
                label='Before and/or After Camp Option'
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
            >
              <h2>Login / Register</h2>
              <Input label='Email' type='email' name='email' />
              <Input label='Phone Number' type='text' name='phoneNo' />
            </FormizStep>
            <FormizStep name='one-time-password' label='One-time Password'>
              <h2>One-time Password</h2>
              <div>We’ve sent an OTP(One-Time Password) to your email.</div>
              <div>
                Please enter the 6 digits OTP value to complete the
                verification.
              </div>
              <OTPInput length={6} />
            </FormizStep>
            <FormizStep name='account-setting' label='Account Setting'>
              <h2>Account Setting</h2>
              {!isDisplayNewChildrenForm && (
                <>
                  <div>
                    Please select the children who are going to apply the course
                  </div>

                  <CheckboxWrapper>
                    {range(5).map((index) => {
                      return (
                        <Checkbox id='dummy' key={index} label='Dummy'>
                          <div>Chan Siu Ming</div>
                          <div>Birth date: 18Jul 2016</div>
                        </Checkbox>
                      );
                    })}
                  </CheckboxWrapper>
                  <hr />
                  <button
                    type='button'
                    className={css({
                      display: 'flex',
                      gap: '8px',
                      background: 'transparent',
                      color: 'var(--color-blue)',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: 0,
                      fontSize: '1.25rem',

                      [`&:hover`]: {
                        cursor: 'pointer',
                      },
                    })}
                    onClick={toggleNewChildrenForm}
                  >
                    <PlusCircledIcon
                      className={css({
                        transform: 'scale(2)',
                      })}
                    />
                    Add A New Children
                  </button>
                </>
              )}
              {isDisplayNewChildrenForm && (
                <div>
                  <button
                    type='button'
                    className={css({
                      display: 'flex',
                      gap: '8px',
                      background: 'transparent',
                      color: 'var(--color-blue)',
                      width: '100%',
                      alignItems: 'center',
                      border: 0,
                      fontSize: '1.25rem',

                      [`&:hover`]: {
                        cursor: 'pointer',
                      },
                    })}
                    onClick={toggleNewChildrenForm}
                  >
                    {'< Back to select'}
                  </button>
                  <Formiz connect={newChildrenForm}>
                    <Input
                      label="Student's Legal Name"
                      type='text'
                      name='student-name'
                    />
                    <Select
                      label="Student's Gender"
                      placeholder='Please select your answer'
                      options={[
                        { value: 'dummy1', text: 'Dummy1' },
                        { value: 'dummy2', text: 'Dummy2' },
                      ]}
                    />
                    <Input
                      label="Student's Date of Birth"
                      type='date'
                      name='student-dob'
                    />
                    <Input
                      label="Student's Home Address"
                      type='text'
                      name='student-address'
                    />
                    <Select
                      label='Does the participant have any special needs, allergies, food restriction, or requires an Epi-Pen, asthma inhaler, or other?'
                      placeholder='Please select your answer'
                      options={[
                        { value: 'dummy1', text: 'Dummy1' },
                        { value: 'dummy2', text: 'Dummy2' },
                      ]}
                    />
                  </Formiz>
                </div>
              )}
            </FormizStep>
            <FormizStep
              name='emergency-contact'
              label='Emergency Contact'
            ></FormizStep>
            <FormizStep name='consent' label='Consent'></FormizStep>
            <FormizStep
              name='application-confirm'
              label='Application Confirm'
            ></FormizStep>
            <div className={css({ display: 'flex', gap: '8px' })}>
              <Button type='submit'>
                {form.steps &&
                form.currentStep?.index === form.steps?.length - 1
                  ? 'Submit'
                  : 'Next Step'}
              </Button>
              {form.steps &&
                form.currentStep?.index !== 0 &&
                form.currentStep?.index !== form.steps?.length - 1 && (
                  <Button
                    type='button'
                    onClick={() => form.goToPreviousStep()}
                    style={{ backgroundColor: 'grey' }}
                  >
                    Back
                  </Button>
                )}
            </div>
          </FormStepContent>
        </Formiz>
      </FormWrapper>
    </Wrapper>
  );
}

export default CourseRegistrationForm;
