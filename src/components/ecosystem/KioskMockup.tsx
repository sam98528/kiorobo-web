import styled from 'styled-components';

const KioskWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Kiosk = styled.div`
  width: 200px;
  height: 360px;
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
`;

const KioskScreen = styled.div`
  flex: 1;
  background: linear-gradient(160deg, #BAE6FD 0%, #C4B5FD 50%, #DDD6FE 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KioskScreenInner = styled.div`
  width: 75%;
  height: 60%;
  background: rgba(255,255,255,0.35);
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KioskLabel = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: rgba(0,0,0,0.35);
`;

const KioskBase = styled.div`
  height: 56px;
  background: #FFFFFF;
  border-top: 1px solid rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KioskBaseLine = styled.div`
  width: 24px;
  height: 3px;
  border-radius: 2px;
  background: rgba(0,0,0,0.08);
`;

const PhotoCard = styled.div`
  width: 140px;
  height: 180px;
  background: linear-gradient(135deg, #FBCFE8 0%, #DDD6FE 100%);
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  transform: rotate(6deg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PhotoCardImage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoCardIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
`;

const PhotoCardBottom = styled.div`
  height: 40px;
  background: rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoCardText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 500;
  color: rgba(0,0,0,0.3);
`;

export default function KioskMockup() {
  return (
    <KioskWrapper>
      <Kiosk>
        <KioskScreen>
          <KioskScreenInner>
            <KioskLabel>Sface Dock</KioskLabel>
          </KioskScreenInner>
        </KioskScreen>
        <KioskBase>
          <KioskBaseLine />
        </KioskBase>
      </Kiosk>
      <PhotoCard>
        <PhotoCardImage>
          <PhotoCardIcon />
        </PhotoCardImage>
        <PhotoCardBottom>
          <PhotoCardText>Photo Card</PhotoCardText>
        </PhotoCardBottom>
      </PhotoCard>
    </KioskWrapper>
  );
}
