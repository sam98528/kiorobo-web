import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from '../../styles/animations';

const FooterWrapper = styled.footer`
  width: 100%;
  background: #0A0A0F;
  position: relative;
`;

const TopBorder = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, #7C3AED, #C084FC, transparent);
`;

const MainContent = styled.div`
  padding: 48px 80px;
  display: flex;
  gap: 80px;

  ${({ theme }) => theme.media.lg} {
    padding: 40px 48px;
    gap: 48px;
  }

  ${({ theme }) => theme.media.md} {
    flex-direction: column;
    padding: 40px 24px;
    gap: 40px;
  }
`;

const Column1 = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Logo = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InfoLine = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.25);
  line-height: 1.8;
`;

const Column2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Column3 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ColumnLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.2);
`;

const FooterLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.75);
  }
`;

const LangToggle = styled.div`
  padding-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LangActive = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
`;

const LangInactive = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.25);
  cursor: pointer;
`;

const BottomBar = styled.div`
  padding: 24px 80px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  ${({ theme }) => theme.media.lg} {
    padding: 24px 48px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 20px 24px;
  }
`;

const Copyright = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.15);
`;

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <FooterWrapper ref={footerRef}>
      <TopBorder />
      <MainContent>
        <Column1>
          <Logo>KIOROBO</Logo>
          <CompanyInfo>
            <InfoLine>주식회사 키오로보 | 대표 홍길동</InfoLine>
            <InfoLine>사업자등록번호 000-00-00000</InfoLine>
            <InfoLine>서울특별시 강남구 테헤란로 000, 0층</InfoLine>
            <InfoLine>contact@kiorobo.com</InfoLine>
          </CompanyInfo>
        </Column1>

        <Column2>
          <ColumnLabel>MENU</ColumnLabel>
          <FooterLink as="button" onClick={() => onNavigate?.('sface')}>Sface</FooterLink>
          <FooterLink as="button" onClick={() => onNavigate?.('solution')}>Solution</FooterLink>
          <FooterLink as="button" onClick={() => onNavigate?.('hardware')}>Hardware</FooterLink>
          <FooterLink as="button" onClick={() => onNavigate?.('portfolio')}>Portfolio</FooterLink>
          <FooterLink as="button" onClick={() => onNavigate?.('contact')}>Contact</FooterLink>
        </Column2>

        <Column3>
          <ColumnLabel>SOCIAL</ColumnLabel>
          <FooterLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</FooterLink>
          <FooterLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</FooterLink>
          <LangToggle>
            <LangActive>KO</LangActive>
            <LangInactive>EN</LangInactive>
          </LangToggle>
        </Column3>
      </MainContent>

      <BottomBar>
        <Copyright>&copy; 2025 KIOROBO. All rights reserved.</Copyright>
      </BottomBar>
    </FooterWrapper>
  );
}
