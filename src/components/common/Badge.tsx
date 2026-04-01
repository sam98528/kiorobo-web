import styled from 'styled-components';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'lavender' | 'blush' | 'mint' | 'sky';
}

const colorMap = {
  lavender: { bg: '#EDE9FE', text: '#7C3AED' },
  blush: { bg: '#FCE7F3', text: '#BE185D' },
  mint: { bg: '#DCFCE7', text: '#15803D' },
  sky: { bg: '#E0F2FE', text: '#0369A1' },
};

const StyledBadge = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  white-space: nowrap;
`;

export default function Badge({ children, color = 'lavender' }: BadgeProps) {
  const { bg, text } = colorMap[color];
  return <StyledBadge $bg={bg} $color={text}>{children}</StyledBadge>;
}
