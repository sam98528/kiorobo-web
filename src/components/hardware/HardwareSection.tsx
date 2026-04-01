import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from '../../styles/animations';
import { SectionLabel } from '../common';
import SolutionModal from './SolutionModal';

/* ── Data ── */

const products = [
  {
    name: 'Selfie 15"',
    spec: '스탠딩형 포토 키오스크',
  },
  {
    name: 'Selfie 32"',
    spec: '컴팩트형 포토 키오스크',
  },
  {
    name: 'Display 27"',
    spec: '디스플레이형 키오스크',
    comingSoon: true,
  },
];

interface SolutionItem {
  number: string;
  name: string;
  englishName: string;
  label: string;
  shortDesc: string;
  longDesc: string;
}

const allSolutions: SolutionItem[] = [
  {
    number: '01',
    name: '랜덤 가챠 포토',
    englishName: 'Slot Photo',
    label: '01 · Gamification',
    shortDesc: '슬롯머신이 돌아가며 등급별 레어 프레임과 경품권이 출력됩니다. 뽑기의 설렘을 포토에.',
    longDesc: '촬영 후 슬롯머신이 돌아가며 등급별 레어 프레임과 경품권이 출력됩니다.',
  },
  {
    number: '02',
    name: '터치 인형뽑기',
    englishName: 'Claw Machine',
    label: '02 · Interactive',
    shortDesc: '화면을 터치해 캡슐을 획득하면 캡슐 디자인 프레임과 교환권이 출력됩니다.',
    longDesc: '화면 터치로 캡슐을 획득하면 캡슐 디자인 프레임과 교환권이 출력됩니다.',
  },
  {
    number: '03',
    name: '타임어택\n챌린지',
    englishName: 'Time Attack',
    label: '03 · Challenge',
    shortDesc: '5초 내 포즈 4종 달성',
    longDesc: '5초 내 4종 포즈를 달성하면 성공/실패 결과 프레임이 출력됩니다.',
  },
  {
    number: '04',
    name: 'AR\n보물찾기',
    englishName: 'Treasure Hunt',
    label: '04 · Adventure',
    shortDesc: '매장 QR 스캔 히든 프레임',
    longDesc: '매장 곳곳의 QR을 스캔해 뱃지를 획득하면 히든 황금 프레임이 출력됩니다.',
  },
  {
    number: '05',
    name: '운세/타로\n포토',
    englishName: 'Tarot Cam',
    label: '05 · Fortune',
    shortDesc: '행운 컬러 프레임 + 운세',
    longDesc: '랜덤 타로/운세 카드가 나오며 행운 컬러 프레임과 운세가 출력됩니다.',
  },
  {
    number: '06',
    name: '클라우드 캔버스',
    englishName: 'Cloud Canvas',
    label: '06 · Space',
    shortDesc: '대기 중 사진이 전광판 모자이크 아트로 합성되어 브랜드 프레임으로 인쇄',
    longDesc: '대기 중 촬영한 사진이 전광판 모자이크 아트로 합성되어 브랜드 프레임으로 인쇄됩니다.',
  },
  {
    number: '07',
    name: '포토 웨이팅',
    englishName: 'Wait-Cam',
    label: '07 · Waiting',
    shortDesc: '대기 등록 셀카가 레트로 영수증 스타일로 즉시 인쇄',
    longDesc: '대기 등록 시 셀카를 촬영하면 레트로 영수증 스타일로 즉시 인쇄됩니다.',
  },
  {
    number: '08',
    name: '사진 방명록',
    englishName: 'Photo Guestbook',
    label: '08 · Memory',
    shortDesc: '메모+사진 실물 인쇄',
    longDesc: 'QR로 접속해 메모를 남기면 메모와 사진이 실물로 인쇄됩니다.',
  },
  {
    number: '09',
    name: '공간 한정판',
    englishName: 'Secret Frame',
    label: '09 · Exclusive',
    shortDesc: 'GPS 인증 한정판 프레임',
    longDesc: 'GPS 인증을 통해 현장 한정판 프레임을 획득하고 키오스크에서 인쇄합니다.',
  },
  {
    number: '10',
    name: '서바이벌 뱃지',
    englishName: 'Survival Badge',
    label: '10 · Social',
    shortDesc: '인증샷 + 할인 쿠폰 인쇄',
    longDesc: '웨이팅 성공 후 SNS 인증하면 인증샷과 할인 쿠폰이 인쇄됩니다.',
  },
];

