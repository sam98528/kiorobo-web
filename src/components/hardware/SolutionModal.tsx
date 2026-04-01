import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from '../../styles/animations';

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: {
    number: string;
    name: string;
    englishName: string;
    description: string;
  } | null;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const ModalContainer = styled.div`
  background: #FFFFFF;
  border-radius: 24px;
  max-width: 560px;
  width: 100%;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    border-radius: 20px;
    max-width: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.05);
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  transition: background 0.2s;

  &:hover {
    background: #F4F4F5;
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: rgba(0,0,0,0.45);
    stroke-width: 2;
  }
`;

const ImageArea = styled.div`
  width: 100%;
  height: 240px;
  background: #F4F4F5;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const ImagePlaceholder = styled.div`
  width: 120px;
  height: 120px;
  background: rgba(0,0,0,0.04);
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaceholderIcon = styled.svg`
  width: 40px;
  height: 40px;
  stroke: rgba(0,0,0,0.15);
  stroke-width: 1.5;
  fill: none;
`;

const Content = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const SolutionNumber = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  color: rgba(0,0,0,0.15);
  display: block;
  margin-bottom: 8px;
`;

const SolutionName = styled.h3`
  font-family: 'DM Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: rgba(0,0,0,0.88);
  margin-bottom: 4px;
`;

const SolutionEnglish = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(0,0,0,0.3);
  display: block;
  margin-bottom: 20px;
`;

const SolutionDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.8;
  color: rgba(0,0,0,0.45);
`;

export default function SolutionModal({ isOpen, onClose, solution }: SolutionModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !overlayRef.current || !modalRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, [isOpen]);

  if (!isOpen || !solution) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <Overlay ref={overlayRef} onClick={handleOverlayClick}>
      <ModalContainer ref={modalRef}>
        <CloseButton onClick={onClose}>
          <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </CloseButton>
        <ImageArea>
          <ImagePlaceholder>
            <PlaceholderIcon viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </PlaceholderIcon>
          </ImagePlaceholder>
        </ImageArea>
        <Content>
          <SolutionNumber>{solution.number}</SolutionNumber>
          <SolutionName>{solution.name}</SolutionName>
          <SolutionEnglish>{solution.englishName}</SolutionEnglish>
          <SolutionDescription>{solution.description}</SolutionDescription>
        </Content>
      </ModalContainer>
    </Overlay>
  );
}
