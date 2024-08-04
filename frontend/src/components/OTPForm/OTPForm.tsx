import * as React from 'react';
import OTPInput from '../OTPInput';
import { css } from '@pigment-css/react';

function OTPForm() {
  return (
    <form>
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
    </form>
  );
}

export default OTPForm;
