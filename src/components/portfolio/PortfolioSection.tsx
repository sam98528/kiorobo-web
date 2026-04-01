import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { gsap } from '../../styles/animations';

/* ─── marquee keyframes ─── */
const marqueeScroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

/* ─── layout ─── */
const Wrapper = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.colors.pageBg};
  position: relative;
`;

const Intro = styled.div`
  padding: 120px 80px 48px 80px;
  text-align: left;

  ${({ theme }) => theme.media.lg} {
    padding: 100px 48px 40px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 80px 24px 32px;
  }
`;

const Label = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(0,0,0,0.25);
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.headline};
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1.2;
  color: rgba(0,0,0,0.88);
  margin-bottom: 16px;
`;

const Body = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(14px, 1.5vw, 15px);
  font-weight: 400;
  line-height: 1.8;
  color: rgba(0,0,0,0.38);
  max-width: 640px;
`;

/* ─── logo marquee ─── */
const MarqueeStrip = styled.div`
  width: 100%;
  padding: 32px 0;
  border-top: 1px solid rgba(0,0,0,0.04);
  border-bottom: 1px solid rgba(0,0,0,0.04);
  overflow: hidden;
`;

const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${marqueeScroll} 30s linear infinite;
`;

const LogoBox = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 32px;
  border-radius: 6px;
  background: rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 48px;

  ${({ theme }) => theme.media.md} {
    margin-right: 32px;
    width: 80px;
  }
`;

const LogoText = styled.span`
  font-family: ${({ theme }) => theme.fonts.headline};
  font-size: 12px;
  font-weight: 700;
  color: rgba(0,0,0,0.15);
  white-space: nowrap;
`;

/* ─── case studies ─── */
const CaseLabel = styled.span`
  display: block;
  padding: 48px 0 0 80px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(0,0,0,0.25);

  ${({ theme }) => theme.media.lg} {
    padding-left: 48px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 32px 0 0 24px;
  }
`;

const CardsContainer = styled.div`
  padding: 20px 0 80px 80px;
  overflow: hidden;

  ${({ theme }) => theme.media.lg} {
    padding: 20px 0 60px 48px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 16px 0 48px 24px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const CardsRow = styled.div`
  display: flex;
  gap: 20px;
  width: max-content;

  ${({ theme }) => theme.media.md} {
    gap: 16px;
    padding-right: 24px;
  }
`;

const Card = styled.div`
  width: 400px;
  height: 480px;
  border-radius: ${({ theme }) => theme.radii.card};
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.05);
  overflow: hidden;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.08);
  }

  ${({ theme }) => theme.media.md} {
    width: 320px;
    height: auto;
  }

  ${({ theme }) => theme.media.sm} {
    width: 280px;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 300px;
  background: #F4F4F5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: rgba(0,0,0,0.15);

  ${({ theme }) => theme.media.md} {
    height: 220px;
  }
`;

const CardContent = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${({ theme }) => theme.media.md} {
    padding: 20px;
  }
`;

const CardPartnerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PartnerLogo = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: rgba(0,0,0,0.04);
  flex-shrink: 0;
`;

const PartnerName = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-weight: 600;
  color: rgba(0,0,0,0.4);
`;

const EventTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.headline};
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 700;
  color: rgba(0,0,0,0.85);
  margin: 0;
`;

const EventMeta = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  color: rgba(0,0,0,0.3);
`;

/* ─── data ─── */
const PARTNERS = [
  'Partner A', 'Partner B', 'Partner C', 'Partner D',
  'Partner E', 'Partner F', 'Partner G', 'Partner H',
];

const CASE_STUDIES = [
  {
    partner: 'SM Entertainment',
    title: 'NCT DREAM 콘서트 포토부스',
    meta: '2024.12 · 고척스카이돔',
  },
  {
    partner: 'HYBE',
    title: 'LE SSERAFIM 팝업 포토존',
    meta: '2024.10 · 성수동',
  },
  {
    partner: 'Samsung',
    title: '갤럭시 언팩 체험존',
    meta: '2024.08 · 코엑스',
  },
  {
    partner: 'Coca-Cola',
    title: '코카콜라 썸머 페스타',
    meta: '2024.07 · 한강공원',
  },
  {
    partner: 'YG Entertainment',
    title: 'BLACKPINK 월드투어 굿즈',
    meta: '2024.05 · KSPO돔',
  },
];

/* ─── component ─── */
export default function PortfolioSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const ctx = gsap.context(() => {
      /* intro fade-in */
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

      /* case study cards: slide in from right with stagger */
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('[data-card]');
        gsap.from(Array.from(cards), {
          x: isMobile ? 0 : 80,
          y: isMobile ? 30 : 0,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  /* duplicate logos for seamless loop */
  const logos = [...PARTNERS, ...PARTNERS];

  return (
    <Wrapper id="portfolio" ref={wrapperRef}>
      {/* Section intro */}
      <Intro ref={introRef}>
        <Label>PORTFOLIO</Label>
        <Title>
          성공적인 자동화 사례를 만든
          <br />
          최고의 브랜드들
        </Title>
        <Body>
          엔터사, 기획사, 글로벌 브랜드들이 KIOROBO의 엔터테크 솔루션을 통해
          오프라인 이벤트를 성공적인 디지털 경험으로 전환했습니다.
        </Body>
      </Intro>

      {/* Logo marquee */}
      <MarqueeStrip>
        <MarqueeTrack>
          {logos.map((name, i) => (
            <LogoBox key={i}>
              <LogoText>{name}</LogoText>
            </LogoBox>
          ))}
        </MarqueeTrack>
      </MarqueeStrip>

      {/* Case studies */}
      <CaseLabel>CASE STUDIES</CaseLabel>

      <CardsContainer>
        <CardsRow ref={cardsRef}>
          {CASE_STUDIES.map((cs) => (
            <Card key={cs.partner} data-card>
              <CardImage>Event Photo</CardImage>
              <CardContent>
                <CardPartnerRow>
                  <PartnerLogo />
                  <PartnerName>{cs.partner}</PartnerName>
                </CardPartnerRow>
                <EventTitle>{cs.title}</EventTitle>
                <EventMeta>{cs.meta}</EventMeta>
              </CardContent>
            </Card>
          ))}
        </CardsRow>
      </CardsContainer>
    </Wrapper>
  );
}
