import styled from 'styled-components';

const StyledDivider = styled.div<{ $vertical?: boolean }>`
  ${({ $vertical }) =>
    $vertical
      ? `
    width: 1px;
    height: 40px;
    background: linear-gradient(180deg, rgba(0,0,0,0.06) 0%, transparent 100%);
  `
      : `
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(0,0,0,0.06) 0%, transparent 100%);
  `}
`;

interface DividerProps {
  vertical?: boolean;
}

export default function Divider({ vertical }: DividerProps) {
  return <StyledDivider $vertical={vertical} />;
}
