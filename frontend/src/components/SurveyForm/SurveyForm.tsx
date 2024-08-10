'use client';
import { css, styled } from '@pigment-css/react';
import * as React from 'react';
import Checkbox from '../Checkbox';
import Input from '../Input';
import { CheckboxGroup, Label } from 'react-aria-components';
import * as Switch from '@radix-ui/react-switch';
import { range } from '@/utils';
import { Survey, SurveyFormProps } from '@/types';
import * as Tabs from '@radix-ui/react-tabs';
import SurveyResponseTable from '../SurveyResponseTable';
import DashboardForm from '../DashboardForm';
import useSWR from 'swr';
import { fetcher } from '@/utils';
import { Course } from '@/types';
import { NodeNextRequest } from 'next/dist/server/base-http/node';

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
  '&[data-disabled]': {
    opacity: 0.8,
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

function SurveyForm({ id }: SurveyFormProps) {
  const [careOptions, setCareOptions] = React.useState(0);
  const { data: courseData } = useSWR<Course[]>('courses', fetcher);
  const { data: surveyData, isLoading: isSurveyDataLoading } = useSWR<Survey>(
    `course-registration?survey_id=${id}`,
    fetcher
  );
  const [enableCare, setEnableCare] = React.useState(false);

  const handleAddCareOption = () => {
    setCareOptions(careOptions + 1);
  };

  const handleRemoveCareOption = () => {
    setCareOptions(careOptions - 1);
  };

  return (
    <>
      {!isSurveyDataLoading && (
        <DashboardForm
          name='applications'
          actions={
            <button
              className={css({
                background: ' var(--color-blue-1)',
                border: '2px solid  var(--color-blue-1)',
                color: 'white',
                borderRadius: '4px',
              })}
            >
              {id ? 'Edit Survey' : 'Create Survey'}
            </button>
          }
        >
          <TabsRoot defaultValue='survey-information'>
            <TabsList aria-label='Manage your Survey'>
              <TabsTrigger value='survey-information'>
                Survey Information
              </TabsTrigger>
              <TabsTrigger value='response' disabled={!id}>
                Response
              </TabsTrigger>
            </TabsList>
            <TabsContent value='survey-information'>
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                })}
              >
                <h2>Course Information</h2>
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
                    Survey Name, 問卷名稱, 问卷名称
                  </legend>
                  <Input
                    type='text'
                    defaultValue={surveyData?.survey_name?.['en-us']}
                    name='survey_name.en-us'
                    label='Survey Name'
                    placeholder='Survey Name'
                    isHideLabel={true}
                  />
                  <Input
                    type='text'
                    defaultValue={surveyData?.survey_name?.['zh-cn']}
                    name='survey_name.zh-cn'
                    label='问卷名称'
                    placeholder='问卷名称'
                    isHideLabel={true}
                  />
                  <Input
                    type='text'
                    defaultValue={surveyData?.survey_name?.['zh-hk']}
                    name='survey_name.zh-hk'
                    label='問卷名稱'
                    placeholder='問卷名稱'
                    isHideLabel={true}
                  />
                  <legend className={css({ padding: 0 })}>Age Group</legend>
                  <Input
                    type='text'
                    defaultValue={surveyData?.age_group}
                    name='age_group'
                    label='Age Group'
                    placeholder='Age Group'
                    isHideLabel={true}
                  />
                  <legend className={css({ padding: 0 })}>Period</legend>
                  <Input
                    type='text'
                    defaultValue={surveyData?.period || ''}
                    name='period'
                    label='Period'
                    placeholder='Period'
                    isHideLabel={true}
                  />
                </fieldset>
                <Label>
                  Select course(s) for this survey
                  <CheckboxGroup
                    className={css({
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '16px',
                    })}
                  >
                    {courseData?.map((course) => {
                      return (
                        <Checkbox
                          name={`courses.${course.id}`}
                          key={course.id}
                          value={`${course.id}`}
                        >
                          {course.course_name['en-us']} | {course.time}
                        </Checkbox>
                      );
                    })}
                  </CheckboxGroup>
                </Label>
                <div
                  className={css({
                    display: 'flex',
                    width: '100%',
                    gap: '16px',
                  })}
                >
                  <label>Enable Care Service</label>
                  <Switch.Root
                    className={css({
                      all: 'unset',
                      width: '42px',
                      height: '25px',
                      backgroundColor: 'hsla(0, 0%, 100%, 1)',
                      borderRadius: '9999px',
                      border: '2px solid  var(--color-blue-1)',
                      position: 'relative',
                      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px',
                      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                      '&:focus': {
                        boxShadow: '0 0 0 2px  var(--color-blue-1)',
                      },
                      "&[data-state='checked']": {
                        backgroundColor: ' var(--color-blue-1)',
                      },
                    })}
                    id='airplane-mode'
                    onCheckedChange={(e) => {
                      setEnableCare(e);
                      setCareOptions(0);
                    }}
                  >
                    <Switch.Thumb
                      className={css({
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '21px',
                        height: '21px',
                        backgroundColor: 'white',
                        borderRadius: '9999px',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 2px',
                        transition: 'transform 100ms',
                        transform: 'translateX(2px)',
                        fontSize: '0.75rem',
                        willChange: 'transform',
                        "&[data-state='checked']": {
                          transform: 'translateX(19px)',
                        },
                      })}
                    >
                      Off
                    </Switch.Thumb>
                  </Switch.Root>
                </div>
                {range(careOptions).map((key) => {
                  return (
                    <div
                      key={key}
                      className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      })}
                    >
                      <div
                        className={css({
                          display: 'flex',
                          justifyContent: 'space-between',
                        })}
                      >
                        <label>Option {key + 1}</label>
                        <div>
                          <button
                            type='button'
                            onClick={handleRemoveCareOption}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <Input
                        type='text'
                        name={`option${key + 1}.en-us`}
                        label='Option'
                        placeholder='Option'
                        isHideLabel={true}
                      />
                      <Input
                        type='text'
                        name={`option${key + 1}.zh-hk`}
                        label='選擇'
                        placeholder='選擇'
                        isHideLabel={true}
                      />
                      <Input
                        type='text'
                        name={`option${key + 1}.zh-cn`}
                        label='选择'
                        placeholder='选择'
                        isHideLabel={true}
                      />
                    </div>
                  );
                })}
                {enableCare && (
                  <button
                    className={css({
                      background: 'none',
                      border: 0,
                      textDecoration: 'underline',

                      '&::before': {
                        content: "'+ '",
                      },
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    })}
                    type='button'
                    onClick={handleAddCareOption}
                  >
                    Add New Care Option
                  </button>
                )}
              </div>
            </TabsContent>
            <TabsContent value='response'>
              <SurveyResponseTable id={id || ''} />
            </TabsContent>
          </TabsRoot>
        </DashboardForm>
      )}
    </>
  );
}

export default SurveyForm;
