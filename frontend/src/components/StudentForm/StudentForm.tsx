'use client';
import { css, styled } from '@pigment-css/react';
import * as React from 'react';
import Link from '../Link';
import { useList } from '@refinedev/core';
import Checkbox from '../Checkbox';
import Input from '../Input';
import { CheckboxGroup, Label } from 'react-aria-components';
import * as Switch from '@radix-ui/react-switch';
import { range } from '@/utils';
import { SurveyFormProps } from '@/types';
import * as Tabs from '@radix-ui/react-tabs';
import TopBar from '../TopBar';
import SurveyResponseTable from '../SurveyResponseTable';
import Select from '../Select';

const FormWrapper = styled.div`
  outline: 0;
  text-decoration: none;
  color: #000;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 0.25rem;
  box-shadow:
    0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05),
    0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 100ms ease-in-out;
  padding: 8px;
`;

const FormToolbar = styled.div`
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  justify-content: space-between;
  width: 100%;
  min-height: 3.5rem;
  align-items: center;
  border-bottom: 1px solid black;
`;

const TabsRoot = styled(Tabs.Root)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 10px',
});

const TabsList = styled(Tabs.List)({
  flexShrink: 0,
  display: 'flex',
  borderBottom: '1px solid rgb(219, 216, 224)',
  gap: '4px',
});

const TabsTrigger = styled(Tabs.Trigger)({
  all: 'unset',
  fontFamily: 'inherit',
  backgroundColor: ' var(--color-blue-1)',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 15,
  lineHeight: 1,
  color: 'white',
  border: '2px solid  var(--color-blue-1)',
  userSelect: 'none',
  '&:first-child': { borderTopLeftRadius: 6 },
  '&:last-child': { borderTopRightRadius: 6 },
  '&:hover': { opacity: 0.8 },
  '&[data-state="active"]': {
    color: ' var(--color-blue-1)',
    boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
    background: 'white',
  },
  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` },
});

const TabsContent = styled(Tabs.Content)({
  flexGrow: 1,
  padding: 20,
  backgroundColor: 'white',
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: 'none',
  '&:focus': { boxShadow: `0 0 0 2px black` },
});

function StudentForm() {
  return (
    <div
      className={css({
        padding: '36px',
        width: '100%',
        backgroundColor: 'hsla(210, 100%, 95%, 1)',
      })}
    >
      <TopBar
        className={css({
          justifyContent: 'space-between',
        })}
      >
        <Link href='/admin/applications'>{'< back to student'}</Link>
        <button
          className={css({
            background: ' var(--color-blue-1)',
            border: '2px solid  var(--color-blue-1)',
            color: 'white',
            borderRadius: '4px',
          })}
        >
          Create Survey
        </button>
      </TopBar>
      <FormWrapper>
        <TabsRoot defaultValue='student-information'>
          <TabsList aria-label='Manage your student'>
            <TabsTrigger value='student-information'>
              Student Information
            </TabsTrigger>
            <TabsTrigger value='course-history' disabled={true}>
              Course History
            </TabsTrigger>
          </TabsList>
          <TabsContent value='student-information'>
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              })}
            >
              <h2>Student Profile</h2>
              <fieldset
                className={css({
                  border: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                })}
              >
                <legend className={css({ padding: 0 })}>
                  {`student's Legal Name`}
                </legend>
                <Input
                  type='text'
                  name='firstName'
                  label='First Name'
                  placeholder='Legal First Name (E.g. Tai Man)'
                  isHideLabel={true}
                />
                <Input
                  type='text'
                  name='lastName'
                  label='Last Name'
                  placeholder='Legal Last Name (E.g. Chan)'
                  isHideLabel={true}
                />
              </fieldset>
              <Select
                label='Gender'
                placeholder='Select a Gender'
                options={[
                  {
                    value: 'm',
                    text: 'Male',
                  },
                  { value: 'f', text: 'Female' },
                  { value: 'other', text: 'Other' },
                ]}
              />
              <Input
                type='date'
                name='dob'
                label="Student's Date of Birth"
                placeholder='MM/DD/YYYY'
              />
              <fieldset
                className={css({
                  border: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                })}
              >
                <legend className={css({ padding: 0 })}>
                  {`Home Address`}
                </legend>
                <Input
                  type='text'
                  name='street'
                  label='Street'
                  placeholder='Street Address & Unit Number (if applicable)'
                  isHideLabel={true}
                />
                <Input
                  type='text'
                  name='city'
                  label='City'
                  placeholder='City'
                  isHideLabel={true}
                />
                <Input
                  type='text'
                  name='postalCode'
                  label='Postal Code'
                  placeholder='Postal Code'
                  isHideLabel={true}
                />
              </fieldset>
              <Input
                type='text'
                name='specialNeeds'
                label='Special needs, allergies, food restriction, or requires an Epi-Pen, asthma inhaler, or other? '
                placeholder='Please enter your answer'
              />
              <h2>Parent Information</h2>
              <fieldset
                className={css({
                  border: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                })}
              >
                <legend className={css({ padding: 0 })}>
                  {`student's Legal Name`}
                </legend>
                <Input
                  type='text'
                  name='firstName'
                  label='First Name'
                  placeholder='Legal First Name (E.g. Tai Man)'
                  isHideLabel={true}
                />
                <Input
                  type='text'
                  name='PlastName'
                  label='Last Name'
                  placeholder='Legal Last Name (E.g. Chan)'
                  isHideLabel={true}
                />
              </fieldset>
              <Select
                label='Gender'
                placeholder='Select a Gender'
                options={[
                  {
                    value: 'm',
                    text: 'Male',
                  },
                  { value: 'f', text: 'Female' },
                  { value: 'other', text: 'Other' },
                ]}
              />
              <Select
                label='Relationship to Student'
                placeholder='Relationship to Student'
                options={[
                  {
                    value: 'mother',
                    text: 'Mother',
                  },
                  { value: 'father', text: 'Father' },
                  { value: 'other', text: 'Other' },
                ]}
              />
              <h2>Emergency Contact</h2>
              <Input
                type='text'
                name='em-phone'
                label='Emergency Contact Phone'
                placeholder='Please enter your answer'
              />
              <Input
                type='email'
                name='email'
                label='Email'
                placeholder='Please enter your answer'
              />
            </div>
          </TabsContent>
          <TabsContent value='response'>
            <SurveyResponseTable />
          </TabsContent>
        </TabsRoot>
      </FormWrapper>
    </div>
  );
}

export default StudentForm;
