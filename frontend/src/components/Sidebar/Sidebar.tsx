'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { css, styled } from '@pigment-css/react';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import Link from '../Link';

const Wrapper = styled.div`
  width: 320px;
  height: 100%;
  background: linear-gradient(354.42deg, #135395 0%, #688db4 42%, #2b72bc 100%);
  padding: 24px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  color: var(--color-text);
  gap: 8px;
  align-items: center;
`;

const LinkStyle = css({
  display: 'flex',
  textDecoration: 'none',
  color: 'white',
  borderRadius: '8px',
  marginTop: '8px',
  minHeight: '48px',
  alignItems: 'center',
  padding: '8px',

  '&.active': {
    background: 'white',
    color: 'blue',
  },
});

const NavItems = styled.ul`
  list-style-type: none;
  padding: 0;
`;

function Sidebar() {
  const pathname = usePathname();

  return (
    <Wrapper>
      <Icon icon='mdi:user' width='5rem' color='white' />
      <UserInfoWrapper>
        <Icon icon='mdi:user' color='white' />
        User 103594923
      </UserInfoWrapper>
      <UserInfoWrapper>
        <Icon icon='mdi:email' color='white' />
        User103594923@gmail.com
      </UserInfoWrapper>
      <UserInfoWrapper>
        <Icon icon='mdi:clock' color='white' />
        12 Jun 2024 10:32:78
      </UserInfoWrapper>
      <hr />
      <nav>
        <NavItems>
          <li>
            <Link
              className={`${LinkStyle} ${pathname.includes('/admin/applications') ? 'active' : ''}`}
              href='/admin/applications'
            >
              Application
            </Link>
          </li>
          <li>
            <Link
              className={`${LinkStyle} ${pathname.includes('/admin/students') ? 'active' : ''}`}
              href='/admin/students'
            >
              Student
            </Link>
          </li>
          <li>
            <Link
              className={`${LinkStyle} ${pathname.includes('/admin/courses') ? 'active' : ''}`}
              href='/admin/courses'
            >
              Course
            </Link>
          </li>
          <li>
            <Link
              className={`${LinkStyle} ${pathname === '/admin/consent' ? 'active' : ''}`}
              href='/admin/consent'
            >
              Consent
            </Link>
          </li>
          <li>
            <Link
              className={`${LinkStyle} ${pathname === '/admin/payment' ? 'active' : ''}`}
              href='/admin/payment'
            >
              Payment
            </Link>
          </li>
          <li>
            <Link
              className={`${LinkStyle} ${pathname === '/admin/setting' ? 'active' : ''}`}
              href='/admin/setting'
            >
              Setting
            </Link>
          </li>
          <li>
            <Link
              className={`${LinkStyle} ${pathname === '/admin/setting' ? 'active' : ''}`}
              href='/admin/setting'
            >
              Logout
            </Link>
          </li>
        </NavItems>
      </nav>
    </Wrapper>
  );
}

export default Sidebar;
