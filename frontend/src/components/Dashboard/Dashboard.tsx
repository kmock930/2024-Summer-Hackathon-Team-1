import { styled } from '@pigment-css/react';
import * as React from 'react';
import Sidebar from '../Sidebar';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const ContentWrapper = styled.div`
  padding: 36px;
  width: 100%;
  background-color: hsla(210, 100%, 95%, 1);
`;

function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Sidebar />

      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
}

export default Dashboard;
