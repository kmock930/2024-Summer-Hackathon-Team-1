import { styled } from '@pigment-css/react';
import * as React from 'react';

const Wrapper = styled.div`
  width: 100%;
`;

const FormContentWrapper = styled.div`
  background-color: hsla(210, 100%, 95%, 1);
  border-radius: 0 0 16px 16px;
  color: black;
  margin: calc((var(--padding) * -1) + 4px);
  margin-top: var(--padding);
  padding: var(--padding);
  height: 660px;
`;

function FormContent({
  children,
  ...delegated
}: {
  children?: React.ReactNode;
} & React.ComponentProps<'div'>) {
  return (
    <Wrapper>
      <FormContentWrapper {...delegated}>{children}</FormContentWrapper>
    </Wrapper>
  );
}

export default FormContent;
