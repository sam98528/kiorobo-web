import styled from 'styled-components';

const Label = styled.span`
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(0,0,0,0.3);
  margin-bottom: 16px;
`;

interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return <Label>{children}</Label>;
}