/* ── Styled Components ── */

const Wrapper = styled.section`
  width: 100%;
  background: #FAFAFA;
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
  max-width: 720px;
  margin-bottom: 80px;

  ${({ theme }) => theme.media.md} {
    margin-bottom: 48px;
  }
`;

const Title = styled.h2`
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  letter-spacing: -1px;
  color: rgba(0,0,0,0.88);
  margin-bottom: 16px;
  line-height: 1.3;
`;

const BodyText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(14px, 1.5vw, 16px);
  line-height: 1.8;
  color: rgba(0,0,0,0.45);
`;

/* ── Product Cards (Part A) ── */

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 120px;

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 80px;
  }

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.06);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 280px;
  background: #F4F4F5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${({ theme }) => theme.media.md} {
    height: 220px;
  }
`;

const ProductPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  background: rgba(0,0,0,0.04);
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaceholderIcon = styled.svg`
  width: 36px;
  height: 36px;
  stroke: rgba(0,0,0,0.15);
  stroke-width: 1.5;
  fill: none;
`;

const ComingSoonTag = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(8px);
  color: rgba(0,0,0,0.45);
`;

const ProductInfo = styled.div`
  padding: 24px;
`;

const ProductName = styled.h3`
  font-family: 'DM Sans', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: rgba(0,0,0,0.88);
  margin-bottom: 4px;
`;

const ProductSpec = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(0,0,0,0.35);
`;

/* ── Solutions Bento Grid (Part B) ── */

const SolutionsBlock = styled.div``;

const SolutionsIntro = styled.div`
  text-align: left;
  margin-bottom: 48px;

  ${({ theme }) => theme.media.md} {
    margin-bottom: 32px;
  }
`;

const SolutionsTitle = styled.h3`
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 700;
  letter-spacing: -0.5px;
  color: rgba(0,0,0,0.88);
  margin-top: 12px;
`;

const BentoRow = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 80px;

  & + & {
    margin-top: 12px;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 0 48px;
  }

  ${({ theme }) => theme.media.md} {
    flex-direction: column;
    padding: 0;
  }
`;

const BentoCard = styled.div<{ $height: number }>`
  flex: 1;
  height: ${({ $height }) => $height}px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
    border-color: rgba(0,0,0,0.12);
  }

  ${({ theme }) => theme.media.md} {
    height: auto;
    min-height: 240px;
  }
`;

const BentoCardInner = styled.div`
  padding: 28px;
  height: 100%;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.md} {
    padding: 24px;
  }
`;

const BentoLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(0,0,0,0.25);
  margin-bottom: 12px;
`;

const BentoTitle = styled.h4<{ $size?: number }>`
  font-family: 'DM Sans', sans-serif;
  font-size: ${({ $size }) => $size ?? 32}px;
  font-weight: 800;
  color: rgba(0,0,0,0.88);
  line-height: 1.25;
  white-space: pre-line;
  margin-bottom: 8px;

  ${({ theme }) => theme.media.md} {
    font-size: ${({ $size }) => Math.max(($size ?? 32) - 6, 18)}px;
  }
`;

const BentoDesc = styled.p<{ $size?: number }>`
  font-family: 'Inter', sans-serif;
  font-size: ${({ $size }) => $size ?? 15}px;
  line-height: 1.6;
  color: rgba(0,0,0,0.4);
  max-width: 280px;
`;

/* ── Mini UI Objects — using subtle fills instead of colored gradients ── */

const ObjectArea = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;

  ${({ theme }) => theme.media.md} {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 16px;
  }
`;

/* Card 01 — Slot Machine */
const SlotMachine = styled.div`
  background: rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 16px;
  width: 160px;
`;

const SlotRow = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
`;

