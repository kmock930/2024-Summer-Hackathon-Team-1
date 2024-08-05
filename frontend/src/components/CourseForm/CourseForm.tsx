'use client';
import { css, styled } from '@pigment-css/react';
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
  backgroundColor: 'hsla(210, 77%, 33%, 1)',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 15,
  lineHeight: 1,
  color: 'white',
  border: '2px solid hsla(210, 77%, 33%, 1)',
  userSelect: 'none',
  '&:first-child': { borderTopLeftRadius: 6 },
  '&:last-child': { borderTopRightRadius: 6 },
  '&:hover': { opacity: 0.8 },
  '&[data-state="active"]': {
    color: 'hsla(210, 77%, 33%, 1)',
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

function CourseForm() {
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
            background: 'hsla(210, 77%, 33%, 1)',
            border: '2px solid hsla(210, 77%, 33%, 1)',
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
              <h2>Course Detail</h2>
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
                  Course Name, 課程名稱, 课程名称
                </legend>
                <Input
                  type='text'
                  name='course-name-en'
                  label='Course Name'
                  placeholder='COurse Name'
                  isHideLabel={true}
                />
                <Input
                  type='text'
                  name='course-name-zh-Hant'
                  label='课程名称'
                  placeholder='课程名称'
                  isHideLabel={true}
                />
                <Input
                  type='text'
                  name='course-name-zh-Hans'
                  label='課程名稱'
                  placeholder='課程名稱'
                  isHideLabel={true}
                />
              </fieldset>
              <Input
                type='number'
                name='vacancy'
                label='Vacancy'
                placeholder='Please enter your answer'
              />
              <Input
                type='text'
                name='courseLang'
                label='Course Language'
                placeholder='Please enter your answer'
              />
              <Input
                type='text'
                name='ageGroup'
                label='Age Group'
                placeholder='Please enter your answer'
              />
              <Input
                type='time'
                name='time'
                label='Time'
                placeholder='Please enter your answer'
              />
              <h2>Survey Linked</h2>
              <Label>
                Select course(s) for this survey
                <CheckboxGroup
                  className={css({
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                  })}
                >
                  <Checkbox value='survey'>
                    Summer 2024 S.T.E.A.M. Camp
                  </Checkbox>
                  <Checkbox value='survey'>
                    Summer 2024 S.T.E.A.M. Camp
                  </Checkbox>
                  <Checkbox value='survey'>
                    Summer 2024 S.T.E.A.M. Camp
                  </Checkbox>
                  <Checkbox value='survey'>
                    Summer 2024 S.T.E.A.M. Camp
                  </Checkbox>
                  <Checkbox value='survey'>
                    Summer 2024 S.T.E.A.M. Camp
                  </Checkbox>
                  <Checkbox value='survey'>
                    Summer 2024 S.T.E.A.M. Camp
                  </Checkbox>
                </CheckboxGroup>
              </Label>
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

export default CourseForm;
