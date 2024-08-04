import * as React from 'react';
import OTPInput from '../OTPInput';
import { css, styled } from '@pigment-css/react';

function OTPForm() {
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
  return (
    <div
      className={css({
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      })}
    >
      <div>
        <h2>One-time Password</h2>
        <div>We’ve sent an OTP(One-Time Password) to your email.</div>
        <div>
          Please enter the 6 digits OTP value to complete the verification.
        </div>
        <OTPInput length={6} />
        <div
          className={css({
            width: '100%',
            display: 'flex',
            marginTop: '24px',
          })}
        >
          <button
            className={css({
              width: '272px',
              height: '48px',
              top: '420px',
              left: '364px',
              gap: '0px',
              borderRadius: '8px',
              border: '0',
              boxShadow: '0px 0px 4px 0px hsla(210, 63%, 45%, 1)',
              background: 'transparent',
              margin: 'auto',
              '&:hover': {
                cursor: 'pointer',
              },
            })}
          >
            Resend OTP(One-Time Password)
          </button>
        </div>
      </div>

      <div className={css({ display: 'flex', gap: '8px' })}>
        <Button type='button'>login</Button>
      </div>
    </div>
  );
}

export default OTPForm;
