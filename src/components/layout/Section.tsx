import styled from 'styled-components';

const StyledSection = styled.section<{ $bg?: string; $minHeight?: string }>`
  width: 100%;
  min-height: ${({ $minHeight }) => $minHeight || 'auto'};
  background: ${({ $bg }) => $bg || 'transparent'};
  position: relative;
  overflow: hidden;
`;

const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px;
`;

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  bg?: string;
  minHeight?: string;
  style?: React.CSSProperties;
}

export default function Section({ children, id, bg, minHeight, style }: SectionProps) {
  return (
    <StyledSection id={id} $bg={bg} $minHeight={minHeight} style={style}>
      <SectionInner>{children}</SectionInner>
    </StyledSection>
  );
}
