import { useEffect, useRef, Suspense } from 'react';
import styled from 'styled-components';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import { gsap } from '../../styles/animations';
import { Button } from '../common';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

const HeroWrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
  background: #FAFAFA;

  ${({ theme }) => theme.media.md} {
    padding-top: 100px;
    padding-bottom: 60px;
  }
`;

const ShaderBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  animation: shaderFadeIn 4s ease-out 0.5s forwards;

  canvas {
    pointer-events: none;
  }

  @keyframes shaderFadeIn {
    0% { opacity: 0; }
    100% { opacity: 0.35; }
  }
`;

const HeroInner = styled.div`
  width: 100%;
  padding: 0 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  z-index: 1;

  ${({ theme }) => theme.media.lg} {
    padding: 0 48px;
    gap: 40px;
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 1fr;
    padding: 0 24px;
    gap: 32px;
    text-align: center;
  }
`;

const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  ${({ theme }) => theme.media.md} {
    align-items: center;
    gap: 24px;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(32px, 5vw, 54px);
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1.15;
  color: rgba(0,0,0,0.88);
  opacity: 0;
`;

const HeroSub = styled.p`
  font-size: clamp(14px, 1.5vw, 16px);
  font-weight: 400;
  line-height: 1.8;
  color: rgba(0,0,0,0.45);
  max-width: 440px;
  opacity: 0;
`;

const HeroCTA = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  opacity: 0;

  ${({ theme }) => theme.media.sm} {
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }
`;

const HeroRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

const KioskGlow = styled.div`
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(196,181,253,0.3) 0%, rgba(251,207,232,0.15) 50%, transparent 70%);
  filter: blur(40px);
  z-index: 0;
`;

const KioskCard = styled.div`
  width: 280px;
  height: 607px;
  background: #1A1A1A;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 40px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  opacity: 0;
  will-change: transform;
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

const KioskScreen = styled.div`
  flex: 1;
  overflow: hidden;
  border-radius: 32px;
  margin: 4px;
`;

const ScreenImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`;

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const kioskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
        .fromTo(
          titleRef.current,
          { y: 30 },
          { y: 0, duration: 0.9, ease: 'power3.out' },
          '<'
        )
        .to(subRef.current, {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
        }, '-=0.5')
        .fromTo(
          subRef.current,
          { y: 20 },
          { y: 0, duration: 0.7, ease: 'power2.out' },
          '<'
        )
        .to(ctaRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.3')
        .fromTo(
          ctaRef.current,
          { y: 15 },
          { y: 0, duration: 0.6, ease: 'power2.out' },
          '<'
        )
        .to(kioskRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.6')
        .fromTo(
          kioskRef.current,
          { y: 30, scale: 0.97 },
          { y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
          '<'
        );

      // Kiosk subtle float
      gsap.to(kioskRef.current, {
        y: -8,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <HeroWrapper ref={wrapperRef}>
      <ShaderBg>
        <Suspense fallback={null}>
          <ShaderGradientCanvas
            style={{ pointerEvents: 'none' }}
            fov={45}
          >
            <ShaderGradient
              control="query"
              urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.1&cAzimuthAngle=180&cDistance=3.9&cPolarAngle=115&cameraZoom=1&color1=%23C4B5FD&color2=%23FBCFE8&color3=%23BAE6FD&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=off&lightType=3d&pixelDensity=2.6&positionX=-0.5&positionY=0.1&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.4&uFrequency=5.5&uSpeed=0.1&uStrength=3.7&uTime=0.2&wireframe=false&zoomOut=false"
            />
          </ShaderGradientCanvas>
        </Suspense>
      </ShaderBg>
      <HeroInner>
        <HeroLeft>
          <HeroTitle ref={titleRef}>
            Sync the Space,<br />
            Automate the Fandom.
          </HeroTitle>
          <HeroSub ref={subRef}>
            하드웨어와 소프트웨어를 잇는 키오스크 기반 엔터테크 자동화 기업, KIOROBO
          </HeroSub>
          <HeroCTA ref={ctaRef}>
            <Button variant="primary" onClick={() => onNavigate('solution')}>
              솔루션 알아보기
            </Button>
            <Button variant="text" onClick={() => onNavigate('portfolio')}>
              포트폴리오 <span>&rarr;</span>
            </Button>
          </HeroCTA>
        </HeroLeft>

        <HeroRight>
          <KioskGlow />
          <KioskCard ref={kioskRef}>
            <PhoneNotch />
            <KioskScreen>
              <ScreenImage src="/images/app-screenshots/sface-app-2.png" alt="Sface App" />
            </KioskScreen>
          </KioskCard>
        </HeroRight>
      </HeroInner>
    </HeroWrapper>
  );
}
