import styled from 'styled-components';

const PhoneFrame = styled.div`
  width: 280px;
  height: 607px;
  background: #1A1A1A;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 40px;
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
  overflow: hidden;
  border-radius: 32px;
  margin: 4px;
`;

const ScreenImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;

export default function PhoneMockup() {
  return (
    <PhoneFrame>
      <PhoneNotch />
      <PhoneScreen>
        <ScreenImage src="/images/app-screenshots/sface-app-1.png" alt="Sface App feed view" />
      </PhoneScreen>
    </PhoneFrame>
  );
}
