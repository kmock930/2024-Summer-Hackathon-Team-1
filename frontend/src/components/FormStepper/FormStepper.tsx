import * as React from 'react';
import { css, styled } from '@pigment-css/react';
import { useFormContext } from '@formiz/core';

function FormStepper() {
  const form = useFormContext();
  return (
    <Wrapper>
      {form.steps?.map((step, index) => {
        return (
          <React.Fragment key={index}>
            <FormStep
              className={
                form.currentStep && index <= form.currentStep.index
                  ? 'active'
                  : ''
              }
            >
              <FormStepLabel>{step.label}</FormStepLabel>
              <FormStepIndex>{index + 1}</FormStepIndex>
            </FormStep>
            {form.steps && index !== form.steps?.length - 1 && (
              <FormStepConnector />
            )}
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 144px;
  width: 100%;
  padding: 36px;
`;

const FormStepConnector = styled.div`
  width: 64px;
  border-bottom: solid 2px var(--color-text);
  flex: 1;
`;

const FormStepLabel = styled.div`
  text-align: center;
  position: absolute;
  top: -200%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
`;

const FormStepIndex = styled.div``;

const FormStep = styled.div`
  --color-bg: hsla(0deg, 0%, 100%, 1);
  --color-text: hsla(210, 63%, 45%, 1);
  position: relative;
  border: solid 2px hsl(0deg, 0%, 100%);
  background: var(--color-bg);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: var(--color-text);
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    --color-bg: hsla(210, 63%, 45%, 1);
    --color-text: hsla(0deg, 0%, 100%, 1);
  }
`;

export default FormStepper;
