'use client';
import * as React from 'react';
import { Formiz, FormizStep, useForm, useFormFields } from '@formiz/core';
import { css, styled } from '@pigment-css/react';
import FormStepper from '../FormStepper';
import { range } from '@/utils';
import Checkbox from '../Checkbox';
import Select from '../Select';
import Input from '../Input';
import OTPInput from '../OTPInput';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Icon } from '@iconify/react';
import { useList } from '@refinedev/core';
import { CheckboxGroup, Label } from 'react-aria-components';
import FormContent from '../FormContent';

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

function CourseRegistrationForm() {
  const form = useForm({ onSubmit: () => setIsSubmited(true) });
  const newChildrenForm = useForm();
  const [isDisplayNewChildrenForm, setIsDisplayNewChildrenForm] =
    React.useState(false);
  const [isSubmited, setIsSubmited] = React.useState(false);

  const toggleNewChildrenForm = () =>
    setIsDisplayNewChildrenForm(!isDisplayNewChildrenForm);

  const { data: courseData } = useList({ resource: 'courses' });
  console.log(courseData?.data);

  const { data: formTitle } = useList({ resource: 'title' });
  console.log(formTitle);

  const courseFields = useFormFields({
    connect: form,
    fields: ['course'],
    selector: (field) => field.value,
  }) as { [key: string]: boolean };

  const isCourseFieldsChecked = React.useMemo(() => {
    if (courseFields && courseFields.course) {
      return Object.values(courseFields.course).some((value) => value === true);
    }
    return false;
  }, [courseFields]);

  return (
    <FormWrapper>
      <Formiz connect={form} autoForm='step'>
        <FormStepper />
        <FormContent>
          {!isSubmited && (
            <>
              <FormizStep name='course-information' label='Course Information'>
                <h2>Course Selection</h2>
                <CheckboxGroup
                  className={css({
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                  })}
                >
                  {courseData?.data.map((course) => {
                    return (
                      <React.Fragment key={course.id}>
                        <Checkbox
                          label={course.name}
                          value={`${course.id}`}
                          key={course.id}
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
                </CheckboxGroup>
                <Select
                  label='Before and/or After Camp Option'
                  placeholder='Select a Before and/or After Camp Option'
                  options={[
                    {
                      value: 'dummy1',
                      text: 'Before Care (7:30am to 9:00am)',
                    },
                    { value: 'dummy2', text: 'After Care' },
                  ]}
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
                      Please select the children who are going to apply the
                      course
                    </div>

                    <CheckboxWrapper>
                      {range(5).map((index) => {
                        return (
                          <Checkbox
                            value={`${index}`}
                            key={index}
                            label='Dummy'
                          >
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
                        placeholder='Please enter your answer'
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
                        label='Does the participant have any special needs, allergies, food restriction, or requires an Epi-Pen, asthma inhaler, or other?'
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
              <FormizStep name='emergency-contact' label='Emergency Contact'>
                <h2>Parent/Guardian and Emergency Contact Information</h2>
                <Input
                  label="Parent/Guardian's Legal Full Name"
                  type='text'
                  name='student-address'
                  placeholder='Please enter your answer'
                />
                <Input
                  label='Relationship to Student'
                  type='text'
                  name='student-address'
                  placeholder='Please enter your answer'
                />
                <Input
                  label='Emergency Contact Name'
                  type='text'
                  name='student-address'
                  placeholder='Please enter your answer'
                />
                <Input
                  label='Emergency Contact Phone'
                  type='text'
                  name='student-address'
                  placeholder='Please enter your answer'
                />
                <Input
                  label={'Pick Up Arrangements'}
                  description='In order to ensure participants’ safety, parents or authorized adults must pick-up their child(ren) in the designated area. If the participant is 14 years of age or older, please sign the following if you (parent/guardian) authorize the participant to leave the program by himself/herself. CICS will not be responsible for the participant’s safety, once he/she leaves the centre.'
                  type='text'
                  name='student-address'
                  placeholder='Please enter your answer'
                />
              </FormizStep>
              <FormizStep name='consent' label='Consent'>
                <h2>Consent</h2>
                <Checkbox
                  value={'dummy'}
                  label='Photographs, films, slides, videoI give my permission for the use of photographs, films, slides, video taken during the program for the promotional purposes of the Centre for Immigrant and Community Services (CICS). I understand that there will not be any compensation for photographs or videos taken of the participant in the program.'
                />
                <Checkbox
                  value={'dummy'}
                  label='Content InformationI give permission to CICS to deliver agency information to my email address and understand I can withdraw my consent at any time.'
                />
                <Input
                  label='Please read the Consent : https://bit.ly/CICSCentreforLearningConsentForm'
                  description='In case of emergency, I authorize CICS staff to administer first aid, or call an ambulance.  I understand that should such an emergency arise, I, or my emergency contact (when I cannot be reached), will be notified immediately.  I agree that any cost incurred for such services shall be my responsibility. By signing below, I have read and agree to the above.  By participating in the program, I release Centre for Immigrant and Community Services, its employees, and volunteers from any claims, actions, liabilities, losses and injuries to any person or property while participating in the program.'
                  type='text'
                  name='student-address'
                  placeholder='Please enter your answer'
                />
              </FormizStep>
              <FormizStep
                name='application-confirm'
                label='Application Confirm'
              >
                Application Confirm
                <div>
                  Upon submission of this registration form, you will receive an
                  invoice within 2 business days via PayPal to complete payment
                  by credit card. A PayPal account is not required. Please check
                  your Spam/Junk email folder.
                </div>
                <div>
                  Course fees are non-refundable. However, if the minimum number
                  of participants are not reached, the course will be cancelled
                  and the fee will be refund.
                </div>
              </FormizStep>
              <div className={css({ display: 'flex', gap: '8px' })}>
                <Button type='submit'>
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
                Back to Course Information
              </Button>
            </div>
          )}
        </FormContent>
      </Formiz>
    </FormWrapper>
  );
}

export default CourseRegistrationForm;
