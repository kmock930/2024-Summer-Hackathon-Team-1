import { css, styled } from '@pigment-css/react';
import * as React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

function Checkbox({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <Wrapper>
      <RadixCheckboxRoot id={id}>
        <RadixCheckbox.Indicator>
          <CheckIcon
            className={css({
              transform: 'scale(2)',
            })}
          />
        </RadixCheckbox.Indicator>
      </RadixCheckboxRoot>
      <label
        className={css({
          '&:hover': {
            cursor: 'pointer',
          },
        })}
        htmlFor={id}
      >
        {label}
        {children}
      </label>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RadixCheckboxRoot = styled(RadixCheckbox.Root)`
  background-color: white;
  width: 25px;
  height: 25px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px var(--black-a7);

  &:hover {
    cursor: pointer;
  }
`;

export default Checkbox;
