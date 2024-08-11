'use client';
import * as React from 'react';
import { Formiz, FormizStep, useForm, useFormFields } from '@formiz/core';
import { css, styled } from '@pigment-css/react';
import FormStepper from '../FormStepper';
import { fetcher, getParentByEmail, range, sendRequest } from '@/utils';
import Checkbox from '../Checkbox';
import Input from '../Input';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Icon } from '@iconify/react';
import { CheckboxGroup } from 'react-aria-components';
import FormContent from '../FormContent';
import dynamic from 'next/dynamic';
import FormizSelect from '../FormizSelect';
import useSWR from 'swr';
import { Course, Survey, Parent } from '@/types';
import useSWRMutation from 'swr/mutation';
import { Oval } from 'react-loader-spinner';

const OTPForm = dynamic(() => import('../OTPForm'), { ssr: false });

const FormWrapper = styled.div`
  width: 100%;
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

function CourseRegistrationForm({ surveyId }: { surveyId: string }) {
  const form = useForm({
    onSubmit: (values) => {
      // Parent ID / New Parent (check parentData?.[0].id;)
      values.parent_id = Number(parentData?.[0].id);
      values.parent = {
        firstname: values.parent.firstname,
        lastname: values.parent.lastname,
        email: values.email,
        tel: values.phoneNo,
      };

      // Student ID / New Student
      values.student_id = Number(Object.keys(values.childrens).filter(
        (c) => values.childrens[c] === true
      )[0]);
      delete values.childrens;
      // Parent ID / New Parent

      // Survey ID
      values.survey_id = Number(surveyId);

      // Course IDs
      values.course_ids = Object.keys(values.courses).filter(
        (c) => values.courses[c] === true
      );
      values.course_ids = values.course_ids.map(Number);
      delete values.courses;
      // Email
      // Tel
      values.tel = values.phoneNo;
      delete values.phoneNo;
      // Special Needs
      if (values.specialNeeds) {
        values.special_needs = values.specialNeeds;
        delete values.specialNeeds;
      }
      // Emergency Contact (JSON)
      values.emergency_contact = {
        name: values.emergencyContactName,
        phone: values.emergencyContactPhone,
      };
      delete values.emergencyContactName;
      // Pickup Arrangements
      values.pickup_arrangement = values.pickUpArragements;
      delete values.pickUpArragements;
      sendRequest('course-registration', values);
    },
  });
  const newChildrenForm = useForm({
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [isDisplayNewChildrenForm, setIsDisplayNewChildrenForm] =
    React.useState(false);
  const [isSubmited, setIsSubmited] = React.useState(false);
  const { data: courseData, isLoading: isCourseDataLoading } = useSWR<Course[]>(
    'courses',
    fetcher
  );
  const { data: surveyData, isLoading: isSurveyDataLoading } = useSWR<Survey[]>(
    `surveys?id=${surveyId}`,
    fetcher
  );
  const { data: parentData, trigger } = useSWRMutation<Parent[]>(
    `parents`,
    getParentByEmail
  );

  const fields = useFormFields({
    connect: form,
  });

  const toggleNewChildrenForm = () =>
    setIsDisplayNewChildrenForm(!isDisplayNewChildrenForm);

  return (
    <FormWrapper>
      <Formiz connect={form}>
        <FormStepper />
        <FormContent
          className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          })}
        >
          {isSurveyDataLoading ? (
            <Oval
              visible={true}
              height='80'
              width='80'
              color='#4fa94d'
              ariaLabel='oval-loading'
              wrapperStyle={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                flex: '1',
              }}
              wrapperClass=''
            />
          ) : (
            !isSubmited && (
              <>
                <FormizStep
                  name='course-information'
                  label='Course Information'
                >
                  <h2>Course Selection</h2>
                  <CheckboxGroup
                    className={css({
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '16px',
                    })}
                  >
                    {surveyData?.map((survey) => {
                      return survey?.courses.map((course) => {
                        return (
                          <React.Fragment key={course.id}>
                            <Checkbox
                              name={`courses.${course.id}`}
                              label={
                                course.course_name &&
                                course.course_name['en-us']
                              }
                              value={course.id}
                              key={course.id}
                            >
                              <div>{course.time}</div>
                            </Checkbox>
                          </React.Fragment>
                        );
                      });
                    })}
                  </CheckboxGroup>
                  <FormizSelect
                    label='Before and/or After Care Option'
                    placeholder='Select a Before and/or After Care Option'
                    name='ba_camp_options'
                    options={
                      surveyData?.[0].ba_camp_answers.map((option) => {
                        return {
                          value: option['en-us'],
                          text: option['en-us'],
                        };
                      }) || []
                    }
                  />
                </FormizStep>
                <FormizStep
                  name='personal-information'
                  label='Personal Information'
                >
                  <h2>Login / Register</h2>
                  <Input
                    label='Email'
                    type='email'
                    name='email'
                    placeholder='Please enter your answer'
                  />
                  <Input
                    label='Phone Number'
                    type='text'
                    name='phoneNo'
                    placeholder='Please enter your answer'
                  />
                </FormizStep>
                <FormizStep name='one-time-password' label='One-time Password'>
                  <OTPForm />
                </FormizStep>
                <FormizStep name='account-setting' label='Account Setting'>
                  <h2>Account Setting</h2>
                  {!isDisplayNewChildrenForm && (
                    <>
                      <div>
                        Please select the children who are going to apply the
                        course
                      </div>

                      <CheckboxWrapper>
                        {parentData?.[0].student?.map((student) => {
                          return (
                            <Checkbox
                              name={`childrens.${student.id}`}
                              value={student.id}
                              key={student.id}
                            >
                              <div>
                                {student.firstname} {student.lastname}
                              </div>
                              <div>Birth date: {student.dob}</div>
                              <div>{student.student_rel}</div>
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
                      <Input
                        label="Student's Legal First Name"
                        type='text'
                        name='student.firstname'
                        placeholder='Please enter your answer'
                      />
                      <Input
                        label="Student's Legal Last Name"
                        type='text'
                        name='student.lastname'
                        placeholder='Please enter your answer'
                      />
                      <FormizSelect
                        label="Student's Gender"
                        name='student.gender'
                        placeholder='Please select your answer'
                        options={[
                          { value: 'Male', text: 'Male' },
                          { value: 'Female', text: 'Female' },
                          { value: 'Others', text: 'Others' },
                        ]}
                      />
                      <Input
                        label="Student's Pronoun"
                        type='text'
                        name='student.pronoun'
                      />
                      <Input
                        label="Student's Date of Birth"
                        type='date'
                        name='student.dob'
                      />
                      <Input
                        label="Student's Home Address"
                        type='text'
                        name='address.street'
                        placeholder='Street Address'
                      />
                      <div
                        className={css({
                          display: 'flex',
                          width: '100%',

                          '& > *': {
                            flex: 1,
                          },
                        })}
                      >
                        <Input
                          label=''
                          type='text'
                          name='address.city'
                          placeholder='City'
                        />
                        <Input
                          label=''
                          type='text'
                          name='address.postal'
                          placeholder='Postal Code'
                        />
                      </div>
                    </div>
                  )}
                </FormizStep>
                <FormizStep name='emergency-contact' label='Emergency Contact'>
                  <h2>Parent/Guardian and Emergency Contact Information</h2>
                  <Input
                    label="Parent/Guardian's Legal First Name"
                    type='text'
                    name='parent.firstname'
                    placeholder='Please enter your answer'
                    defaultValue={parentData?.[0].name ?? ''}
                  />
                  <Input
                    label="Parent/Guardian's Legal Last Name"
                    type='text'
                    name='parent.lastname'
                    placeholder='Please enter your answer'
                  />
                  <Input
                    label="Student Special Needs"
                    type="text"
                    name="special_needs"
                    placeholder="Please enter your answer"
                  />
                  <Input
                    label='Emergency Contact Name'
                    type='text'
                    name='emergency_contact.name'
                    placeholder='Please enter your answer'
                  />
                  <Input
                    label='Emergency Contact Phone'
                    type='text'
                    name='emergency_contact.tel'
                    placeholder='Please enter your answer'
                  />
                  <Input
                    label='Pick Up Arrangements'
                    description='In order to ensure participants’ safety, parents or authorized adults must pick-up their child(ren) in the designated area. If the participant is 14 years of age or older, please sign the following if you (parent/guardian) authorize the participant to leave the program by himself/herself. CICS will not be responsible for the participant’s safety, once he/she leaves the centre.'
                    type='text'
                    name='pickup_arrangements'
                    placeholder='Please enter your answer'
                  />
                </FormizStep>
                <FormizStep name='consent' label='Consent'>
                  <h2>Consent</h2>
                  <Checkbox
                    name='agreePhoto'
                    value={'dummy'}
                    label='Photographs, films, slides, videoI give my permission for the use of photographs, films, slides, video taken during the program for the promotional purposes of the Centre for Immigrant and Community Services (CICS). I understand that there will not be any compensation for photographs or videos taken of the participant in the program.'
                  />
                  <Checkbox
                    name='agreePermission'
                    value={'dummy'}
                    label='Content InformationI give permission to CICS to deliver agency information to my email address and understand I can withdraw my consent at any time.'
                  />
                  <Input
                    label='Please read the Consent : https://bit.ly/CICSCentreforLearningConsentForm'
                    description={
                      <>
                        <br />
                        <p>
                          In case of emergency, I authorize CICS staff to
                          administer first aid, or call an ambulance. I
                          understand that should such an emergency arise, I, or
                          my emergency contact (when I cannot be reached), will
                          be notified immediately.
                        </p>
                        <br />
                        <p>
                          I agree that any cost incurred for such services shall
                          be my responsibility. By signing below, I have read
                          and agree to the above. By participating in the
                          program, I release Centre for Immigrant and Community
                          Services, its employees, and volunteers from any
                          claims, actions, liabilities, losses and injuries to
                          any person or property while participating in the
                          program.
                        </p>
                      </>
                    }
                    type='text'
                    name='sign'
                    placeholder='Please enter your answer'
                  />
                </FormizStep>
                <FormizStep
                  name='application-confirm'
                  label='Application Confirm'
                >
                  <h2>Application Confirm</h2>
                  <p>
                    Upon submission of this registration form, you will receive
                    an invoice within 2 business days via PayPal to complete
                    payment by credit card. A PayPal account is not required.
                    Please check your Spam/Junk email folder.
                  </p>
                  <br />
                  <p>
                    Course fees are non-refundable. However, if the minimum
                    number of participants are not reached, the course will be
                    cancelled and the fee will be refund.
                  </p>
                </FormizStep>
                <div className={css({ display: 'flex', gap: '8px' })}>
                  <Button
                    type='submit'
                    onClick={(event) => {
                      event.preventDefault();
                      if (form.currentStep?.index === 1) {
                        console.log(fields.email.value);
                        trigger(fields.email.value);
                      }
                      if (form.currentStep?.index !== 6) {
                        form.goToNextStep();
                      } else {
                        form.submit();
                        setIsSubmited(!isSubmited);
                      }
                    }}
                  >
                    {form.steps &&
                    form.currentStep?.index === form.steps?.length - 1
                      ? 'Submit'
                      : 'Next Step'}
                  </Button>
                  {form.steps && form.currentStep?.index !== 0 && (
                    <Button
                      type='button'
                      onClick={() => form.goToPreviousStep()}
                      style={{ backgroundColor: 'grey' }}
                    >
                      Back
                    </Button>
                  )}
                </div>
              </>
            )
          )}
          {isSubmited && (
            <div
              className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '16px',
              })}
            >
              <h2>Submit Successful</h2>
              <Icon
                icon='line-md:circle-to-confirm-circle-transition'
                width='20rem'
                dur='2.5s'
              />
              <Button
                type='button'
                style={{ backgroundColor: 'var(--color-blue)' }}
              >
                Back to Survey Page
              </Button>
            </div>
          )}
        </FormContent>
      </Formiz>
    </FormWrapper>
  );
}

export default CourseRegistrationForm;
