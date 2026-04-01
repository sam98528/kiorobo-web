import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from '../../styles/animations';
import { SectionLabel, Divider } from '../common';
import NumberCounter from './NumberCounter';
import HistoryCarousel from './HistoryCarousel';

const Wrapper = styled.section`
  width: 100%;
  background: #FFFFFF;
  position: relative;
`;

const Inner = styled.div`
  width: 100%;
  padding: 120px 80px;

  ${({ theme }) => theme.media.lg} {
    padding: 100px 48px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 80px 24px;
  }
`;

const IntroBlock = styled.div`
  text-align: left;
  max-width: 640px;
  margin-bottom: 80px;

  ${({ theme }) => theme.media.md} {
    margin-bottom: 48px;
  }
`;

const Title = styled.h2`
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  letter-spacing: -1px;
  color: rgba(0,0,0,0.88);
  margin-bottom: 16px;
  line-height: 1.25;
`;

const Subtitle = styled.p`
  font-size: clamp(14px, 1.5vw, 16px);
  line-height: 1.8;
  color: rgba(0,0,0,0.45);
`;

const NumbersRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 64px;
  margin-bottom: 96px;

  ${({ theme }) => theme.media.lg} {
    gap: 40px;
  }

  ${({ theme }) => theme.media.md} {
    gap: 24px;
    margin-bottom: 64px;
    flex-wrap: wrap;
  }
`;

const DividerVertical = styled.div`
  width: 1px;
  height: 80px;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.06) 50%, transparent 100%);

  ${({ theme }) => theme.media.md} {
    height: 48px;
  }
`;

const CarouselIntro = styled.div`
  margin-bottom: 48px;

  ${({ theme }) => theme.media.md} {
    margin-bottom: 32px;
  }
`;

const CarouselLabel = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(0,0,0,0.3);
`;

const CarouselTitle = styled.h3`
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 700;
  letter-spacing: -0.5px;
  color: rgba(0,0,0,0.88);
  margin-top: 12px;
`;

export default function SolutionSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const carouselIntroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const ctx = gsap.context(() => {
      // Intro: fade in + slide up with scrub
      gsap.from(introRef.current, {
        y: isMobile ? 30 : 60,
        opacity: 0,
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
        },
      });

      // Numbers row: fade in with scrub
      if (numbersRef.current) {
        gsap.from(numbersRef.current, {
          y: isMobile ? 20 : 40,
          opacity: 0,
          scrollTrigger: {
            trigger: numbersRef.current,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1,
          },
        });
      }

      // Carousel intro: fade in with scrub
      gsap.from(carouselIntroRef.current, {
        y: isMobile ? 20 : 40,
        opacity: 0,
        scrollTrigger: {
          trigger: carouselIntroRef.current,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 1,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <Wrapper id="solution" ref={wrapperRef}>
      <Inner>
        <IntroBlock ref={introRef}>
          <SectionLabel>SOLUTION</SectionLabel>
          <Title>어떤 변수에도 흔들림 없는<br />무결점 기술력</Title>
          <Subtitle>
            2021년부터 축적된 현장 운영 노하우와 자체 개발 기술력으로,
            안정적이고 확장 가능한 키오스크 솔루션을 제공합니다.
          </Subtitle>
        </IntroBlock>

        <NumbersRow ref={numbersRef}>
          <NumberCounter end={2021} label="서비스 시작" suffix="" />
          <DividerVertical />
          <NumberCounter end={6} label="누적 프로젝트" suffix="+" />
          <DividerVertical />
          <NumberCounter end={99.9} label="시스템 가동률" suffix="%" />
        </NumbersRow>

        <Divider />

        <div style={{ paddingTop: 80 }}>
          <CarouselIntro ref={carouselIntroRef}>
            <CarouselLabel>HISTORY — OUR SOFTWARE PRODUCTS</CarouselLabel>
            <CarouselTitle>프로젝트 히스토리</CarouselTitle>
          </CarouselIntro>

          <HistoryCarousel />
        </div>
      </Inner>
    </Wrapper>
  );
}
