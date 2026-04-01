import styled from 'styled-components';

const accentColors = [
  '#7C3AED', '#BE185D', '#0369A1', '#15803D', '#92400E', '#6D28D9',
];

const Card = styled.article`
  min-width: 300px;
  border-radius: 20px;
  overflow: hidden;
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.05);
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.08);
  }

  @media (max-width: 768px) {
    min-width: 280px;
  }
`;

const CardImage = styled.div<{ $accentColor: string }>`
  height: 240px;
  background: #F4F4F5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $accentColor }) => $accentColor};
  }
`;

const CardImageIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardIconInner = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(0,0,0,0.06);
`;

const CardBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: rgba(0,0,0,0.88);
  letter-spacing: -0.3px;
`;

const CardDesc = styled.p`
  font-size: 13px;
  line-height: 1.7;
  color: rgba(0,0,0,0.4);
`;

const CardYear = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  color: rgba(0,0,0,0.2);
  letter-spacing: 1px;
`;

interface ProjectCardProps {
  title: string;
  description: string;
  year: string;
  gradient: string;
  index?: number;
}

export default function ProjectCard({ title, description, year, index = 0 }: ProjectCardProps) {
  const accentColor = accentColors[index % accentColors.length];

  return (
    <Card>
      <CardImage $accentColor={accentColor}>
        <CardImageIcon>
          <CardIconInner />
        </CardImageIcon>
      </CardImage>
      <CardBody>
        <CardYear>{year}</CardYear>
        <CardTitle>{title}</CardTitle>
        <CardDesc>{description}</CardDesc>
      </CardBody>
    </Card>
  );
}
