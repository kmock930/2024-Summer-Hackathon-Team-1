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

function SurveyForm({ survey }: SurveyFormProps) {
  const [careOptions, setCareOptions] = React.useState(0);
  const { data: courseData } = useList({ resource: 'courses' });
  console.log(courseData?.data);

  const handleAddCareOption = () => {
    setCareOptions(careOptions + 1);
  };

  const handleRemoveCareOption = () => {
    setCareOptions(careOptions - 1);
  };

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
        <Link href='/admin/applications'>{'< back to survey'}</Link>
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
        <TabsRoot defaultValue='survey-information'>
          <TabsList aria-label='Manage your Survey'>
            <TabsTrigger value='survey-information'>
              Survey Information
            </TabsTrigger>
            <TabsTrigger value='response'>Response</TabsTrigger>
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
                  name='survey-name-en'
                  label='Survey Name'
                  placeholder='Survey Name'
                  isHideLabel={true}
                />
                <Input
                  type='text'
                  name='survey-name-zh-Hant'
                  label='问卷名称'
                  placeholder='问卷名称'
                  isHideLabel={true}
                />
                <Input
                  type='text'
                  name='survey-name-zh-Hans'
                  label='問卷名稱'
                  placeholder='問卷名稱'
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
                  {courseData?.data.map((course) => {
                    return (
                      <Checkbox key={course.id} value={`${course.id}`}>
                        {course.name}
                      </Checkbox>
                    );
                  })}
                </CheckboxGroup>
              </Label>
              <div
                className={css({ display: 'flex', width: '100%', gap: '16px' })}
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
                        <button type='button' onClick={handleRemoveCareOption}>
                          Delete
                        </button>
                      </div>
                    </div>
                    <Input
                      type='text'
                      name={`option-${key + 1}-en`}
                      label='Option'
                      placeholder='Option'
                      isHideLabel={true}
                    />
                    <Input
                      type='text'
                      name={`option-${key + 1}-zh-Hant`}
                      label='選擇'
                      placeholder='選擇'
                      isHideLabel={true}
                    />
                    <Input
                      type='text'
                      name={`option-${key + 1}-zh-Hans`}
                      label='选择'
                      placeholder='选择'
                      isHideLabel={true}
                    />
                  </div>
                );
              })}
              <button type='button' onClick={handleAddCareOption}>
                Add New Care Option
              </button>
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

export default SurveyForm;
