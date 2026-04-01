import styled from 'styled-components';

const PhoneFrame = styled.div`
  width: 260px;
  height: 520px;
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 36px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PhoneNotch = styled.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 24px;
  background: #000;
  border-radius: 12px;
  z-index: 2;
`;

const PhoneScreen = styled.div`
  flex: 1;
  background: linear-gradient(160deg, #C4B5FD 0%, #DDD6FE 40%, #EDE9FE 100%);
  display: flex;
  flex-direction: column;
  padding: 48px 20px 20px;
  gap: 16px;
`;

const PhoneHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const PhoneAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.6);
`;

const PhoneHeaderText = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: rgba(0,0,0,0.5);
`;

const PhoneCard = styled.div`
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(255,255,255,0.6);
`;

const PhoneCardTitle = styled.div`
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: rgba(0,0,0,0.4);
  margin-bottom: 8px;
`;

const PhoneCardRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
`;

const PhoneCardChip = styled.div<{ $color: string }>`
  height: 24px;
  border-radius: 6px;
  background: ${({ $color }) => $color};
  flex: 1;
`;

const PhoneBottomBar = styled.div`
  height: 48px;
  background: rgba(255,255,255,0.4);
  border-radius: 0 0 36px 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 24px;
`;

const PhoneBottomDot = styled.div<{ $active?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $active }) => $active ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.12)'};
`;

export default function PhoneMockup() {
  return (
    <PhoneFrame>
      <PhoneNotch />
      <PhoneScreen>
        <PhoneHeader>
          <PhoneAvatar />
          <PhoneHeaderText>Sface</PhoneHeaderText>
        </PhoneHeader>
        <PhoneCard>
          <PhoneCardTitle>My Collection</PhoneCardTitle>
          <PhoneCardRow>
            <PhoneCardChip $color="rgba(196,181,253,0.5)" />
            <PhoneCardChip $color="rgba(251,207,232,0.5)" />
          </PhoneCardRow>
          <PhoneCardRow>
            <PhoneCardChip $color="rgba(186,230,253,0.5)" />
            <PhoneCardChip $color="rgba(187,247,208,0.5)" />
            <PhoneCardChip $color="rgba(221,214,254,0.5)" />
          </PhoneCardRow>
        </PhoneCard>
        <PhoneCard>
          <PhoneCardTitle>Nearby Kiosks</PhoneCardTitle>
          <PhoneCardRow>
            <PhoneCardChip $color="rgba(237,233,254,0.6)" />
          </PhoneCardRow>
          <PhoneCardRow>
            <PhoneCardChip $color="rgba(252,231,243,0.5)" />
          </PhoneCardRow>
        </PhoneCard>
      </PhoneScreen>
      <PhoneBottomBar>
        <PhoneBottomDot $active />
        <PhoneBottomDot />
        <PhoneBottomDot />
        <PhoneBottomDot />
      </PhoneBottomBar>
    </PhoneFrame>
  );
}
