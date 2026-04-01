import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const MouseIcon = styled.div`
  width: 24px;
  height: 38px;
  border: 2px solid rgba(0,0,0,0.15);
  border-radius: 12px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 8px;
    background: rgba(0,0,0,0.2);
    border-radius: 2px;
    animation: ${bounce} 1.8s ease-in-out infinite;
  }
`;

const ScrollText = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(0,0,0,0.2);
`;

export default function ScrollIndicator() {
  return (
    <Wrapper>
      <MouseIcon />
      <ScrollText>Scroll</ScrollText>
    </Wrapper>
  );
}
