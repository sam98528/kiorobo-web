import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from '../../styles/animations';
import { SectionLabel, Badge } from '../common';
import PhoneMockup from './PhoneMockup';
import DashboardMockup from './DashboardMockup';
import KioskMockup from './KioskMockup';

const Wrapper = styled.section`
  width: 100%;
  background: #FAFAFA;
  position: relative;
`;

const Inner = styled.div`
  width: 100%;
  padding: 120px 80px 80px 80px;

  ${({ theme }) => theme.media.lg} {
    padding: 100px 48px 60px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 80px 24px 48px;
  }
`;

const IntroBlock = styled.div`
  text-align: left;
  max-width: 640px;
  margin-bottom: 96px;

  ${({ theme }) => theme.media.md} {
    margin-bottom: 48px;
  }
`;

const Title = styled.h2`
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
  letter-spacing: -1px;
  color: rgba(0,0,0,0.88);
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: clamp(14px, 1.5vw, 16px);
  line-height: 1.8;
  color: rgba(0,0,0,0.45);
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 120px;
  position: relative;

  ${({ theme }) => theme.media.md} {
    gap: 64px;
  }
`;

const ConnectorLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.06) 10%, rgba(0,0,0,0.06) 90%, transparent 100%);
  z-index: 0;

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

const StepRow = styled.div<{ $reverse?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 1;
  direction: ${({ $reverse }) => $reverse ? 'rtl' : 'ltr'};
  & > * {
    direction: ltr;
  }

  ${({ theme }) => theme.media.lg} {
    gap: 40px;
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 1fr;
    gap: 32px;
    direction: ltr;
  }
`;

const StepText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StepNumber = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  color: rgba(0,0,0,0.2);
  letter-spacing: 1px;
`;

const StepTitle = styled.h3`
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 700;
  letter-spacing: -0.5px;
  color: rgba(0,0,0,0.88);
`;

const StepDesc = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: rgba(0,0,0,0.45);
  max-width: 400px;
`;

const StepBadges = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const StepVisual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.md} {
    order: 2;
  }
`;

const ConnectorDot = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 2px solid rgba(0,0,0,0.1);
  z-index: 2;

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

export default function EcosystemSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const ctx = gsap.context(() => {
      // Intro: fade in + slide up
      gsap.from(introRef.current, {
        y: isMobile ? 30 : 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Each step: stagger fade in as you scroll past them
      [step1Ref, step2Ref, step3Ref].forEach((ref, i) => {
        if (!ref.current) return;
        const stepEl = ref.current;

        // Step text + badges fade in + slide up
        gsap.from(stepEl, {
          y: isMobile ? 30 : 80,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepEl,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        // Mockup slides in from the side (not on mobile)
        if (!isMobile) {
          const mockupEl = stepEl.querySelector('[class*="StepVisual"]') || stepEl.children[1];
          if (mockupEl) {
            const isReversed = i === 1; // step2 is reversed
            gsap.from(mockupEl, {
              x: isReversed ? -60 : 60,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stepEl,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            });
          }
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <Wrapper id="ecosystem" ref={wrapperRef}>
      <Inner>
        <IntroBlock ref={introRef}>
          <SectionLabel>OUR ECOSYSTEM</SectionLabel>
          <Title>Sface Ecosystem</Title>
          <Subtitle>
            팬덤의 순간을 포착하고, 현장의 경험을 디지털로 확장합니다.
            Sface 생태계는 앱, 라이브 대시보드, 키오스크를 하나로 연결합니다.
          </Subtitle>
        </IntroBlock>

        <StepsContainer data-steps-container>
          <ConnectorLine />

          <StepRow ref={step1Ref}>
            <StepText>
              <StepNumber>01</StepNumber>
              <StepTitle>Sface App</StepTitle>
              <StepDesc>
                팬이 직접 사용하는 모바일 앱. 키오스크 위치 탐색, 포토카드 컬렉션 관리,
                실시간 이벤트 알림까지. 팬덤 경험의 시작점입니다.
              </StepDesc>
              <StepBadges>
                <Badge color="lavender">iOS & Android</Badge>
                <Badge color="blush">Real-time</Badge>
              </StepBadges>
            </StepText>
            <StepVisual>
              <PhoneMockup />
            </StepVisual>
            <ConnectorDot style={{ top: '50%' }} />
          </StepRow>

          <StepRow $reverse ref={step2Ref}>
            <StepText>
              <StepNumber>02</StepNumber>
              <StepTitle>Sface Live</StepTitle>
              <StepDesc>
                운영자를 위한 실시간 관제 대시보드. 키오스크 상태 모니터링, 프린트 큐 관리,
                매출 분석까지 하나의 화면에서 통합 관리합니다.
              </StepDesc>
              <StepBadges>
                <Badge color="sky">Dashboard</Badge>
                <Badge color="mint">Analytics</Badge>
              </StepBadges>
            </StepText>
            <StepVisual>
              <DashboardMockup />
            </StepVisual>
            <ConnectorDot style={{ top: '50%' }} />
          </StepRow>

          <StepRow ref={step3Ref}>
            <StepText>
              <StepNumber>03</StepNumber>
              <StepTitle>Sface Dock</StepTitle>
              <StepDesc>
                현장에 설치되는 키오스크 하드웨어. 자체 설계한 인쇄 모듈과 결합하여
                고품질 포토카드를 즉석에서 출력합니다.
              </StepDesc>
              <StepBadges>
                <Badge color="lavender">Hardware</Badge>
                <Badge color="sky">Print Module</Badge>
              </StepBadges>
            </StepText>
            <StepVisual>
              <KioskMockup />
            </StepVisual>
            <ConnectorDot style={{ top: '50%' }} />
          </StepRow>
        </StepsContainer>
      </Inner>
    </Wrapper>
  );
}
