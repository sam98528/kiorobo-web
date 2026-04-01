import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from '../../styles/animations';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

interface PageTransitionProps {
  pageKey: string;
  children: React.ReactNode;
}

export default function PageTransition({ pageKey, children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 }
    );
  }, [pageKey]);

  return (
    <Container ref={containerRef} key={pageKey}>
      {children}
    </Container>
  );
}
