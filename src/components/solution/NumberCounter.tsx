import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap, ScrollTrigger } from '../../styles/animations';

const CounterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const CounterNumber = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(48px, 8vw, 96px);
  font-weight: 800;
  letter-spacing: -3px;
  color: rgba(0,0,0,0.88);
  line-height: 1;
`;

const CounterLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  color: rgba(0,0,0,0.35);
`;

interface NumberCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export default function NumberCounter({ end, suffix = '', prefix = '', label, duration = 2 }: NumberCounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!numberRef.current || !wrapperRef.current) return;

    const el = numberRef.current;
    el.textContent = `${prefix}0${suffix}`;

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top 85%',
      onEnter: () => {
        if (animated.current) return;
        animated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            const rounded = end >= 100 ? Math.round(obj.val) : parseFloat(obj.val.toFixed(1));
            el.textContent = `${prefix}${rounded.toLocaleString()}${suffix}`;
          },
        });
      },
    });

    return () => trigger.kill();
  }, [end, suffix, prefix, duration]);

  return (
    <CounterWrapper ref={wrapperRef}>
      <CounterNumber ref={numberRef}>{prefix}0{suffix}</CounterNumber>
      <CounterLabel>{label}</CounterLabel>
    </CounterWrapper>
  );
}
