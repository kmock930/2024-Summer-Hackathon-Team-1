'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { css, styled } from '@pigment-css/react';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import Link from '../Link';

const Wrapper = styled.div`
  width: 320px;
  min-height: 100%;
  background: linear-gradient(354.42deg, #135395 0%, #688db4 42%, #2b72bc 100%);
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  color: var(--color-text);
  gap: 8px;
  align-items: center;
  padding: 8px 0;
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
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const UserWrapper = styled.div`
  padding-bottom: 8px;
  border-bottom: 2px solid white;
`;

const UserIconWrapper = styled.div`
  border-radius: 9999%;
  background-color: white;
  width: 80px;
`;

const UserInfoIcon = styled(Icon)`
  min-width: 20px;
`;

const Nav = styled.nav`
  flex: 1;
`;

function Sidebar() {
  const pathname = usePathname();

  return (
    <Wrapper>
      <UserWrapper>
        <UserIconWrapper>
          <Icon icon='mdi:user' width='5rem' color='black' />
        </UserIconWrapper>
        <UserInfoWrapper>
          <UserInfoIcon icon='mdi:user' color='white' width='20px' />
          User 103594923
        </UserInfoWrapper>
        <UserInfoWrapper>
          <UserInfoIcon icon='mdi:email' color='white' width='20px' />
          User103594923@gmail.com
        </UserInfoWrapper>
        <UserInfoWrapper>
          <UserInfoIcon icon='mdi:clock' color='white' width='20px' />
          12 Jun 2024 10:32:78
        </UserInfoWrapper>
      </UserWrapper>
      <Nav>
        <NavItems>
          <li>
            <Link
              className={`${LinkStyle} ${pathname.includes('/admin/applications') ? 'active' : ''}`}
              href='/admin/applications'
            >
              <Icon icon='wpf:survey' width='25px' />
              Application
            </Link>
          </li>
          <li>
            <Link
              className={`${LinkStyle} ${pathname.includes('/admin/students') ? 'active' : ''}`}
              href='/admin/students'
            >
              <Icon icon='ph:student' width='25px' />
              Student
            </Link>
          </li>
          <li>
            <Link
              className={`${LinkStyle} ${pathname.includes('/admin/courses') ? 'active' : ''}`}
              href='/admin/courses'
            >
              <Icon icon='fluent-mdl2:publish-course' width='25px' />
              Course
            </Link>
          </li>
          <li>
            <Link
              className={`${LinkStyle} ${pathname === '/admin/consent' ? 'active' : ''}`}
              href='/admin/consent'
            >
              <Icon icon='icon-park-solid:protect' width='25px' />
              Consent
            </Link>
          </li>
          <li>
            <Link
              className={`${LinkStyle} ${pathname === '/admin/payment' ? 'active' : ''}`}
              href='/admin/payment'
            >
              <Icon icon='fluent:payment-48-regular' width='25px' />
              Payment
            </Link>
          </li>
          <li>
            <Link
              className={`${LinkStyle} ${pathname === '/admin/setting' ? 'active' : ''}`}
              href='/admin/setting'
            >
              <Icon icon='uil:setting' width='25px' />
              Setting
            </Link>
          </li>
          <li
            className={css({
              marginTop: 'auto',
            })}
          >
            <Link
              className={`${LinkStyle} ${css({
                background: 'white',
                color: 'blue',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              })}`}
              href='/admin/login'
            >
              Logout
            </Link>
          </li>
        </NavItems>
      </Nav>
    </Wrapper>
  );
}

export default Sidebar;
