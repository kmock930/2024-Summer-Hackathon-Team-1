'use client';
import * as React from 'react';
import TopBar from '../TopBar';
import { css, styled } from '@pigment-css/react';
import Link from '../Link';
import { usePathname } from 'next/navigation';
import { DashboardFormProps } from '@/types';

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
  const pathname = usePathname();

  return (
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
  );
}

export default DashboardForm;