const SlotCell = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: rgba(0,0,0,0.3);
`;

const SpinButton = styled.div`
  background: #18181B;
  color: #FFFFFF;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const SSRBadge = styled.div`
  background: rgba(0,0,0,0.04);
  color: rgba(0,0,0,0.4);
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  padding: 4px 10px;
  border-radius: 9999px;
`;

/* Card 02 — Capsule */
const CapsuleOuter = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CapsuleInner = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: rgba(0,0,0,0.25);
`;

const CapsuleLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: rgba(0,0,0,0.3);
  text-align: center;
  margin-top: 8px;
`;

/* Card 03 — Time badges */
const TimeBadgeRow = styled.div`
  display: flex;
  gap: 8px;
`;

const TimeBadge = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: rgba(0,0,0,0.4);
`;

/* Card 04 — QR */
const QRBox = styled.div`
  width: 80px;
  height: 80px;
  border: 2px dashed rgba(0,0,0,0.1);
  background: rgba(0,0,0,0.02);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: rgba(0,0,0,0.2);
`;

/* Card 05 — Tarot card */
const TarotCard = styled.div`
  width: 70px;
  height: 100px;
  background: rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  transform: rotate(6deg);
`;

/* Card 06 — Mosaic */
const MosaicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 24px);
  gap: 4px;
`;

const MosaicCell = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: rgba(0,0,0,0.04);
`;

/* Card 07 — Receipt */
const ReceiptMockup = styled.div`
  width: 140px;
  height: 180px;
  background: rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 4px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ReceiptLine = styled.div<{ $width?: string }>`
  width: ${({ $width }) => $width ?? '100%'};
  height: 4px;
  background: rgba(0,0,0,0.06);
  border-radius: 2px;
  margin-bottom: 6px;
`;

const ReceiptFooter = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: rgba(0,0,0,0.25);
  text-align: center;
  border-top: 1px dashed rgba(0,0,0,0.1);
  padding-top: 8px;
`;

