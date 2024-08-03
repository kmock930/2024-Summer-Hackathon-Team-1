import CourseRegistrationForm from '@/components/CourseRegistrationForm';
import Select from '@/components/Select';
import { css, styled } from '@pigment-css/react';
import React from 'react';

const Wrapper = styled.div`
  --padding: 24px;
  max-width: 1100px;
  width: 1100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(
    276.54deg,
    #135395 -9.35%,
    #688db4 27.11%,
    #2b72bc 77.45%
  );
  border-radius: 16px;
  border: 4px;
  padding: var(--padding);
  color: var(--color-text);
`;

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div
      className={css({
        height: '100vh',
        backgroundImage:
          'linear-gradient(\n    50deg,\n    hsl(209deg 87% 51%) 0%,\n    hsl(209deg 88% 55%) 4%,\n    hsl(210deg 88% 60%) 8%,\n    hsl(210deg 88% 64%) 12%,\n    hsl(211deg 89% 68%) 16%,\n    hsl(211deg 90% 72%) 20%,\n    hsl(211deg 90% 76%) 25%,\n    hsl(213deg 93% 78%) 30%,\n    hsl(215deg 94% 81%) 34%,\n    hsl(216deg 95% 84%) 39%,\n    hsl(218deg 97% 86%) 44%,\n    hsl(219deg 100% 89%) 49%,\n    hsl(221deg 100% 91%) 53%,\n    hsl(219deg 100% 89%) 58%,\n    hsl(218deg 97% 86%) 63%,\n    hsl(216deg 95% 84%) 67%,\n    hsl(215deg 94% 81%) 71%,\n    hsl(213deg 93% 78%) 76%,\n    hsl(211deg 90% 76%) 80%,\n    hsl(211deg 90% 72%) 83%,\n    hsl(211deg 89% 68%) 87%,\n    hsl(210deg 88% 64%) 90%,\n    hsl(210deg 88% 60%) 94%,\n    hsl(209deg 88% 55%) 97%,\n    hsl(209deg 87% 51%) 100%\n  )',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <div
        className={css({
          '--padding': '24px',
          maxWidth: '1100px',
          width: '1100px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          background:
            'linear-gradient(\n    276.54deg,\n    #135395 -9.35%,\n    #688db4 27.11%,\n    #2b72bc 77.45%\n  )',
          borderRadius: '16px',
          border: '4px',
          padding: 'var(--padding)',
          color: 'var(--color-text)',
        } as React.CSSProperties)}
      >
        <div
          className={css({
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          })}
        >
          <h1>Course Registration Form: {params.slug}</h1>
          <Select
            placeholder='Select a Language'
            options={[
              { value: 'en', text: 'English' },
              { value: 'zh-Hans', text: '中文(简体)' },
              { value: 'zh-Hant', text: '中文(繁體)' },
            ]}
            defaultValue='en'
            className={css({
              position: 'absolute',
              right: '0',
            })}
          />
        </div>

        <CourseRegistrationForm />
      </div>
    </div>
  );
}
