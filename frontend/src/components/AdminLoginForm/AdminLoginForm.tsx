'use client';
import * as React from 'react';
import Input from '../Input';
import OTPForm from '../OTPForm';
import { css, styled } from '@pigment-css/react';
import { Formiz, useForm } from '@formiz/core';

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

function AdminLoginForm() {
  const [isLoginRequested, setIsLoginRequested] = React.useState(false);
  const form = useForm();

  const handleLoginRequest = () => {
    setIsLoginRequested(!isLoginRequested);
  };
  return (
    <Formiz connect={form}>
      {!isLoginRequested && (
        <div
          className={css({
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
          })}
        >
          <div>
            <h2>Admin Login</h2>
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
          </div>

          <div className={css({ display: 'flex', gap: '8px' })}>
            <Button type='button' onClick={handleLoginRequest}>
              login
            </Button>
          </div>
        </div>
      )}
      {isLoginRequested && <OTPForm />}
    </Formiz>
  );
}

export default AdminLoginForm;
