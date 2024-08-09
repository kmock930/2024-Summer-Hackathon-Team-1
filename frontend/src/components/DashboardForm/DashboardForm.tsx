'use client';
import * as React from 'react';
import TopBar from '../TopBar';
import { css, styled } from '@pigment-css/react';
import Link from '../Link';
import { usePathname } from 'next/navigation';
import { DashboardFormProps } from '@/types';
import { Formiz, useForm } from '@formiz/core';
import { sendRequest } from '@/utils';
import { useRouter } from 'next/navigation';

const Wrapper = styled.div`
  background-color: hsla(210deg, 100%, 95%, 1);
`;

const BackLink = styled(Link)({
  '&::before': {
    content: "'< '",
  },
});

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

function DashboardForm({ actions, name, children }: DashboardFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm({
    onSubmit: (values) => {
      if (name === 'applications') {
        // Work around course_ids
        values.course_ids = Object.keys(values.courses).filter(
          (key) => values.courses[key] === true,
        ).map(courseId => Number(courseId));
        delete values.courses;
        // Work around ba_camp_options
        const optionArr = Object.keys(values).filter(key => key.startsWith('option'));
        values.ba_camp_answers = optionArr.map(key => values[key]);
        for (const key of optionArr) delete values[key];
        sendRequest('surveys', values);
      } else {
        sendRequest(name, values);
      }
      router.push(`/admin/${name}`);
    },
  });

  return (
    <Formiz connect={form} autoForm='form'>
      <Wrapper>
        <TopBar
          className={css({
            justifyContent: 'space-between',
          })}
        >
          <BackLink href={pathname.split('/').slice(0, -1).join('/')}>
            Go Back
          </BackLink>
          {actions}
        </TopBar>
        <FormWrapper>{children}</FormWrapper>
      </Wrapper>
    </Formiz>
  );
}

export default DashboardForm;
