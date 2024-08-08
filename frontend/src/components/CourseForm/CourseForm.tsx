'use client';
import { css, styled } from '@pigment-css/react';
import Checkbox from '../Checkbox';
import Input from '../Input';
import { CheckboxGroup, Label } from 'react-aria-components';
import * as Tabs from '@radix-ui/react-tabs';
import SurveyResponseTable from '../SurveyResponseTable';
import DashboardForm from '../DashboardForm';

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

function CourseForm() {
  return (
    <DashboardForm
      actions={
        <button
          className={css({
            background: ' var(--color-blue-1)',
            border: '2px solid  var(--color-blue-1)',
            color: 'white',
            borderRadius: '4px',
          })}
        >
          Create Course
        </button>
      }
    >
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
                placeholder='Course Name'
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
                <Checkbox name='course.dummy1' value='survey'>
                  Summer 2024 S.T.E.A.M. Camp
                </Checkbox>
                <Checkbox name='course.dummy2' value='survey'>
                  Summer 2024 S.T.E.A.M. Camp
                </Checkbox>
                <Checkbox name='course.dummy3' value='survey'>
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
    </DashboardForm>
  );
}

export default CourseForm;
