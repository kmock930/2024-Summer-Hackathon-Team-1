import { styled } from '@pigment-css/react';
import * as React from 'react';

const TopBarWrapper = styled.div`
  width: 100%;
  border-bottom: 2px solid hsla(210, 77%, 33%, 0.5);
  margin-bottom: 16px;
  display: flex;
  padding: 8px;
`;

function TopBar({ children, ...deletaged }: { children?: React.ReactNode } & React.ComponentProps<'div'>) {
  return <TopBarWrapper {...deletaged}>{children}</TopBarWrapper>;
}

export default TopBar;
