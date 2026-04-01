import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../common';

const NavWrapper = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 48px);
  max-width: 1200px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.95)'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(16px)' : 'none')};
  border: 1px solid ${({ $scrolled }) =>
    $scrolled ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)'};
  border-radius: 14px;
  transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;

  ${({ theme }) => theme.media.md} {
    width: calc(100% - 24px);
    top: 8px;
    padding: 10px 16px;
  }
`;

const Logo = styled.a`
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: rgba(0,0,0,0.88);
  letter-spacing: -0.5px;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 450;
  color: rgba(0,0,0,0.55);
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: rgba(0,0,0,0.88);
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  ${({ theme }) => theme.media.md} {
    gap: 8px;
  }
`;

const LangToggle = styled.button`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  color: rgba(0,0,0,0.35);
  padding: 6px 10px;
  border-radius: 8px;
  background: #F4F4F5;
  transition: color 0.2s ease, background 0.2s ease;
  &:hover {
    color: rgba(0,0,0,0.6);
    background: #E4E4E7;
  }

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

const DesktopCTA = styled.div`
  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

/* Hamburger */
const HamburgerButton = styled.button`
  display: none;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0,0,0,0.04);
  }

  ${({ theme }) => theme.media.md} {
    display: flex;
  }
`;

const HamburgerIcon = styled.div<{ $open: boolean }>`
  width: 18px;
  height: 14px;
  position: relative;

  span {
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    background: rgba(0,0,0,0.7);
    border-radius: 1px;
    transition: transform 0.3s ease, opacity 0.2s ease;
  }

  span:nth-child(1) {
    top: 0;
    ${({ $open }) => $open && 'transform: translateY(6px) rotate(45deg);'}
  }

  span:nth-child(2) {
    top: 6px;
    ${({ $open }) => $open && 'opacity: 0;'}
  }

  span:nth-child(3) {
    top: 12px;
    ${({ $open }) => $open && 'transform: translateY(-6px) rotate(-45deg);'}
  }
`;

/* Mobile overlay */
const MobileOverlay = styled.div<{ $open: boolean }>`
  display: none;

  ${({ theme }) => theme.media.md} {
    display: flex;
    flex-direction: column;
    position: fixed;
    inset: 0;
    z-index: 99;
    background: rgba(255,255,255,0.98);
    backdrop-filter: blur(20px);
    padding: 100px 32px 48px;
    gap: 12px;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    transition: opacity 0.3s ease;
  }
`;

const MobileLink = styled.a`
  font-family: 'DM Sans', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: rgba(0,0,0,0.8);
  padding: 16px 0;
  cursor: pointer;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  transition: color 0.2s ease;

  &:hover {
    color: rgba(0,0,0,0.5);
  }
`;

const MobileBottom = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMobileNav = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => scrollTo(id), 300);
  };

  return (
    <>
      <NavWrapper ref={navRef} $scrolled={scrolled}>
        <Logo href="#" onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          KIOROBO
        </Logo>
        <NavLinks>
          <NavLink onClick={() => scrollTo('ecosystem')}>Sface</NavLink>
          <NavLink onClick={() => scrollTo('solution')}>Solution</NavLink>
          <NavLink onClick={() => scrollTo('hardware')}>Hardware</NavLink>
          <NavLink onClick={() => scrollTo('portfolio')}>Portfolio</NavLink>
        </NavLinks>
        <NavRight>
          <DesktopCTA>
            <Button variant="primary" onClick={() => scrollTo('contact')}>Contact</Button>
          </DesktopCTA>
          <LangToggle>KO/EN</LangToggle>
          <HamburgerButton onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <HamburgerIcon $open={mobileOpen}>
              <span />
              <span />
              <span />
            </HamburgerIcon>
          </HamburgerButton>
        </NavRight>
      </NavWrapper>

      <MobileOverlay $open={mobileOpen}>
        <MobileLink onClick={() => handleMobileNav('ecosystem')}>Sface</MobileLink>
        <MobileLink onClick={() => handleMobileNav('solution')}>Solution</MobileLink>
        <MobileLink onClick={() => handleMobileNav('hardware')}>Hardware</MobileLink>
        <MobileLink onClick={() => handleMobileNav('portfolio')}>Portfolio</MobileLink>
        <MobileLink onClick={() => handleMobileNav('contact')}>Contact</MobileLink>
        <MobileBottom>
          <Button variant="primary" onClick={() => handleMobileNav('contact')}>Contact</Button>
          <LangToggle style={{ display: 'block' }}>KO/EN</LangToggle>
        </MobileBottom>
      </MobileOverlay>
    </>
  );
}