/* Card 09 — Pill badge */
const PillBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: rgba(0,0,0,0.4);
`;

/* ── Component ── */

export default function HardwareSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const productCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const solutionsIntroRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const row4Ref = useRef<HTMLDivElement>(null);

  const [modalSolution, setModalSolution] = useState<SolutionItem | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const ctx = gsap.context(() => {
      // Intro block: fade in + slide up
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

      // Product cards: stagger from bottom with slight scale
      const productEls = productCardsRef.current.filter(Boolean);
      if (productEls.length > 0) {
        productEls.forEach((_el, _i) => {
          if (!_el) return;
          gsap.from(_el, {
            y: isMobile ? 30 : 60,
            opacity: 0,
            scale: 0.97,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: _el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        });
      }

      // Solutions intro
      gsap.from(solutionsIntroRef.current, {
        y: isMobile ? 20 : 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: solutionsIntroRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Bento rows: stagger cards within each row
      [row1Ref, row2Ref, row3Ref, row4Ref].forEach((rowRef) => {
        if (!rowRef.current) return;
        const cards = rowRef.current.querySelectorAll('[data-bento-card]');
        if (cards.length === 0) return;
        gsap.from(Array.from(cards), {
          y: isMobile ? 20 : 40,
          opacity: 0,
          scale: 0.97,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const openModal = (sol: SolutionItem) => setModalSolution(sol);

  return (
    <Wrapper id="hardware" ref={wrapperRef}>
      <Inner>
        {/* ── Part A: Hardware Lineup ── */}
        <IntroBlock ref={introRef}>
          <SectionLabel>HARDWARE &amp; SOLUTIONS</SectionLabel>
          <Title>공간의 목적에 맞춰 완벽하게<br />커스텀되는 10가지 인터랙티브 솔루션</Title>
          <BodyText>
            어떤 공간에도 완벽히 스며드는 미니멀한 디자인과 내구성을 갖춘 하드웨어
            라인업(포토 키오스크 및 디스플레이형 32&quot;/27&quot;/15&quot;)을 기반으로,
            브랜드의 이벤트 목적에 맞춘 특화 솔루션을 제공합니다.
          </BodyText>
        </IntroBlock>

        <ProductGrid>
          {products.map((product, i) => (
            <ProductCard
              key={product.name}
              ref={(el) => { productCardsRef.current[i] = el; }}
            >
              <ProductImage>
                <ProductPlaceholder>
                  <PlaceholderIcon viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </PlaceholderIcon>
                </ProductPlaceholder>
                {product.comingSoon && <ComingSoonTag>Coming Soon</ComingSoonTag>}
              </ProductImage>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductSpec>{product.spec}</ProductSpec>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>

        {/* ── Part B: 10 Solutions — Bento Grid ── */}
        <SolutionsBlock>
          <SolutionsIntro ref={solutionsIntroRef}>
            <SectionLabel>SOLUTIONS</SectionLabel>
            <SolutionsTitle>10가지 특화 솔루션</SolutionsTitle>
          </SolutionsIntro>

          {/* Row 1 — Two large cards */}
          <BentoRow ref={row1Ref}>
            <BentoCard
              data-bento-card
              $height={480}
              onClick={() => openModal(allSolutions[0])}
            >
              <BentoCardInner>
                <BentoLabel>{allSolutions[0].label}</BentoLabel>
                <BentoTitle $size={32}>{allSolutions[0].name}</BentoTitle>
                <BentoDesc $size={15}>{allSolutions[0].shortDesc}</BentoDesc>
              </BentoCardInner>
              <ObjectArea>
                <SlotMachine>
                  <SlotRow>
                    <SlotCell>&#9733;</SlotCell>
                    <SlotCell>&#9829;</SlotCell>
                    <SlotCell>&#9830;</SlotCell>
                  </SlotRow>
                  <SpinButton>SPIN</SpinButton>
                  <SSRBadge>SSR 등급 획득!</SSRBadge>
                </SlotMachine>
              </ObjectArea>
            </BentoCard>

            <BentoCard
              data-bento-card
              $height={480}
              onClick={() => openModal(allSolutions[1])}
            >
              <BentoCardInner>
                <BentoLabel>{allSolutions[1].label}</BentoLabel>
                <BentoTitle $size={32}>{allSolutions[1].name}</BentoTitle>
                <BentoDesc $size={15}>{allSolutions[1].shortDesc}</BentoDesc>
              </BentoCardInner>
              <ObjectArea>
                <CapsuleOuter>
                  <CapsuleInner>?</CapsuleInner>
                </CapsuleOuter>
                <CapsuleLabel>Tap to Open</CapsuleLabel>
              </ObjectArea>
            </BentoCard>
          </BentoRow>

          {/* Row 2 — Three medium cards */}
          <BentoRow ref={row2Ref}>
            <BentoCard
              data-bento-card
              $height={320}
              onClick={() => openModal(allSolutions[2])}
            >
              <BentoCardInner>
                <BentoLabel>{allSolutions[2].label}</BentoLabel>
                <BentoTitle $size={24}>{allSolutions[2].name}</BentoTitle>
                <BentoDesc>{allSolutions[2].shortDesc}</BentoDesc>
              </BentoCardInner>
              <ObjectArea>
                <TimeBadgeRow>
                  <TimeBadge>5s</TimeBadge>
                  <TimeBadge>4x</TimeBadge>
                </TimeBadgeRow>
              </ObjectArea>
            </BentoCard>

            <BentoCard
              data-bento-card
              $height={320}
              onClick={() => openModal(allSolutions[3])}
            >
              <BentoCardInner>
                <BentoLabel>{allSolutions[3].label}</BentoLabel>
                <BentoTitle $size={24}>{allSolutions[3].name}</BentoTitle>
                <BentoDesc>{allSolutions[3].shortDesc}</BentoDesc>
              </BentoCardInner>
              <ObjectArea>
                <QRBox>QR</QRBox>
              </ObjectArea>
            </BentoCard>

            <BentoCard
              data-bento-card
              $height={320}
              onClick={() => openModal(allSolutions[4])}
            >
              <BentoCardInner>
                <BentoLabel>{allSolutions[4].label}</BentoLabel>
                <BentoTitle $size={24}>{allSolutions[4].name}</BentoTitle>
                <BentoDesc>{allSolutions[4].shortDesc}</BentoDesc>
              </BentoCardInner>
              <ObjectArea>
                <TarotCard>&#9789;</TarotCard>
              </ObjectArea>
            </BentoCard>
          </BentoRow>

          {/* Row 3 — Two large cards */}
          <BentoRow ref={row3Ref}>
            <BentoCard
              data-bento-card
              $height={360}
              onClick={() => openModal(allSolutions[5])}
            >
              <BentoCardInner>
                <BentoLabel>{allSolutions[5].label}</BentoLabel>
                <BentoTitle $size={28}>{allSolutions[5].name}</BentoTitle>
                <BentoDesc $size={15}>{allSolutions[5].shortDesc}</BentoDesc>
              </BentoCardInner>
              <ObjectArea>
                <MosaicGrid>
                  <MosaicCell />
                  <MosaicCell />
                  <MosaicCell />
                  <MosaicCell />
                  <MosaicCell />
                  <MosaicCell />
                  <MosaicCell />
                  <MosaicCell />
                </MosaicGrid>
              </ObjectArea>
            </BentoCard>

            <BentoCard
              data-bento-card
              $height={360}
              onClick={() => openModal(allSolutions[6])}
            >
              <BentoCardInner>
                <BentoLabel>{allSolutions[6].label}</BentoLabel>
                <BentoTitle $size={28}>{allSolutions[6].name}</BentoTitle>
                <BentoDesc $size={15}>{allSolutions[6].shortDesc}</BentoDesc>
              </BentoCardInner>
              <ObjectArea>
                <ReceiptMockup>
                  <div>
                    <ReceiptLine />
                    <ReceiptLine $width="70%" />
                    <ReceiptLine $width="85%" />
                    <ReceiptLine $width="60%" />
                    <ReceiptLine />
                    <ReceiptLine $width="75%" />
                  </div>
                  <ReceiptFooter>No. 0042 · 14:32</ReceiptFooter>
                </ReceiptMockup>
              </ObjectArea>
            </BentoCard>
          </BentoRow>

          {/* Row 4 — Three small cards */}
          <BentoRow ref={row4Ref}>
            <BentoCard
              data-bento-card
              $height={280}
              onClick={() => openModal(allSolutions[7])}
            >
              <BentoCardInner>
                <BentoLabel>{allSolutions[7].label}</BentoLabel>
                <BentoTitle $size={22}>{allSolutions[7].name}</BentoTitle>
                <BentoDesc>{allSolutions[7].shortDesc}</BentoDesc>
              </BentoCardInner>
            </BentoCard>

            <BentoCard
              data-bento-card
              $height={280}
              onClick={() => openModal(allSolutions[8])}
            >
              <BentoCardInner>
                <BentoLabel>{allSolutions[8].label}</BentoLabel>
                <BentoTitle $size={22}>{allSolutions[8].name}</BentoTitle>
                <BentoDesc>{allSolutions[8].shortDesc}</BentoDesc>
              </BentoCardInner>
              <ObjectArea>
                <PillBadge>&#128205; Here Only</PillBadge>
              </ObjectArea>
            </BentoCard>

            <BentoCard
              data-bento-card
              $height={280}
              onClick={() => openModal(allSolutions[9])}
            >
              <BentoCardInner>
                <BentoLabel>{allSolutions[9].label}</BentoLabel>
                <BentoTitle $size={22}>{allSolutions[9].name}</BentoTitle>
                <BentoDesc>{allSolutions[9].shortDesc}</BentoDesc>
              </BentoCardInner>
              <ObjectArea>
                <PillBadge>#survived</PillBadge>
              </ObjectArea>
            </BentoCard>
          </BentoRow>
        </SolutionsBlock>
      </Inner>

      <SolutionModal
        isOpen={modalSolution !== null}
        onClose={() => setModalSolution(null)}
        solution={
          modalSolution
            ? {
                number: modalSolution.number,
                name: modalSolution.name.replace(/\n/g, ' '),
                englishName: modalSolution.englishName,
                description: modalSolution.longDesc,
              }
            : null
        }
      />
    </Wrapper>
  );
}
