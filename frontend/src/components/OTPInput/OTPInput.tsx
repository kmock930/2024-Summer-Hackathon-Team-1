'use client';
import * as React from 'react';
import { OTPInput as HeadlessOTPInput, SlotProps } from 'input-otp';
import { css } from '@pigment-css/react';

function OTPInput({ length }: { length: number }) {
  return (
    <HeadlessOTPInput
      containerClassName={css({
        display: 'flex',
        justifyContent: 'space-between',
        gap: '8px',
      })}
      maxLength={length}
      render={({ slots }) => {
        return slots.map((slot, idx) => (
          <div
            className={css({
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              width: '100%',
            })}
            key={idx}
          >
            <OTPSlot {...slot} />
          </div>
        ));
      }}
    />
  );
}

function OTPSlot(props: SlotProps) {
  return (
    <div
      className={css({
        maxWidth: '120px',
        height: '160px',
        flex: '1',
        boxShadow: '0px 0px 10px 0px hsla(210deg, 34%, 56%, 1)',
        borderRadius: '16px',
        background: 'hsla(0deg, 0%, 100%, 1)',
        fontSize: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}

export default OTPInput;
