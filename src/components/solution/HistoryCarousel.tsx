import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from '../../styles/animations';
import ProjectCard from './ProjectCard';

const CarouselOuter = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 24px;
  padding: 8px 0 40px;
  will-change: transform;

  @media (max-width: 768px) {
    gap: 16px;
    padding: 8px 0 24px;
  }
`;

const projects = [
  {
    title: 'RGB 포토 스튜디오',
    description: '국내 최초 AI 기반 셀프 포토 키오스크. RGB 조명 연동과 자동 보정 기술 적용.',
    year: '2021',
    gradient: '',
  },
  {
    title: '아이오토포토',
    description: '아이돌 팬사인회 전용 포토카드 인쇄 솔루션. 현장 즉석 출력 시스템.',
    year: '2022',
    gradient: '',
  },
  {
    title: '포토이토',
    description: '관광지 특화 포토 키오스크. 다국어 UI와 현지화 콘텐츠 자동 매칭.',
    year: '2022',
    gradient: '',
  },
  {
    title: '퓨처프레임',
    description: 'AI 스타일 변환 기술 기반 아트 포토 키오스크. 실시간 화풍 적용.',
    year: '2023',
    gradient: '',
  },
  {
    title: '캣툰',
    description: '반려동물 전문 AI 캐리커처 키오스크. 펫 인식 및 자동 스타일링.',
    year: '2024',
    gradient: '',
  },
  {
    title: '통툰',
    description: '엔터테인먼트 IP 기반 팬 포토카드 자동화 플랫폼. Sface 생태계 통합.',
    year: '2025',
    gradient: '',
  },
];

export default function HistoryCarousel() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!outerRef.current || !trackRef.current) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // On mobile, just allow native horizontal scroll
    if (isMobile) return;

    const track = trackRef.current;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - outerRef.current!.offsetWidth + 80),
        ease: 'none',
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - outerRef.current!.offsetWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, outerRef);

    return () => ctx.revert();
  }, []);

  return (
    <CarouselOuter ref={outerRef}>
      <CarouselTrack ref={trackRef}>
        {projects.map((p, i) => (
          <ProjectCard key={p.title} {...p} index={i} />
        ))}
      </CarouselTrack>
    </CarouselOuter>
  );
}
